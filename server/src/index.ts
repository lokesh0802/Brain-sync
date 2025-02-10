import express from "express";
import { UserModel, LinkModel, TagModel, ContentModel } from "./db";
import mongoose from "mongoose";
import  jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";
const JWT_SECRET = "fnebfu343bi3";

const app = express();
async function connectDatabase() {
    try {
        const database = await mongoose.connect("mongodb+srv://lokesh080502:LoKedatabase@cluster0.1vw3m.mongodb.net/brainly");
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}
 
connectDatabase();
app.use(express.json());

app.get("/", (req, res) => {res.json({ message: "Hello World" });});


app.post("/api/v1/signup", async (req, res) => {
    const username= req.body.username;
    const password = req.body.password;
    const hashedpassword=await bcrypt.hash(password,10);
    const user = await UserModel.create({
        username,
        password: hashedpassword  // Changed from hashpassword to password
    });
    if(user){
        res.status(200).json({
            message:"Siguup successfull"
        })
    }
    else{
        res.status(400).json({ message: "Signup failed" });
    }


});

app.post("/api/v1/signin", async (req, res) => {
    const username=req.body.username;
    const password=req.body.password;
    const user = await UserModel.findOne({ username });
    if (!user) {
        return res.status(401).json({ 
            message: "Invalid credentials" 
        });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ 
            message: "Invalid credentials" 
        });
    }
    const token =jwt.sign(username,JWT_SECRET)
    res.status(200).json({
        token:token
    });
})

app.post("/api/v1/content",  async (req, res) => {
    const {link,type,title,tags} = req.body;
    const token = req.headers.authorization;
    const decoded = jwt.verify(token,JWT_SECRET);
    const contentpush= await ContentModel.create({
        link,
        type,
        title,
        tags,
        userId:decoded
    });

    
})

app.get("/api/v1/content", async (req, res) => {

})

app.delete("/api/v1/content", async (req, res) => {

})

app.post("/api/v1/brain/share", async (req, res) => {

})

app.get("/api/v1/brain/:shareLink", async (req, res) => {

})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
}); 