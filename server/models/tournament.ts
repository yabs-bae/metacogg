import { ObjectId } from "mongodb";
import mongoose, { Schema, Model, Document } from "mongoose";

type TournamentDocument = Document & {
  title: string;
  start_date: number;
  end_date: number;
  team_count: number;
  slot: number;
 
};

type TournamentInput = {
    title: TournamentDocument["title"];
    start_date: TournamentDocument["start_date"];
    end_date: TournamentDocument["end_date"];
    team_count: TournamentDocument["team_count"];
    slot: TournamentDocument["slot"];
};

const tournamentsSchema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: true,
    },
    start_date: {
        type: Schema.Types.Number,
        required: true,
    },
    end_date: {
        type: Schema.Types.Number,
        required: true,
    },
    team_count: {
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
