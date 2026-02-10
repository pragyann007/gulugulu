
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {asynHandler} from "../utils/asynHandler"
interface AuthRequest extends Request {
  user?: any; // You can define a more specific type based on your user model
}

export const isAuth = asynHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.cookies.token;

    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }
    

        const decoded = jwt.verify(authHeader, process.env.JWT_SECRET as string);
        req.user = decoded; // Attach the decoded user information to the request object
        next(); // Proceed to the next middleware or route handler
 
});

