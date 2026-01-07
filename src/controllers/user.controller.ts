import { Request, Response } from "express";
import { CustomTryCatch } from "../utils/CustomTryCatch.js";
import { UserService } from "../service/user.service.js";
import { hashPassword } from "../utils/password.js";
import { AppError } from "../utils/AppError.js";

export const CreateUser = CustomTryCatch(async (request: Request, response:Response) => {
    const { username, email, password, bio } = request.body

    const hashedPassword = await hashPassword(password)

    const userCreatedEmail = await UserService.createUser({
        email,
        password: hashedPassword,
        username,
        bio
    })

    response.status(201).json({
        "success": true,
        "message": "User Created Successfully",
        "email": userCreatedEmail
    })
})

export const GetAllUsers = CustomTryCatch(async (request: Request, response:Response) => {
    const users = await UserService.getAllUsers()

    response.status(200).json({
        "success": true,
        "message": "Users Fetched Successfully",
        "users": users
    })
})

export const GetUser = CustomTryCatch(async (request: Request, response:Response) => {
    const { id } = request.params
    const user = await UserService.getUser(id)

    response.status(200).json({
        "success": true,
        "message": "User Fetched Successfully",
        "user": user
    })
})

export const DeleteUser = CustomTryCatch(async (request: Request, response:Response) => {
    if (!request.user) {
        throw new AppError('User not authenticated', 401);
    }

    const deleteResponse = await UserService.deleteUser(request.user.id)

    response.status(200).json({
        "success": true,
        "message": deleteResponse,
    })
})

export const UpdateUser = CustomTryCatch(async (request: Request, response:Response) => {
    if (!request.user) {
        throw new AppError('User not authenticated', 401);
    }

    const updateUser = request.body

    const updateResponse = await UserService.updateUser(request.user.id, updateUser)

    response.status(200).json({
        "success": true,
        "message": updateResponse,
    })
})