import { Request, Response } from "express";
import { TournamentResult, TournamentResultInput } from "../models/tournamentResult";

const createTournamentResult = async (req: Request, res: Response) => {
    try {
        const { teamId, position, point, tournamentId } = req.body;
        const tournamentResult = await TournamentResult.findOne({ teamId,tournamentId }).exec();
        if(tournamentResult){
            return res
                .status(422)
                .json({
                    message: "The fields teamId, tournamentId already exist",
                });
        }

        if (!teamId || !position || !point || !tournamentId) {
            return res
                .status(422)
                .json({
                    message: "The fields teamId, position, point and tournamentId are required",
                });
        }
        const tournamentResultInput: TournamentResultInput = {
            teamId, position, point, tournamentId
        };
        const tournamentResultCreated = await TournamentResult.create(tournamentResultInput);
        return res.status(201).json({ data: tournamentResultCreated });
    } catch (error: any) {
        return res.status(500).json({ data: error.message });
    }
};
const getAllTournamentResults = async (req: Request, res: Response) => {
    try {
        const tournamentResults = await TournamentResult.find().sort("-createdAt").exec();
        return res.status(200).json({ data: tournamentResults });
    } catch (error: any) {
        return res.status(500).json({ data: error.message });
    }
};
const getTournamentResult = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const tournamentResult = await TournamentResult.findOne({ _id: id }).exec();
        if (!tournamentResult) {
            return res.status(404).json({ message: `TournamentResult with id "${id}" not found.` });
        }
        return res.status(200).json({ data: tournamentResult });
    } catch (error: any) {
        return res.status(500).json({ data: error.message });
    }
};
const updateTournamentResult = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {
            teamId, position, point, tournamentId
        } = req.body;
        const tournamentResult = await TournamentResult.findOne({ _id: id });
        if (!tournamentResult) {
            return res.status(404).json({ message: `TournamentResult with id "${id}" not found.` });
        }
        if (!teamId) {
            return res
                .status(422)
                .json({ message: "The fields teamId are required" });
        }

        await TournamentResult.updateOne({ _id: id }, {
            teamId, position, point, tournamentId
        });
        const tournamentResultUpdated = await TournamentResult.findById(id);
        return res.status(200).json({ data: tournamentResultUpdated });
    } catch (error: any) {
        return res.status(500).json({ data: error.message });
    }
};
const deleteTournamentResult = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await TournamentResult.findByIdAndDelete(id);
        return res.status(200).json({ message: "TournamentResult deleted successfully." });
    } catch (error: any) {
        return res.status(500).json({ data: error.message });
    }
};
export { createTournamentResult, deleteTournamentResult, getAllTournamentResults, getTournamentResult, updateTournamentResult };
