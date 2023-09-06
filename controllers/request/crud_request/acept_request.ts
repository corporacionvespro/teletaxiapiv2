import { Request, Response } from "express";
const pool = require("../../../mysql/database");

export const aceptRequest = async (req: Request, res: Response) => {
  try {
    const { id_solicitud, id_conductor,precio } = req.body;
    const query = await pool.query(
      `CALL ACEPT_REQUEST(
        '${id_solicitud}',
        '${id_conductor}',
        '${precio}'
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



export const aceptTemporal = async (req: Request, res: Response) => {
  try {
    const { id_solicitud, id_conductor ,precio, latitud,longitud} = req.body;
    const query = await pool.query(
      `CALL REQUEST_TEMPORAL(
        '${id_solicitud}',
        '${id_conductor}',
        '${precio}',
        '${latitud}',
        '${longitud}'
      );`
    );
   
    if (query.affectedRows >= 1) {
      res.status(200).json({
         code: 200,
         message: "Solicitud temporal aceptada",
      });
    } else {
      res.status(400).json({
        code: 400,
        message: "Error registrar solicitud temporal, comuníquese con soporte.",
      });
    }
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: error,
    });
  }
};


export const updateRequestConfirm = async (req: Request, res: Response) => {
  try {
    const { id_solicitud, id_conductor ,precio} = req.body;
    const query = await pool.query(
      ` UPDATE solicitud SET id_conductor = '${id_conductor}',
       precio = '${precio}', estado = 'aceptado'
        WHERE id_solicitud = '${id_solicitud}';`
    );

   
    if (query.affectedRows >= 1) {
      res.status(200).json({
         code: 200,
         message: "Solicitud actualizada correctamente.",
      });
    } else {
      res.status(400).json({
        code: 400,
        message: "Error aceptar solicitud temporal, comuníquese con soporte.",
      });
    }
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: error,
    });
  }
};


export const updateLocationDriver = async (req: Request, res: Response) => {
  try {
    const { id_conductor, latitude ,longitude} = req.body;
    const query = await pool.query(
      `UPDATE conductor SET latitud = '${latitude}', longitud ='${longitude}' 
        WHERE conductor.id_conductor ='${id_conductor}';`
    );

   
    if (query.affectedRows >= 1) {
      res.status(200).json({
         code: 200,
         message: "Ubicacion actualizada correctamente.",
      });
    } else {
      res.status(400).json({
        code: 400,
        message: "Error aceptar actualizar ubicacion, comuníquese con soporte.",
      });
    }
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: error,
    });
  }
};