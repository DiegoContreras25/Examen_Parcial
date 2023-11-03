import mongoose from "npm:mongoose@7.6.3";
import { monumentos } from "./types.ts";

const Schema = mongoose.Schema;

const monumentosSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    postal_code: { type: Number, required: true },
    ISO: { type: String, required: true },
  },
  { timestamps: true },
);

export type MonumentModelType = mongoose.Document & Omit<monumentos, "id">;

export default mongoose.model<MonumentModelType>("monumento", monumentosSchema);
