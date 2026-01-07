import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config/DotenvConfig.js";
import { AppError } from "../utils/AppError.js";
import { logger } from "../config/Logger.js";
import { UserService } from "../service/user.service.js";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
            };
        }
    }
}

export interface JwtPayload {
    id: string;
    email: string;
    iat?: number;
    exp?: number;
}

export const authenticateToken = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const authHeader = request.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1]; 

        if (!token) {
            logger.error('Access token not provided');
            throw new AppError('Access token required', 401);
        }

        if (!JWT_KEY) {
            logger.error('JWT key not configured');
            throw new AppError('Internal Server Error', 500);
        }

        const decoded = jwt.verify(token, JWT_KEY) as JwtPayload;

        const userExists = await UserService.getUser(decoded.id);
        if (!userExists) {
            logger.error(`User with id ${decoded.id} not found`);
            throw new AppError('User not found', 401);
        }

        request.user = {
            id: decoded.id,
            email: decoded.email
        };

        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            logger.error('Invalid token:', error.message);
            return response.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }

        if (error instanceof jwt.TokenExpiredError) {
            logger.error('Token expired:', error.message);
            return response.status(401).json({
                success: false,
                message: 'Token expired'
            });
        }

        if (error instanceof AppError) {
            return response.status(error.statusCode).json({
                success: false,
                message: error.message
            });
        }

        logger.error('Authentication error:', error);
        return response.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};