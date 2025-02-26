// import express, { Request, Response } from "express";
// import { UserModel, LinkModel, TagModel, ContentModel } from "./db";
// import mongoose from "mongoose";
// import jwt from "jsonwebtoken";
// import { insertData } from "./generate_vector/insertData";
// import { searchDocuments } from "./generate_vector/search_invector";
// import { analyzeSearchResult } from "./senddatato_gemini/senddatatogemini";
// import bcrypt from "bcrypt";
// const JWT_SECRET = "fnebfu343bi3";
// import { userMiddleware } from "./middleware";
// import { random } from "./utils";
// import cors from "cors";
// const app = express();
// app.use(express.json());
// app.use(cors());
// async function connectDatabase() {
//   try {
//     const database = await mongoose.connect(
//       "mongodb+srv://lokesh080502:LoKedatabase@cluster0.1vw3m.mongodb.net/brainly"
//     );
//     console.log("Database connected successfully");
//   } catch (error) {
//     console.error("Database connection failed:", error);
//   }
// }

// connectDatabase();

// app.get("/", (req, res) => {
//   res.json({ message: "Hello World" });
// });

// app.post("/api/v1/signup", async (req, res) => {
//   const name = req.body.name;
//   const username = req.body.username;
//   const password = req.body.password;

//   const hashedpassword = await bcrypt.hash(password, 10);
//   try {
//     const user = await UserModel.create({
//       name,
//       username,
//       password: hashedpassword, // Changed from hashpassword to password
//     });
//     if (user) {
//       res.status(200).json({
//         message: "Signup successful",
//       });
//     } else {
//       res.status(400).json({ message: "Signup failed" });
//     }
//   } catch (e) {
//     res.status(400).json({ message: "Signup failed" });
//   }
// });

// app.post("/api/v1/signin", async (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;
//   const user = await UserModel.findOne({ username });
//   if (!user) {
//     res.status(400).json({ message: "Signin failed" });
//   } else {
//     const isPasswordCorrect = await bcrypt.compare(password, user.password);
//     const token = jwt.sign({ _id: user._id }, JWT_SECRET);
//     console.log(token);
//     res.status(200).json({
//       message: "Signin successful",
//       token: token,
//     });
//   }
// });


// app.post(
//   "/api/v1/content",
//   userMiddleware,
//   async (req: Request, res: Response) => {
//     try {
//       const { link, title, description,type } = req.body;

//       // Validate required fields
//       if (!link || !title || !description  ) {
//         res.status(400).json({
//           message: "Missing required fields",
//         });
//       }

//       const content = await ContentModel.create({
//         link,
//         title,
//         description,
//         type,
        

//         // @ts-ignore
//         userId: req.userId,
//       });
//       // Insert into Qdrant
//       await insertData({
//         id: content._id.toString(), // Convert MongoDB ObjectId to string
//         title: content.title,
//         link: content.link,
//         description: content.description,
//         type:content.type
//       });

//       res.status(201).json({
//         message: "Content created successfully",
//         contentId: content._id,
//       });
//     } catch (error) {
//       console.warn("Content creation error:", error);
//       res.status(500).json({
//         message: "Failed to create content",
//       });
//     }
//   }
// );

// app.delete("/api/v1/content", userMiddleware, async (req, res) => {
//   const conentId = req.body.contentId;

//   const userexist = await ContentModel.findOne({
//     _id: conentId,
//     // @ts-ignore
//     userId: req.userId,
//   });
//   if (!userexist) {
//     res.json({
//       message: "sry no conent to show",
//     });
//   } else {
//     await ContentModel.findByIdAndDelete(conentId);
//     res.json({
//       message: "deleted succefully",
//     });
//   }
// });

// app.get("/api/v1/content", userMiddleware, async (req, res) => {
//   try {
//     //@ts-ignore
//     const userId = req.userId;
//     const contents = await ContentModel.find({
//       userId: userId,
//     }).populate("userId", "username");
//     if (!contents || contents.length === 0) {
//       res.status(404).json({
//         message: "No content found",
//       });
//     }

