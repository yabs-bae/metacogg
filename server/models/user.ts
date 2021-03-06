import mongoose, { Schema, Model, Document } from 'mongoose';

type UserDocument = Document & {
  name: string;
  email: string;
  coin: number;
  picture: string;
};

type UserInput = {
  name: UserDocument['name'];
  email: UserDocument['email'];
  coin: UserDocument['coin'];
  picture: UserDocument['picture'];
};

const usersSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    coin: {
      type: Schema.Types.Number,
      default:0
    },
    picture: {
      type: Schema.Types.String,
    },
  },
  {
    collection: 'users',
    timestamps: true,
  },
);

const User: Model<UserDocument> = mongoose.model<UserDocument>('User', usersSchema);

export { User, UserInput, UserDocument };