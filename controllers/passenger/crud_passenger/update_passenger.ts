import { Request, Response } from "express";
const pool = require("../../../mysql/database");

export const updatePassenger = async (req: Request, res: Response) => {
  try {
    const { nombres, telefono, correo, id_persona,id_cuenta } = req.body;
    const query = await pool.query(
      `CALL UPDATE_INFO_PASSENGER(
        '${nombres}',
        '${telefono}',
        '${correo}',
        '${id_persona}',     
        '${id_cuenta}'
      );`
    );
    console.log(query)
    if (query.affectedRows >0) {
      res.status(200).json({
        code: "200",
      });
    } else {
      res.status(500).json({
        msg: "Error al actualizar pasajero, comuníquese con soporte.",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};


