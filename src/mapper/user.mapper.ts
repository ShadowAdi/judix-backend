import { UserInterface } from "../models/User.js";

export const toPublicUser = (user: UserInterface & { _id: any }) => ({
  id: user._id.toString(),
  username: user.username,
  email: user.email,
  bio: user.bio,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});
