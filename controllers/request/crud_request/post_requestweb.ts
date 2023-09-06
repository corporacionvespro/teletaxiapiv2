import { Request, Response } from "express";
const pool = require("../../../mysql/database");

export const postRequestWeb = async (req: Request, res: Response) => {
    
  try {
    const { nombres, telefono,latitud_origen, longitud_origen, 
        direccion_actual,referencia,precio } = req.body;
    
    const query = await pool.query(
      `CALL SOLICITUD_WEB(
        '${nombres}',
        '${telefono}',
        '${latitud_origen}',
        '${longitud_origen}',
        '${direccion_actual}',
        '${referencia}',
        '${precio}'
      );`
    );

    if (query.length > 0) {
      res.status(200).json({
         ...query[0][0],
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


