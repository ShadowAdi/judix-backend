import mongoose, { InferSchemaType } from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false
    },
    bio: {
        type: String,
    }
}, {
    timestamps: true
})

export const UserModel = mongoose.model("User", UserSchema)
export type UserInterface = InferSchemaType<typeof UserSchema>;