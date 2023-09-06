import { Request, Response } from "express";
const pool = require("../../../mysql/database");

export const infoRequest = async (req: Request, res: Response) => {
    
  try {
    const { id_solicitud } = req.body;
    const query = await pool.query(
      `CALL INFO_SOLICITUD(
        '${id_solicitud}'
      );`
    );
    if (query.length > 0) {
      res.status(200).json({
        'info': query[0][0],
         code: 200,
         message: "Solicitud enviada correctamente",
      });
    } else {
      res.status(400).json({
        id_pasajero: 0,
        code: 400,
        message: "Error al crear lugar frecuente, comuníquese con soporte.",
      });
    }
  } catch (error) {
    res.status(400).json({
      id_pasajero: 0,
      code: 400,
      message: error,
    });
  }
};