//     res.status(200).json({
//       message: "Content retrieved successfully",
//       contents: contents,
//     });
//   } catch (e) {
//     console.error("Content retrieval error:", e);
//     res.status(500).json({
//       message: "Failed to retrieve content",
//     });
//   }
// });

// app.post("/api/v1/search", async (req, res) => {
//   try {
//     const query = req.body.query;
//     if (!query) {
//       res.status(400).json({
//         message: "Missing search query",
//       });
//     }
//     const searchResults = await searchDocuments(query);
//     const analysis = await analyzeSearchResult(query);

//     res.status(200).json({
//       message: "Search results",
//       searchResults: searchResults, // Full search document
//       analysis: analysis, // Gemini analysis
//     });
//   } catch (error) {
//     console.error("Search error:", error);
//     res.status(500).json({
//       message: "Failed to search",
//     });
//   }
// });
// app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
//   const share = req.body.share;
//   if (share) {
//     const existingLink = await LinkModel.findOne({
//       // @ts-ignore
//       userId: req.userId,
//     });

//     if (existingLink) {
//       res.json({
//         hash: existingLink.hash,
//       });
//       return;
//     }
//     const hash = random(15);
//     await LinkModel.create({
//       // @ts-ignore
//       userId: req.userId,
//       hash: hash,
//     });

//     res.json({
//       hash,
//     });
//   } else {
//     await LinkModel.deleteOne({
//       // @ts-ignore
//       userId: req.userId,
//     });

//     res.json({
//       message: "Removed link",
//     });
//   }
// });

// app.get("/api/v1/brain/:shareLink", userMiddleware, async (req, res) => {
//   const hash = req.params.shareLink.replace(/^:/, ""); // Remove leading colon bcz  we stored (without :).
//   console.log("Cleaned hash:", hash);

//   const link = await LinkModel.findOne({ hash });
//   console.log("Link found in DB:", link);

//   console.log("Requested hash:", req.params.shareLink);
//   console.log("Stored links:", await LinkModel.find());

//   const links = await LinkModel.find();
//   console.log(links);

//   console.log("Hash from URL:", hash);
//   console.log("Link found in DB:", link);

//   if (!link) {
//     res.status(411).json({
//       message: "Sorry incorrect input",
//     });
//     return;
//   }
//   // userId
//   const content = await ContentModel.find({
//     userId: link.userId,
//   });

//   console.log(link);
//   const user = await UserModel.findOne({
//     _id: link.userId,
//   });

//   if (!user) {
//     res.status(411).json({
//       message: "user not found, error should ideally not happen",
//     });
//     return;
//   }

//   res.json({
//     username: user.username,
//     content: content,
//   });
// });
// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });
import express, { Request, Response } from "express";
import { UserModel, LinkModel, TagModel, ContentModel } from "./db";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { insertData } from "./generate_vector/insertData";
import { searchDocuments } from "./generate_vector/search_invector";
import { analyzeSearchResult } from "./senddatato_gemini/senddatatogemini";
import bcrypt from "bcrypt";
const JWT_SECRET = "fnebfu343bi3";
import { userMiddleware } from "./middleware";
import { random } from "./utils";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
async function connectDatabase() {
  try {
    const database = await mongoose.connect(
      "mongodb+srv://lokesh080502:LoKedatabase@cluster0.1vw3m.mongodb.net/brainly"
    );
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

connectDatabase();

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.post("/api/v1/signup", async (req, res) => {
  const { name, username, password } = req.body;
  
  if (!name || !username || !password) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  try {
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      res.status(409).json({ message: "Username already exists" });
      return;
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      name,
      username,
      password: hashedpassword,
    });

    res.status(201).json({
      message: "Signup successful"
    });
  } catch (e) {
    console.error("Signup error:", e);
    res.status(500).json({ message: "Signup failed" });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      res.status(400).json({ 
        message: "Missing required fields" 
      });
      return;
    }

    const user = await UserModel.findOne({ username });
    if (!user) {
      res.status(401).json({ 
        message: "Invalid username or password" 
      });
      return;
    }
    
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(401).json({ 
        message: "Invalid username or password" 
      });
      return;
    }

    const token = jwt.sign({ _id: user._id }, JWT_SECRET);
    res.status(200).json({
      message: "Signin successful",
      token: token,
    });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({
      message: "Failed to process signin"
    });
  }
});


