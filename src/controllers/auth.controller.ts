import { Request, Response } from "express"
import { CustomTryCatch } from "../utils/CustomTryCatch.js"
import { verifyPassword } from "../utils/password.js"
import { UserService } from "../service/user.service.js"
import { logger } from "../config/Logger.js"
import { AppError } from "../utils/AppError.js"
import jwt from "jsonwebtoken"
import { JWT_KEY } from "../config/DotenvConfig.js"

export const LoginUser = CustomTryCatch(async (request: Request, response: Response) => {
    const { email, password } = request.body

    const userFound = await UserService.findUserWithEmail(email)

    if (!JWT_KEY) {
        logger.error(`Failed to get JWT key generator`);
        throw new AppError(`Internal Server error`, 500)
    }

    const isPasswordCorrect = await verifyPassword(password, userFound.password)

    if (!isPasswordCorrect) {
        logger.error(`Invalid Credentials`)
        throw new AppError(`Invalid Creedentials`, 401)
    }

    const token = await jwt.sign({
        "email": userFound.email,
        "id": userFound._id
    }, JWT_KEY, {
        algorithm: "HS256",
        expiresIn: "24h"
    })


    response.status(200).json({
        "success": true,
        "message": "User Logged In Successfully",
        "token": token,
        "user": {
            "email": userFound.email,
            "id": userFound._id
        }
    })
})