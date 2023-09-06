import { Request, Response } from "express";
import { generaJWT } from "../../../helpers/genera-jwt";
import { Passenger } from "../../../models/models";
const pool = require("../../../mysql/database");

export const postAuthOpt = async (req: Request, res: Response) => {
  try {
    const {telefono, idtoken } = req.body;
    const query = await pool.query(
      `CALL CREAR_PASAJERO_OPT(
        '${telefono}',
        '${idtoken}'
      );`
    );
    if (query.length > 0) {
      const user = query[0][0] as Passenger;
      const token = await generaJWT(user);
      user
        ? res.status(200).json({
            user,
            token,
            code: "200"
          })
        : res.status(500).json({
            msg: "Ocurrio un error, comuniquese con soporte",
          });
    } else {
      res.status(500).json({
        msg: "Error al crear un pasajero, comuníquese con soporte.",
      });
    }
  } catch (error) {
    error
      ? res.status(500).json({
          msg: error,
        })
      : res.status(500).json({
          msg: "Error al crear un pasajero, comuníquese con soporte.",
        });
  }
};
