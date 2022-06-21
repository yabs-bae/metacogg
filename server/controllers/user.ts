import { Request, Response } from "express";
import { User, UserInput } from "../models/user";

const createUser = async (req: Request, res: Response) => {
  const  { name, email, coin, picture } = req.body;
  if (!email || !name || !coin || !picture) {
    return res
      .status(422)
      .json({
        message: "The fields email, coin, password and picture are required",
      });
  }
  const userInput: UserInput = {
    name,
    email,
    coin,
    picture,
  };
  const userCreated = await User.create(userInput);
  return res.status(201).json({ data: userCreated });
};
const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find().sort("-createdAt").exec();
  return res.status(200).json({ data: users });
};
const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id }).exec();
  if (!user) {
    return res.status(404).json({ message: `User with id "${id}" not found.` });
  }
  return res.status(200).json({ data: user });
};
const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    name,
    email,
    coin,
    picture,
  } = req.body;
  const user = await User.findOne({ _id: id });
  if (!user) {
    return res.status(404).json({ message: `User with id "${id}" not found.` });
  }
  if (!name || !email) {
    return res
      .status(422)
      .json({ message: "The fields name and email are required" });
  }

  await User.updateOne({ _id: id }, {
    name,
    email,
    coin,
    picture,
  });
  const userUpdated = await User.findById(id);
  return res.status(200).json({ data: userUpdated });
};
const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  return res.status(200).json({ message: "User deleted successfully." });
};
export { createUser, deleteUser, getAllUsers, getUser, updateUser };
