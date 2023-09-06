import { Request, Response } from "express";
const pool = require("../../../mysql/database");

export const stateDriveRequest = async (req: Request, res: Response) => {
  try {
    const { id_solicitud, estado_viaje,id_conductor, estado_conductor} = req.body;
    const query = await pool.query(
      `CALL STATE_REQUEST_DRIVER(
        '${id_solicitud}',
        '${estado_viaje}',
        '${id_conductor}',
        '${estado_conductor}'
      );`
    );

    if (query.affectedRows >= 1) {
      res.status(200).json({
         code: 200,
         message: "Solicitud enviada correctamente",
      });
    } else {
      res.status(400).json({
        code: 400,
        message: "Error al crear lugar frecuente, comuníquese con soporte.",
      });
    }
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: error,
    });
  }
};