app.post(
  "/api/v1/content",
  userMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { link, title, description, type } = req.body;

      // Validate required fields
      if (!title || !description) {
        res.status(400).json({
          message: "Title and description are required",
        });
        return;
      }

      // Validate link for non-project types
      if (type !== "project" && !link) {
        res.status(400).json({
          message: "Link is required for YouTube and Twitter content",
        });
        return;
      }

      const content = await ContentModel.create({
        link,
        title,
        description,
        type,
        

        // @ts-ignore
        userId: req.userId,
      });
      // Insert into Qdrant
      await insertData({
        id: content._id.toString(), // Convert MongoDB ObjectId to string
        title: content.title,
        link: content.link || "", // Set empty string as default if link is undefined
        description: content.description,
        type: content.type
      });

      res.status(201).json({
        message: "Content created successfully",
        contentId: content._id,
      });
    } catch (error) {
      console.warn("Content creation error:", error);
      res.status(500).json({
        message: "Failed to create content",
      });
    }
  }
);

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
  try {
    const { contentId } = req.body;

    if (!contentId) {
      res.status(400).json({
        message: "Content ID is required"
      });
      return;
    }

    const content = await ContentModel.findOne({
      _id: contentId,
      // @ts-ignore
      userId: req.userId,
    });

    if (!content) {
      res.status(404).json({
        message: "Content not found",
      });
      return;
    }

    await ContentModel.findByIdAndDelete(contentId);
    res.status(200).json({
      message: "Content deleted successfully",
    });
  } catch (error) {
    console.error("Content deletion error:", error);
    res.status(500).json({
      message: "Failed to delete content",
    });
  }
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
  try {
    //@ts-ignore
    const userId = req.userId;
    const contents = await ContentModel.find({
      userId: userId,
    }).populate("userId", "username");
    if (!contents || contents.length === 0) {
      res.status(404).json({
        message: "No content found",
      });
      return;
    }

    res.status(200).json({
      message: "Content retrieved successfully",
      contents: contents,
    });
    return;
  } catch (e) {
    console.error("Content retrieval error:", e);
    res.status(500).json({
      message: "Failed to retrieve content",
    });
  }
});

app.post("/api/v1/search", async (req, res) => {
  try {
    const query = req.body.query;
    if (!query) {
      res.status(400).json({
        message: "Missing search query",
      });
      return;
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
      message: "Failed to search",
    });
  }
});
app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
  try {
    const { share } = req.body;
    
    if (share) {
      const existingLink = await LinkModel.findOne({
        // @ts-ignore
        userId: req.userId,
      });

      if (existingLink) {
        res.status(200).json({
          hash: existingLink.hash,
        });
        return;
      }

      const hash = random(15);
      await LinkModel.create({
        // @ts-ignore
        userId: req.userId,
        hash: hash,
      });

      res.status(201).json({
        hash,
      });
    } else {
      await LinkModel.deleteOne({
        // @ts-ignore
        userId: req.userId,
      });

      res.status(200).json({
        message: "Link removed successfully",
      });
    }
  } catch (error) {
    console.error("Share operation error:", error);
    res.status(500).json({
      message: "Failed to process share operation",
    });
  }
});

app.get("/api/v1/brain/:shareLink", userMiddleware, async (req, res) => {
  try {
    const hash = req.params.shareLink.replace(/^:/, "");
    const link = await LinkModel.findOne({ hash });

    if (!link) {
      res.status(404).json({
        message: "Share link not found",
      });
      return;
    }

    const user = await UserModel.findOne({
      _id: link.userId,
    });

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    const content = await ContentModel.find({
      userId: link.userId,
    });

    res.status(200).json({
      username: user.username,
      content: content,
    });
  } catch (error) {
    console.error("Share link retrieval error:", error);
    res.status(500).json({
      message: "Failed to retrieve shared content",
    });
  }
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
