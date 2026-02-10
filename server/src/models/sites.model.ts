// create sites model containg fields like url ownerid veifivation token verified lastcrawled
import mongoose, { Schema, Document } from "mongoose";

export interface ISite extends Document {
    url: string;
    ownerId: mongoose.Types.ObjectId;
    verificationToken: string;
    verified: boolean;
    lastCrawled: Date;
}

const siteSchema: Schema = new Schema({
    url: { type: String, required: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    verificationToken: { type: String, required: true },
    verified: { type: Boolean, default: false },
    lastCrawled: { type: Date }
}, { timestamps: true });

const Site = mongoose.model<ISite>("Site", siteSchema);

export default Site;