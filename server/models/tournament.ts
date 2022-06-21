import { ObjectId } from "mongodb";
import mongoose, { Schema, Model, Document } from "mongoose";

type TournamentDocument = Document & {
  title: string;
  startDate: Date;
  endDate: Date;
  teamCount: number;
  slot: number;
 
};

type TournamentInput = {
    title: TournamentDocument["title"];
    startDate: TournamentDocument["startDate"];
    endDate: TournamentDocument["endDate"];
    teamCount: TournamentDocument["teamCount"];
    slot: TournamentDocument["slot"];
};

const tournamentsSchema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: true,
    },
    startDate: {
        type: Schema.Types.Date,
        required: true,
    },
    endDate: {
        type: Schema.Types.Date,
        required: true,
    },
    teamCount: {
        type: Schema.Types.Number,
        required: true,
    },
    slot: {
        type: Schema.Types.Number,
        required: true,
    },
   
  },
  {
    collection: "tournaments",
    timestamps: true,
  }
);

const Tournament: Model<TournamentDocument> = mongoose.model<TournamentDocument>(
  "Tournament",
  tournamentsSchema
);

export { Tournament, TournamentInput, TournamentDocument };
