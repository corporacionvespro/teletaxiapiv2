import { Request, Response } from "express";
import { matchClave } from "../../../helpers/bycript.-utils";
import { generaJWT } from "../../../helpers/genera-jwt";
import { Passenger } from "../../../models/models";
const pool = require("../../../mysql/database");

export const authCredentialsDriver = async (req: Request, res: Response) => {
  const { correo, clave } = req.body;
  try {
    const claveEncrypted = await pool.query(
      `SELECT clave, id_cuenta FROM cuenta WHERE correo = '${correo}';`
    );
    if (claveEncrypted.length > 0) {
 
        const query = await pool.query(
          `CALL VERIFY_DRIVER(
            '${correo}',
            '${claveEncrypted[0].id_cuenta}'
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
            : res.status(400).json({
                user: {},
                token: "",
                code: "400",
              });
        } 
     
    } else {
      res.status(400).json({
        user: {},
        token: "",
        code: "400",
      });
    }
  } catch (error) {
    res.status(500).json({
        user:error,
        token: "",
        code: "500"
    });
  }
};
