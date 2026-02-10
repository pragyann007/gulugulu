// create mongoose chema and model for user containing name amil password and sites whichis array  refering to sites model 
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    sites: mongoose.Types.ObjectId[];
}

const userSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    sites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Site" }]
}, { timestamps: true });

const User = mongoose.model<IUser>("User", userSchema);

export default User;