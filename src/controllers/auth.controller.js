const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    let user = await User.findOne({ $or: [{ email }, { username }] });

    if (user) return res.status(400).json({ message: "El usuario o email ya existe" });

    user = new User({ username, email, password, role });
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error en el registro", error });
  }
};

const login = async (req, res) => {
  try {
    const { identifier, password } = req.body; // "identifier" puede ser username o email
    const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Credenciales incorrectas" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error en el inicio de sesión", error });
  }
};

module.exports = { register, login };
