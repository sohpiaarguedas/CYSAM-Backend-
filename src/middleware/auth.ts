import type { Request, Response, NextFunction } from 'express';
import { verifyToken, type CustomJWTPayload } from "../utils/jwt";

export interface AuthenticatedRequest extends Request {
    user?: CustomJWTPayload;
}

export const authenticateToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if(!token){
            return res.status(401).json({
                ok:false,
                message: "No token provided",
            });
        }

        const payload = await verifyToken(token);
        req.user = payload;
        next();

    } catch (error) {

        console.error('Token verification failed:', error);

        return res.status(403).json({
            ok:false,
            message: "Invalid token",
        });
        
    }
};

