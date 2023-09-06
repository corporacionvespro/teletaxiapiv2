import { Request, Response } from "express";
const pool = require("../../../mysql/database");

export const getPassenger = async (req: Request, res: Response) => {
    try {
      const query = await pool.query(`SELECT * FROM TABLA_PASAJEROS`);
      if (query.length > 0) {
        res.status(200).json({
          pasajeros: query,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error en la solicitud, comuniquese con el equipo de soporte.",
        error: error,
      });
    }
};