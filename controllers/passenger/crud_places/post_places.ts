import { Request, Response } from "express";
const pool = require("../../../mysql/database");

export const postPlaces = async (req: Request, res: Response) => {
  try {
    const { id, titulo, direccion, latitud,longitud } = req.body;
    
    const query = await pool.query(
      `CALL CREATE_PLACE(
        '${id}',
        '${titulo}',
        '${direccion}',
        '${latitud}',
        '${longitud}'
      );`
    );

    if (query.serverStatus === 16386) {
      res.status(200).json({
        code: "200",
        placeEntity: {
          id, titulo, direccion, latitud,longitud
        }
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


