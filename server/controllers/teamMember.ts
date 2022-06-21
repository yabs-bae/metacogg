import { Request, Response } from "express";
import { TeamMember, TeamMemberInput } from "../models/teamMember";

const createTeamMember = async (req: Request, res: Response) => {
    try {
        const { userId, roles, ingameId, teamId } = req.body;
        if (!userId || !roles || !ingameId || !teamId) {
            return res
                .status(422)
                .json({
                    message: "The fields userId, roles, ingameId and teamId are required",
                });
        }
        const teamMemberInput: TeamMemberInput = {
            userId, roles, ingameId, teamId
        };
        const teamCreated = await TeamMember.create(teamMemberInput);
        return res.status(201).json({ data: teamCreated });
    } catch (error: any) {
        return res.status(500).json({ data: error.message });
    }
};
const getAllTeamMembers = async (req: Request, res: Response) => {
    try {

        const teamMembers = await TeamMember.find().sort("-createdAt").exec();
        return res.status(200).json({ data: teamMembers });
    } catch (error: any) {
        return res.status(500).json({ data: error.message });
    }
};
const getTeamMember = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const team = await TeamMember.findOne({ _id: id }).exec();
        if (!team) {
            return res.status(404).json({ message: `TeamMember with id "${id}" not found.` });
        }
        return res.status(200).json({ data: team });
    } catch (error: any) {
        return res.status(500).json({ data: error.message });
    }
};
const updateTeamMember = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {
            userId, roles, ingameId, teamId
        } = req.body;
        const team = await TeamMember.findOne({ _id: id });
        if (!team) {
            return res.status(404).json({ message: `TeamMember with id "${id}" not found.` });
        }
        if (!userId) {
            return res
                .status(422)
                .json({ message: "The fields userId are required" });
        }

        await TeamMember.updateOne({ _id: id }, {
            userId, roles, ingameId, teamId
        });
        const teamUpdated = await TeamMember.findById(id);
        return res.status(200).json({ data: teamUpdated });
    } catch (error: any) {
        return res.status(500).json({ data: error.message });
    }
};
const deleteTeamMember = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await TeamMember.findByIdAndDelete(id);
        return res.status(200).json({ message: "TeamMember deleted successfully." });
    } catch (error: any) {
        return res.status(500).json({ data: error.message });
    }
};
export { createTeamMember, deleteTeamMember, getAllTeamMembers, getTeamMember, updateTeamMember };
