import { Request, Response } from "express";
const pool = require("../../../mysql/database");

export const deletePlace = async (req: Request, res: Response) => {
  try {
    const { id_place } = req.body;
    const place = await pool.query(
        `SELECT * FROM lugares_frecuentes LU WHERE LU.id_lugarfrecuente = '${id_place}';`
      );

    const query = await pool.query(
      `DELETE FROM lugares_frecuentes LU WHERE LU.id_lugarfrecuente = '${id_place}';`
    );
    console.log(query);
    if (query.affectedRows > 0) {
      res.status(200).json({
        placeEntity:place[0],
        code: 200,
      });
    } else {
      res.status(400).json({
        code: 400,
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};
