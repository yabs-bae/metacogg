import { ObjectId } from "mongodb";
import mongoose, { Schema, Model, Document } from "mongoose";

type TournamentResultDocument = Document & {
  teamId: string;
  position: number;
  point: number;
  tournamentId: number;
 
};

type TournamentResultInput = {
    teamId: TournamentResultDocument["teamId"];
    position: TournamentResultDocument["position"];
    point: TournamentResultDocument["point"];
    tournamentId: TournamentResultDocument["tournamentId"];
};

const tournamentResultsSchema = new Schema(
  {
    teamId: {
        type: Schema.Types.ObjectId,
        ref: "Team",
        required: true,
        index: true,
    },
    position: {
        type: Schema.Types.Number,
        required: true,
    },
    point: {
        type: Schema.Types.Number,
        required: true,
    },
    tournamentId: {
        type: Schema.Types.ObjectId,
        ref: "Tournament",
        required: true,
        index: true,
    },
   
  },
  {
    collection: "tournamentResults",
    timestamps: true,
  }
);

const TournamentResult: Model<TournamentResultDocument> = mongoose.model<TournamentResultDocument>(
  "TournamentResult",
  tournamentResultsSchema
);

export { TournamentResult, TournamentResultInput, TournamentResultDocument };
