import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  role:
    | "admin"
    | "vendor_manager"
    | "vendor"
    | "salesperson"
    | "delivery_partner"
    | "customer"
    | "finance_user"
    | "support_agent";
  firstName?: string;
  lastName?: string;
  mobile: string;
  mobileVerified: boolean;
  emailVerified: boolean;
  profilePicture?: string;
  status: "pending" | "active" | "suspended" | "rejected";
  onboardingComplete: boolean;
  twoFactorEnabled: boolean;
  lastLogin?: Date;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: [
        "admin",
        "vendor_manager",
        "vendor",
        "salesperson",
        "delivery_partner",
        "customer",
        "finance_user",
        "support_agent",
      ],
      required: true,
    },
    firstName: String,
    lastName: String,
    mobile: { type: String, required: true, unique: true, index: true },
    mobileVerified: { type: Boolean, default: false },
    emailVerified: { type: Boolean, default: false },
    profilePicture: String,
    status: {
      type: String,
      enum: ["pending", "active", "suspended", "rejected"],
      default: "pending",
    },
    onboardingComplete: { type: Boolean, default: false },
    twoFactorEnabled: { type: Boolean, default: false },
    lastLogin: Date,
    refreshToken: String,
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
