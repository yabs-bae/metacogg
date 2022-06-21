import { ObjectId } from "mongodb";
import mongoose, { Schema, Model, Document } from "mongoose";

type TeamDocument = Document & {
  name: string;
  captainId: ObjectId;
  logo: string;
  tournamentId: ObjectId;
};

type TeamInput = {
  name: TeamDocument["name"];
  captainId: TeamDocument["captainId"];
  logo: TeamDocument["logo"];
  tournamentId: TeamDocument["tournamentId"];
};

const teamsSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true,
      index: true,
    },
    roles: {
      type: Schema.Types.String,
      required: true,
      enum: ["CAPTAIN", "MEMBER", "STANDIN"],
      default: "CAPTAIN",
    },
    ingameId: {
      type: Schema.Types.String,
      required: true,
    },
  },
  {
    collection: "teams",
    timestamps: true,
  }
);

const Team: Model<TeamDocument> = mongoose.model<TeamDocument>(
  "Team",
  teamsSchema
);

export { Team, TeamInput, TeamDocument };
