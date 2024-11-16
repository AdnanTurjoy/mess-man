import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the shopping entry
export interface IShopping extends Document {
  date: Date;
  cost: number;
  shoppingDetails?: string;
  memberName: string;
}

// Create the Shopping Schema
const ShoppingSchema: Schema = new Schema(
  {
    date: {
      type: Date,
      default: Date.now, // Defaults to today's date
    },
    cost: {
      type: Number,
      required: true,
    },
    shoppingDetails: {
      type: String,
      required: false, // Optional field
    },
    memberName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

// Create a model for Shopping
const Shopping = mongoose.models.Shopping || mongoose.model<IShopping>('Shopping', ShoppingSchema);

export default Shopping;
