// models/MessMember.ts
import mongoose, { Schema, model, models } from 'mongoose';

export interface IMessMember {
  name: string;
  mealCount: number;
  date: Date;
}

const MessMemberSchema = new Schema<IMessMember>(
  {
    name: { type: String, required: true },
    mealCount: { type: Number, default: 0 },
    date: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true }
);

// Export the model
const MessMember = models.MessMember || model<IMessMember>('MessMember', MessMemberSchema);
export default MessMember;
