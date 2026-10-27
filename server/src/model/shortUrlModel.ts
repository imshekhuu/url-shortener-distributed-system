import mongoose from "mongoose";

export interface IShortUrl extends Document {
  full: string;
  userId?: mongoose.Types.ObjectId;
  short: string;
  clicks: number;
}

const shortUrlSchema = new mongoose.Schema<IShortUrl>(
  {
    full: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    short: {
      type: String,
      required: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const ShortUrl = mongoose.model("ShortUrl", shortUrlSchema);

if (!ShortUrl) {
  throw new Error("ShortUrl model is not defined");
}

export default ShortUrl;
