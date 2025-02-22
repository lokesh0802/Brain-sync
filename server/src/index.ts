import express, { Request, Response } from "express";
import { UserModel, LinkModel, TagModel, ContentModel } from "./db";
import mongoose from "mongoose";
import  jwt  from "jsonwebtoken";
import {insertData } from "./generate_vector/insertData";
import { searchDocuments } from "./generate_vector/search_invector";
import { analyzeSearchResult } from "./senddatato_gemini/senddatatogemini";
import bcrypt from "bcrypt";
const JWT_SECRET = "fnebfu343bi3";
import { userMiddleware } from "./middleware";
import { random } from "./utils";
const app = express();
app.use(express.json());
async function connectDatabase() {
    try {
        const database = await mongoose.connect("mongodb+srv://lokesh080502:LoKedatabase@cluster0.1vw3m.mongodb.net/brainly");
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}
 
connectDatabase();


app.get("/", (req, res) => {res.json({ message: "Hello World" });});


app.post("/api/v1/signup", async (req, res) => {
    const username= req.body.username;
    const password = req.body.password;
    
    const hashedpassword=await bcrypt.hash(password,10);
    try{
        const user = await UserModel.create({
            username,
            password: hashedpassword // Changed from hashpassword to password
        });
        if(user){
            res.status(200).json({
                message: "Signup successful"
            })
        }
        else{
            res.status(400).json({ message: "Signup failed" });
        }

    }catch(e){
        res.status(400).json({ message: "Signup failed" });
    }
    


});

app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user= await UserModel.findOne({ username });
    if(!user){
        res.status(400).json({ message: "Signin failed" });
    }else{
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        const token = jwt.sign({ _id: user._id }, JWT_SECRET);
        res.status(200).json({
            message: "Signin successful",
            token: token
        });
        
    }

})


app.post("/api/v1/content", userMiddleware, async (req: Request, res: Response) => {
    try {
        const { link, title, description} = req.body;

        // Validate required fields
        if (!link || !title || !description ) {
             res.status(400).json({
                message: "Missing required fields"
            });
        }

        const content = await ContentModel.create({
            link,
            title,
            description,

            // @ts-ignore
            userId: req.userId 
        });
        // Insert into Qdrant
        await insertData({
            id: content._id.toString(), // Convert MongoDB ObjectId to string
            title: content.title,
            link: content.link,
            description: content.description,
          });
      

        res.status(201).json({
            message: "Content created successfully",
            contentId: content._id
        });
    } catch (error) {
        console.warn("Content creation error:", error);
        res.status(500).json({
            message: "Failed to create content"
        });
    }
});




app.delete("/api/v1/content",userMiddleware ,async (req, res) => {
    const conentId=req.body.contentId;

    const userexist=await ContentModel.findOne({
        _id:conentId,
        // @ts-ignore
        userId:req.userId
    })
    if(!userexist){
        res.json({
            message:"sry no conent to show"
        })
    }
    else{
        await ContentModel.findByIdAndDelete(conentId);
        res.json({
            message:"deleted succefully"
        })
    }
    
})

app.get("/api/v1/content", userMiddleware,async (req, res) => {
    try{
        //@ts-ignore
        const userId = req.userId;
        const contents = await ContentModel.find({
            userId: userId
        }).populate("userId", "username");
        if (!contents || contents.length === 0) {
             res.status(404).json({
                message: "No content found"
            });
        }

         res.status(200).json({
            message: "Content retrieved successfully",
            contents: contents
        });

    }catch (e){
        console.error("Content retrieval error:", e);
         res.status(500).json({
            message: "Failed to retrieve content"
        });
    }
})

app.post("/api/v1/search", async (req, res) => {
    try {
        const query = req.body.query;
        if (!query) {
            res.status(400).json({
                message: "Missing search query"
            });
        }
        const searchResults = await searchDocuments(query);
        const analysis = await analyzeSearchResult(query);
        
        res.status(200).json({
            message: "Search results",
            searchResults: searchResults, // Full search document
            analysis: analysis, // Gemini analysis
        });
    } catch (error) {
        console.error("Search error:", error);
        res.status(500).json({
            message: "Failed to search"
        });
    }
});
app.post("/api/v1/brain/share",userMiddleware ,async (req, res) => {
    const share =req.body.share;
    if(share){
        const user = await LinkModel.findOne({
            // @ts-ignore
            userId:req.userId
        })
        if(user){
            res.status(400).json({
                message:"link already exist"
            })
            return;
        }
        const hash=random(25);
        LinkModel.create({
            // @ts-ignore
            userId:req.userId,
            hash: hash,
        })
        res.json({
            message:"share link created",
            link:hash
        })
    }else{
        LinkModel.deleteOne({
            // @ts-ignore
            userId:req.userId,
        })
    }
    res.json({
        message:"share link created"
    })
})

app.get("/api/v1/brain/:shareLink", async (req: Request, res: Response) => {
     
    const hash =req.params.shareLink;
    const link = await LinkModel.findOne({
        hash:hash
    })
    if(!link){
        res.status(411).json({
            message:"no link found"
        })
        return;
    }
    //userId find
    const conent=await ContentModel.find({
        userId:link.userId
    })
    const user = await UserModel.findOne({
        _id: link.userId
    });
    if(!user){
        res.status(411).json({
            message:"no link found"
        })
        return;
    }
    res.json({
        message:"link found",
        username:user.username,
        content:conent
    })

})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});