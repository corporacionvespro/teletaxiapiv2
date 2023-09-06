import { Request, Response } from "express";
const pool = require("../../../mysql/database");

export const getDrivers = async (req: Request, res: Response) => {
    try {
      const query = await pool.query(`SELECT * FROM TABLA_CONDUCTORES`);
      if (query.length > 0) {
        res.status(200).json({
          conductores: query,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error en la solicitud, comuniquese con el equipo de soporte.",
        error: error,
      });
    }
};

export const getStateDriver = async (req: Request, res: Response) => {
  const { id_conductor } = req.body;
  try {
    const query = await pool.query(`SELECT CO.estado FROM conductor CO WHERE CO.id_conductor = '${id_conductor}'`);
    if (query.length > 0) {
      res.status(200).json({
        estado: query[0].estado
      });
    }else{
      res.status(400).json({
        message: "No se pudo obtener el estado."
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error en la solicitud, comuniquese con el equipo de soporte.",
      error: error,
    });
  }
};


export const getValorationDriver = async (req: Request, res: Response) => {
  try {
    const query = await pool.query(
      ``
    );
   console.log(query)
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