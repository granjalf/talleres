import User from "../models/User.js";
import Role from "../models/Role.js";

export const can = (permissionName) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).populate({
        path: "role",
        populate: { path: "permissions" }
      });

      if (!user || !user.role) {
        return res.status(403).json({ error: "Acceso denegado" });
      }
      // Si el rol del usuario es "admin", permitir acceso sin restricciones
      if (user.role.name === "admin") {
        return next();
      }

      const hasPermission = user.role.permissions.some(
        (perm) => perm.name === permissionName
      );

      if (!hasPermission) {
        return res.status(403).json({ error: "No tienes permisos para esta acción" });
      }

      next();
    } catch (error) {
      res.status(500).json({ error: "Error en el servidor" });
    }
  };
};
