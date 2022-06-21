import { Request, Response } from "express";
import { Tournament, TournamentInput } from "../models/tournament";

const createTournament = async (req: Request, res: Response) => {
    try {
        const { title, startDate, endDate, slot } = req.body;
        console.log(req.body)
        if (!title || !startDate || !endDate || !slot) {
            return res
                .status(422)
                .json({
                    message: "The fields title, startDate, endDate and slot are required",
                });
        }
        let teamCount = 0;
        const tournamentInput: TournamentInput = {
            title, startDate, endDate, slot, teamCount
        };
        const tournamentCreated = await Tournament.create(tournamentInput);
        return res.status(201).json({ data: tournamentCreated });
    } catch (error: any) {
        return res.status(500).json({ data: error.message });
    }
};
const getAllTournaments = async (req: Request, res: Response) => {
    try {
        const tournaments = await Tournament.find().sort("-createdAt").exec();
        return res.status(200).json({ data: tournaments });
    } catch (error: any) {
        return res.status(500).json({ data: error.message });
    }
};
const getTournament = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const tournament = await Tournament.findOne({ _id: id }).exec();
        if (!tournament) {
            return res.status(404).json({ message: `Tournament with id "${id}" not found.` });
        }
        return res.status(200).json({ data: tournament });
    } catch (error: any) {
        return res.status(500).json({ data: error.message });
    }
};
const updateTournament = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {
            title, startDate, endDate, slot
        } = req.body;
        const tournament = await Tournament.findOne({ _id: id });
        if (!tournament) {
            return res.status(404).json({ message: `Tournament with id "${id}" not found.` });
        }
        if (!title) {
            return res
                .status(422)
                .json({ message: "The fields title are required" });
        }

        await Tournament.updateOne({ _id: id }, {
            title, startDate, endDate, slot
        });
        const tournamentUpdated = await Tournament.findById(id);
        return res.status(200).json({ data: tournamentUpdated });
    } catch (error: any) {
        return res.status(500).json({ data: error.message });
    }
};
const deleteTournament = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Tournament.findByIdAndDelete(id);
        return res.status(200).json({ message: "Tournament deleted successfully." });
    } catch (error: any) {
        return res.status(500).json({ data: error.message });
    }
};
export { createTournament, deleteTournament, getAllTournaments, getTournament, updateTournament };
