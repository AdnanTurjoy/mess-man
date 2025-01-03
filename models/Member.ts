// models/Member.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface MemberDocument extends Document {
  name: string;
  phoneNumber: string;
  fbAccount?: string;
  nidNumber: string;
  permanentAddress: string;
  depositAmt: number;
  user: mongoose.Types.ObjectId; // Reference to User
}

const MemberSchema = new Schema<MemberDocument>({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  fbAccount: { type: String, required: false },
  nidNumber: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  depositAmt: { type: Number, required: false },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // One-to-one relationship
},{ timestamps: true });

export default mongoose.models.Member || mongoose.model<MemberDocument>('Member', MemberSchema);
