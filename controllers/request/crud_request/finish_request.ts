import { Request, Response } from "express";
const pool = require("../../../mysql/database");

export const finishRequest = async (req: Request, res: Response) => {
  try {
    const { id_solicitud, id_conductor } = req.body;
    const query = await pool.query(
      `CALL FINISH_REQUEST(
        '${id_solicitud}',
        '${id_conductor}'
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

export const opinionConductor = async (req: Request, res: Response) => {
  try {
    const { id_solicitud, id_conductor,valoracion,comentario } = req.body;
    const query = await pool.query(
      `CALL OPINION_DRIVER(
        '${id_solicitud}',
        '${id_conductor}',
        '${valoracion}',
        '${comentario}'
      );`
    );
    if (query.affectedRows >= 1) {
      res.status(200).json({
         code: 200,
         message: "Opinion enviada correctamente",
      });
    } else {
      res.status(400).json({
        code: 400,
        message: "Datos ingresados incorrectos",
      });
    }
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: "Datos incorrectos.",
    });
  }
};


export const opinion = async (req: Request, res: Response) => {
  try {
    const { id_solicitud, id_pasajero,valoracion,comentario } = req.body;
    const query = await pool.query(
      `CALL OPINION_PASSENGER(
        '${id_solicitud}',
        '${id_pasajero}',
        '${valoracion}',
        '${comentario}'
      );`
    );
    if (query.affectedRows >= 1) {
      res.status(200).json({
         code: 200,
         message: "Opinion enviada correctamente",
      });
    } else {
      res.status(400).json({
        code: 400,
        message: "Datos ingresados incorrectos",
      });
    }
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: "Datos incorrectos.",
    });
  }
};




