import { Types } from "mongoose";
import { logger } from "../config/Logger.js";
import { CaseInterface, CaseModel } from "../models/case.model.js";
import { CreateCaseDTO, UpdateCaseDTO } from "../types/Case.type.js";
import { AppError } from "../utils/AppError.js";

export class CaseClassService {

    async getAllCases(): Promise<CaseInterface[]> {
        const cases = await CaseModel.find({
            isArchived: false,
        });
        return cases;
    }

    async getUserCases(userId: string | Types.ObjectId): Promise<CaseInterface[]> {
        const userCases = await CaseModel.find({
            isArchived: false,
            owner: userId
        });
        return userCases;
    }

    async getCase(id: string, userId: string | Types.ObjectId): Promise<CaseInterface> {
        const caseData = await CaseModel.findOne({
            _id: id,
            owner: userId
        });

        if (!caseData) {
            logger.error(`Case not found with id: ${id}`);
            throw new AppError("Case not found", 404);
        }

        return caseData;
    }

    async createCase(createCaseData: CreateCaseDTO, userId: string | Types.ObjectId): Promise<string> {
        const isCaseExist = await CaseModel.exists({ title: createCaseData.title, owner: userId });

        if (isCaseExist) {
            throw new AppError("Case with same title already exists", 409);
        }

        const new_case = await CaseModel.create({
            ...createCaseData,
            owner: userId
        });
        return new_case.title;
    }

    async deleteCase(id: string, userId: string | Types.ObjectId): Promise<string> {
        await this.getCase(id, userId);

        await CaseModel.findByIdAndDelete(id);
        return "Case deleted successfully";
    }

    async updateCase(
        id: string,
        updateCase: UpdateCaseDTO,
        userId: string | Types.ObjectId
    ): Promise<string> {
        await this.getCase(id, userId);

        await CaseModel.findByIdAndUpdate(
            id,
            updateCase,
            { new: true }
        );

        return "Case updated successfully";
    }

    async findCaseWithTitle(
        title: string
    ): Promise<CaseInterface> {
        const caseFound = await CaseModel.findOne(
            {
                title: title
            }
        )

        if (!caseFound) {
            logger.error(`Case not found with title: ${title}`);
            throw new AppError("Case not found", 404);
        }

        return caseFound;
    }
}

export const CaseService = new CaseClassService()