import { Document, Schema, model, Types } from "mongoose";

// Source Interface (I = Interface):
export interface ISourceModel extends Document {
    _id: Types.ObjectId;
    url: string;
    name: string;
}

// Source Schema:
export const SourceSchema = new Schema<ISourceModel>({
    url: {
        type: String,
        required: [true, "Missing url."],
        trim: true,
        match: [/^https?:\/\/\S+$/, "Invalid url."]
    },
    name: {
        type: String,
        required: [true, "You must attach a name for the url."],
        trim: true,
        
    }
}, {
    versionKey: false
});

// Source Model:
export const SourceModel = model<ISourceModel>("SourceModel", SourceSchema, "sources");
