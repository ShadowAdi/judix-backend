import { Request, Response } from "express"
import { CustomTryCatch } from "../utils/CustomTryCatch.js"
import { verifyPassword } from "../utils/password.js"
import { UserService } from "../service/user.service.js"
import { logger } from "../config/Logger.js"
import { AppError } from "../utils/AppError.js"
import jwt from "jsonwebtoken"

export const LoginUser = CustomTryCatch(async (request: Request, response: Response) => {
    const { email, password } = request.body

    const userFound = await UserService.findUserWithEmail(email)

    const isPasswordCorrect = await verifyPassword(password, userFound.password)

    if (!isPasswordCorrect) {
        logger.error(`Invalid Credentials`)
        throw new AppError(`Invalid Creedentials`, 401)
    }

    jwt.sign({
        "email": userFound.email,
        "id": userFound._id
    }, "", {
        algorithm: "HS256",
        expiresIn: "24h"
    })


    response.status(201).json({
        "success": true,
        "message": "User Created Successfully"
    })
})