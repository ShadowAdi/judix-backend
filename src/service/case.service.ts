import { logger } from "../config/Logger.js";
import { CaseInterface, CaseModel } from "../models/case.model.js";
import { UserInterface, UserModel } from "../models/user.model.js";
import { CreateUserDTO, UpdateUserDTO } from "../types/user.type.js";
import { AppError } from "../utils/AppError.js";

export class CaseClassService {

    async getAllCases(): Promise<CaseInterface[]> {
        const cases = await CaseModel.find({
            isArchived:false,
        });
        return cases;
    }

    async getUserCases(userId:string): Promise<CaseInterface[]> {
        const userCases = await CaseModel.find({
            isArchived:false,
            owner:userId
        });
        return userCases;
    }

    async getCase(id: string,userId:string): Promise<CaseInterface> {
        const caseData = await CaseModel.findOne({
            _id:id,
            owner: userId
        });

        if (!caseData) {
            logger.error(`Case not found with id: ${id}`);
            throw new AppError("Case not found", 404);
        }

        return caseData;
    }

    async createCase(userData: CreateUserDTO): Promise<string> {
        const isUserExist = await UserModel.exists({ email: userData.email });

        if (isUserExist) {
            throw new AppError("User with same email already exists", 409);
        }

        const user = await UserModel.create(userData);
        return user.email;
    }

    async deleteUser(id: string): Promise<string> {
        await this.getUser(id);

        await UserModel.findByIdAndDelete(id);
        return "User deleted successfully";
    }

    async updateUser(
        id: string,
        updateUser: UpdateUserDTO
    ): Promise<string> {
        await this.getUser(id);

        await UserModel.findByIdAndUpdate(
            id,
            updateUser,
            { new: true }
        );

        return "User updated successfully";
    }

    async findUserWithEmail(
        email: string
    ): Promise<UserInterface> {
        const userFound = await UserModel.findOne(
            {
                email
            }
        ).select("+password");

        if (!userFound) {
            logger.error(`User not found with email: ${email}`);
            throw new AppError("User not found", 404);
        }

        return userFound;
    }
}

export const UserService = new UserClassService()