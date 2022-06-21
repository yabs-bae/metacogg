import { Request, Response } from "express";
import { Team, TeamInput } from "../models/team";

const createTeam = async (req: Request, res: Response) => {
    try {
        const { name, captainId, logo, tournamentId } = req.body;
        if (!name || !captainId || !tournamentId) {
            return res
                .status(422)
                .json({
                    message: "The fields name, captainId and tournamentId are required",
                });
        }
        const teamInput: TeamInput = {
            name, captainId, logo, tournamentId
        };
        const teamCreated = await Team.create(teamInput);
        return res.status(201).json({ data: teamCreated });
    } catch (error: any) {
        return res.status(500).json({ data: error.message });
    }

};
const getAllTeams = async (req: Request, res: Response) => {
    try {

        const teams = await Team.find().sort("-createdAt").exec();
        return res.status(200).json({ data: teams });
    } catch (error: any) {
        return res.status(500).json({ data: error.message });
    }
};
const getTeam = async (req: Request, res: Response) => {
    try {

        const { id } = req.params;
        const team = await Team.findOne({ _id: id }).exec();
        if (!team) {
            return res.status(404).json({ message: `Team with id "${id}" not found.` });
        }
        return res.status(200).json({ data: team });
    } catch (error: any) {
        return res.status(500).json({ data: error.message });
    }
};
const updateTeam = async (req: Request, res: Response) => {
    try {

        const { id } = req.params;
        const {
            name, captainId, logo, tournamentId
        } = req.body;
        const team = await Team.findOne({ _id: id });
        if (!team) {
            return res.status(404).json({ message: `Team with id "${id}" not found.` });
        }
        if (!name) {
            return res
                .status(422)
                .json({ message: "The fields name are required" });
        }

        await Team.updateOne({ _id: id }, {
            name, captainId, logo, tournamentId
        });
        const teamUpdated = await Team.findById(id);
        return res.status(200).json({ data: teamUpdated });
    } catch (error: any) {
        return res.status(500).json({ data: error.message });
    }
};
const deleteTeam = async (req: Request, res: Response) => {
    try {

        const { id } = req.params;
        await Team.findByIdAndDelete(id);
        return res.status(200).json({ message: "Team deleted successfully." });
    } catch (error: any) {
        return res.status(500).json({ data: error.message });
    }
};
export { createTeam, deleteTeam, getAllTeams, getTeam, updateTeam };
