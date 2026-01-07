import { logger } from "../config/Logger.js";
import { UserInterface, UserModel } from "../models/User.js";
import { CreateUserDTO, UpdateUserDTO } from "../types/user.type.js";
import { AppError } from "../utils/AppError.js";

export class UserService {

    async getAllUsers(): Promise<UserInterface[]> {
        const users = await UserModel.find();
        return users;
    }

    async getUser(id: string): Promise<UserInterface> {
        const user = await UserModel.findById(id);

        if (!user) {
            logger.error(`User not found with id: ${id}`);
            throw new AppError("User not found", 404);
        }

        return user;
    }

    async createUser(userData: CreateUserDTO): Promise<string> {
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
}
