import mongoose from "mongoose";
import bcrypt from "crypto";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" }, // Para CASL
});

// Middleware para hashear la contraseña antes de guardar
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.createHash("sha256").update(this.password).digest("hex");
  next();
});

// Método para verificar la contraseña
UserSchema.methods.comparePassword = async function (password) {
  const hash = await bcrypt.createHash("sha256").update(password).digest("hex");
  return this.password === hash;
};

export default mongoose.model("User", UserSchema);
