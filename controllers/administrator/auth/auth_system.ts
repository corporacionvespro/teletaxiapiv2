import { Request, Response } from "express";
const pool = require("../../../mysql/database");
import { matchClave } from "../../../helpers/bycript.-utils";
import {  generaJWTAdmin } from "../../../helpers/genera-jwt";
import { Administrador } from "../../../models/models";

export const authSystem = async (req: Request, res: Response) => {
    const { correo, clave } = req.body;
    try {
      const claveEncrypted = await pool.query(
        `SELECT clave, id_cuenta FROM cuenta WHERE correo = '${correo}';`
      );
      if (claveEncrypted.length > 0) {
        if (matchClave(clave, claveEncrypted[0].clave)) {
          const query = await pool.query(
            `CALL VERIFY_ADMIN(
              '${correo}',
              '${claveEncrypted[0].id_cuenta}'
            );`
          );
          if (query.length > 0) {
            const admin = query[0][0] as Administrador;
            const token = await generaJWTAdmin({...admin, 'role': 'admin'});
            admin
              ? res.status(200).json({
                 admin,
                 token
                })
              : res.status(500).json({
                  msg: "Usuario o clave incorrecta.",
                });
          } else {
          
            res.status(500).json({
              msg: "Error al verificar usuario, comuníquese con soporte.",
            });
          }
        }else{
          res.status(500).json({
            msg: "Usuario o clave incorrecta.",
          });
        }
      }else{
        res.status(500).json({
          msg: "Usuario o clave incorrecta.",
        });
      }
    } catch (error) {
      res.status(500).json({
        msg: error,
      });
    }
  };
  