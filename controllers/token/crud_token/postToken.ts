import { Request, Response } from "express";
const pool = require("../../../mysql/database");

export const postToken = async (req: Request, res: Response) => {
    try {
      const { id_rol, token, tipo_rol } = req.body;
      if(tipo_rol === 'pasajero'){
          const pasajero = await pool.query(
              `UPDATE  pasajero SET token = '${token}' WHERE  id_pasajero = '${id_rol}'`
            );
            if(pasajero.affectedRows === 1){
              
            res.status(200).json({
                code: 200,
               message: "Token actualizado correctamente.",
         });
        }
      }
  
      if(tipo_rol === 'conductor'){
          const conductor = await pool.query(
              `UPDATE  conductor SET  token  = '${token}' WHERE  id_conductor = '${id_rol}'`
            );
            if(conductor.affectedRows === 1){
                res.status(200).json({
                    code: 200,
                   message: "Token actualizado correctamente.",
             });
            }
      }
  
  
    } catch (error) {
      res.status(500).json({
        msg: "Algo salió mal, hable con el administrador.",
      });
    }
  };