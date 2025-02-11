import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// declare global {
//     namespace Express {
//         interface Request {
//             userId?: string;
//         }
//     }
// }

const JWT_SECRET = process.env.JWT_SECRET || "fnebfu343bi3";

export const userMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const header= req.headers.authorization;
    const decoded = jwt.verify(header as string, JWT_SECRET); 
    if(decoded){
        //@ts-ignore
        req.userId=decoded._id;
        next();
    }
    else{
        res.status(400).json({ message: "Unauthorized" });
    }
}
