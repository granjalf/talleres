import mongoose from "mongoose";

const PermissionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
}, { timestamps: true });

export default mongoose.model("Permission", PermissionSchema);
