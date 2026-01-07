import mongoose, { InferSchemaType, Types } from "mongoose";

const CaseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    description: {
        type: String,
        trim: true
    },
    clientName: {
        type: String,
        required: true,
        trim: true
    },
    clientEmail: {
        type: String,
        trim: true
    },
    caseType: {
        type: String,
        enum: ["civil", "criminal", "contract", "corporate", "other"],
        default: "civil"
    },
    status: {
        type: String,
        enum: ["draft", "active", "closed"],
        default: "draft",
    },
    filedAt: {
        type: Date,
        required: true,
    },
    owner: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    isArchived: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
})

export const CaseModel = mongoose.model("Case", CaseSchema)
export type CaseInterface = InferSchemaType<typeof CaseSchema> & {
    _id: Types.ObjectId;
};