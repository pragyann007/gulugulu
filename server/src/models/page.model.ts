// create crwaled page schema and model having fields siteId url title content tokens and timestamps

import mongoose, { Schema, model, Document } from 'mongoose';

interface IPage extends Document {
  siteId: mongoose.Types.ObjectId;
  url: string;
  title: string;
  content: string;
  tokens: string[];
  createdAt: Date;
  updatedAt: Date;
}

const pageSchema = new Schema<IPage>(
  {
    siteId:{type:mongoose.Schema.Types.ObjectId, ref: 'Site', required: true},
    url: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    tokens: { type: [String], required: true },
  },
  { timestamps: true }
);

const Page = model<IPage>('Page', pageSchema);

export default Page;