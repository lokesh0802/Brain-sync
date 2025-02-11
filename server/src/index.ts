import express, { Request, Response } from "express";
// import { Request, Response } from "express-serve-static-core";
// import { UserModel, LinkModel, TagModel, ContentModel } from "./db";
import { UserModel } from "./db";
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

app.post("/api/v1/content",  async (req, res) => {
    

    
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