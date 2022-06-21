import { Request, Response } from "express";
import { User, UserInput } from "../models/user";

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, coin, picture } = req.body;
    if (!email || !name) {
      return res
        .status(422)
        .json({
          message: "The fields name and email are required",
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
  } catch (error: any) {
    return res.status(500).json({ data: error.message });
  }

};
const getAllUsers = async (req: Request, res: Response) => {
  try {

    const users = await User.find().sort("-createdAt").exec();
    return res.status(200).json({ data: users });
  } catch (error: any) {
    return res.status(500).json({ data: error.message });
  }
};
const getUser = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;
    const user = await User.findOne({ _id: id }).exec();
    if (!user) {
      return res.status(404).json({ message: `User with id "${id}" not found.` });
    }
    return res.status(200).json({ data: user });
  } catch (error: any) {
    return res.status(500).json({ data: error.message });
  }
};
const updateUser = async (req: Request, res: Response) => {
  try {

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
  } catch (error: any) {
    return res.status(500).json({ data: error.message });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;
    await User.findByIdAndDelete(id);
    return res.status(200).json({ message: "User deleted successfully." });
  } catch (error: any) {
    return res.status(500).json({ data: error.message });
  }

};
export { createUser, deleteUser, getAllUsers, getUser, updateUser };
