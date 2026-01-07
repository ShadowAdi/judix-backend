import { Request, Response } from "express";
import { CustomTryCatch } from "../utils/CustomTryCatch.js";
import { AppError } from "../utils/AppError.js";
import { CaseService } from "../service/case.service.js";
import { UserService } from "../service/user.service.js";

export const CreateCase = CustomTryCatch(async (request: Request, response: Response) => {
    if (!request.user) {
        throw new AppError('User not authenticated', 401);
    }

    const user = await UserService.getUser(request.user.id);
    const caseData = request.body


    const caseCreated = await CaseService.createCase(caseData, user._id)

    response.status(201).json({
        "success": true,
        "message": "Case Created Successfully",
        "title": caseCreated
    })
})

export const GetAllCases = CustomTryCatch(async (request: Request, response: Response) => {
    const cases = await CaseService.getAllCases()

    response.status(200).json({
        "success": true,
        "message": "Cases Fetched Successfully",
        "cases": cases
    })
})

export const GetUserCases = CustomTryCatch(async (request: Request, response: Response) => {
    if (!request.user) {
        throw new AppError('User not authenticated', 401);
    }

    const user = await UserService.getUser(request.user.id);
    const cases = await CaseService.getUserCases(user._id)

    response.status(200).json({
        "success": true,
        "message": "Cases Fetched Successfully",
        "cases": cases
    })
})

export const GetCase = CustomTryCatch(async (request: Request, response: Response) => {
    const { id } = request.params
    if (!request.user) {
        throw new AppError('User not authenticated', 401);
    }

    const user = await UserService.getUser(request.user.id);
    const caseFound = await CaseService.getCase(id, user._id)


    response.status(200).json({
        "success": true,
        "message": "Case Fetched Successfully",
        "case": caseFound
    })
})

export const DeleteCase = CustomTryCatch(async (request: Request, response: Response) => {
    const { id } = request.params

    if (!request.user) {
        throw new AppError('User not authenticated', 401);
    }
    const user = await UserService.getUser(request.user.id);
    const deleteResponse = await CaseService.deleteCase(id, user._id)


    response.status(200).json({
        "success": true,
        "message": deleteResponse,
    })
})

export const UpdateCase = CustomTryCatch(async (request: Request, response: Response) => {
        const { id } = request.params

    if (!request.user) {
        throw new AppError('User not authenticated', 401);
    }
        const user = await UserService.getUser(request.user.id);


    const updateCase = request.body

    const updateResponse = await CaseService.updateCase(id,updateCase,request.user.id)

    response.status(200).json({
        "success": true,
        "message": updateResponse,
    })
})