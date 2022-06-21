import { ObjectId } from "mongodb";
import mongoose, { Schema, Model, Document } from "mongoose";


export enum Role {
  CAPTAIN = 'CAPTAIN',
  MEMBER = 'MEMBER',
  STANDIN = 'STANDIN',
}

type TeamMemberDocument = Document & {
  userId: ObjectId;
  teamId: ObjectId;
  roles: Role;
  ingameId: string;
};

type TeamMemberInput = {
  userId: TeamMemberDocument["userId"];
  teamId: TeamMemberDocument["teamId"];
  roles: TeamMemberDocument["roles"];
  ingameId: TeamMemberDocument["ingameId"];
};

const teamsSchema = new Schema(
  {
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
      enum: Role,
      default: Role.CAPTAIN,
    },
    ingameId: {
      type: Schema.Types.String,
      required: true,
    },
  },
  {
    collection: "teamMembers",
    timestamps: true,
  }
);

const TeamMember: Model<TeamMemberDocument> = mongoose.model<TeamMemberDocument>(
  "TeamMember",
  teamsSchema
);

export { TeamMember, TeamMemberInput, TeamMemberDocument };
