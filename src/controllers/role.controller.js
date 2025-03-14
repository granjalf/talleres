import Role from "../models/Role.js";
import Permission from "../models/Permission.js";

// Crear un nuevo rol con permisos
export const createRole = async (req, res) => {
  try {
    const { name, permissions } = req.body; // permissions es un array de IDs

    let existingRole = await Role.findOne({ name });
    if (existingRole) {
      return res.status(400).json({ error: "El rol ya existe" });
    }

    const role = new Role({ name, permissions });
    await role.save();

    res.status(201).json({ message: "Rol creado exitosamente", role });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// Obtener todos los roles con sus permisos
export const getRoles = async (req, res) => {
  try {
    const roles = await Role.find().populate("permissions");
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};
