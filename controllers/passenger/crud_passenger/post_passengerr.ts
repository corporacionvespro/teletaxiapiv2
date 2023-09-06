import { Request, Response } from "express";
const pool = require("../../../mysql/database");
import { encriptarClave } from "../../../helpers/bycript.-utils";

export const postPassenger = async (req: Request, res: Response) => {
  try {
    const { nombres, telefono, correo, clave } = req.body;
    const query = await pool.query(
      `CALL CREAR_PASAJERO(
        '${nombres}',
        '${telefono}',
        '${correo}',  
        '${encriptarClave(clave)}'
      );`
    );
    if (query.serverStatus === 16418) {
      res.status(200).json({
        code: "200",
      });
    } else {
      res.status(500).json({
        msg: "Error al crear un pasajero, comuníquese con soporte.",
      });
    }
  } catch (error) {

    res.status(500).json({
      msg: error,
    });
  }
};



export  const resetPassenger = async (req: Request, res: Response) => {

  try {
    const { correo, clave } = req.body;
    const query = await pool.query(
      `UPDATE cuenta SET clave = '${encriptarClave(clave)}' WHERE cuenta.correo = '${correo}';` 
    );
    if (query.changedRows > 0) {
      res.status(200).json({
        code: "200",
        'msg': 'Contraseña actualizada correctamente'
      });
    } else {
      res.status(500).json({
        msg: "Error al crear un pasajero, comuníquese con soporte.",
      });
    }
  } catch (error) {

    res.status(500).json({
      msg: error,
    });
  }

}