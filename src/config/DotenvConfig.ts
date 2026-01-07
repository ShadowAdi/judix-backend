import { configDotenv } from "dotenv";

configDotenv()

export const PORT=process.env.PORT
export const DB_URL=process.env.MONGODB_URL
export const CLIENT_URL=process.env.CLIENT_URL
export const JWT_KEY=process.env.JWT_KEY
