import { Request, Response } from "express";
const pool = require("../../../mysql/database");
import { encriptarClave } from "../../../helpers/bycript.-utils";

export const postAdministrator = async (req: Request, res: Response) => {
  try {
    const { nombres, telefono, correo, clave } = req.body;
    const query = await pool.query(
      `CALL CREAR_ADMINISTRADOR(
        '${nombres}',
        '${telefono}',
        '${correo}',
        '${encriptarClave(clave)}'
      );`
    );
    if (query.serverStatus === 16418) {
      res.status(200).json({
        msg: "Administrador creado correctamente",
      });
    } else {
      res.status(500).json({
        msg: "Error al crear un administrador, comuníquese con soporte.",
      });
    }
  } catch (error) {

    res.status(500).json({
      msg: error,
    });
  }
};

