import { Request, Response } from "express";
const pool = require("../../../mysql/database");

export const cancelRequest = async (req: Request, res: Response) => {
  try {
    const { id_solicitud} = req.body;
    const query = await pool.query(
      `UPDATE solicitud SET estado = 'cancelado' 
       WHERE solicitud.id_solicitud = '${id_solicitud}';`
    );

    if (query.affectedRows >= 1) {
      res.status(200).json({
         code: 200,
         message: "Solicitud cancelada correctamente",
      });
    } else {
      res.status(400).json({
        code: 400,
        message: "Error al cancelar, comuníquese con soporte.",
      });
    }
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: error,
    });
  }
};


