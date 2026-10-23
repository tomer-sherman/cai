import { Document, Schema, model, Types } from "mongoose";

// Source Interface (I = Interface):
export interface ISummeryModel extends Document {
    _id: Types.ObjectId;
    summery: string;
}

// Source Schema:
export const SummerySchema = new Schema<ISummeryModel>({
    summery: {
        type: String,
        required: [true, "Summery is required."],
    }
}, {
    versionKey: false,
    timestamps: true
});

// Source Model:
export const SummeryModel = model<ISummeryModel>("SummeryModel", SummerySchema, "summeries");
