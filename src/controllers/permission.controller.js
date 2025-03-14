import Permission from "../models/Permission.js";

// Crear un permiso
export const createPermission = async (req, res) => {
  try {
    const { name } = req.body;

    let existingPermission = await Permission.findOne({ name });
    if (existingPermission) {
      return res.status(400).json({ error: "El permiso ya existe" });
    }

    const permission = new Permission({ name });
    await permission.save();

    res.status(201).json({ message: "Permiso creado exitosamente", permission });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// Obtener todos los permisos
export const getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};
