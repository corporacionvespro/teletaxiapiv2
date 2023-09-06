import { Request, Response } from "express";
const pool = require("../../../mysql/database");

export const getPlaces = async (req: Request, res: Response) => {
  try {
    const { id_pasajero} = req.body;
    const query = await pool.query(
      `CALL PLACES_PASSENGER('${id_pasajero}' );`
    );

    if (query.length >0) {
      res.status(200).json({
        lugares: query[0],
      });
    } else {
      res.status(500).json({
        msg: "Error al crear lugar frecuente, comuníquese con soporte.",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};


