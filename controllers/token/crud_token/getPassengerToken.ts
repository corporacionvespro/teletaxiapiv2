import { Request, Response } from "express";
const pool = require("../../../mysql/database");

export const getTokensPassengers = async (req: Request, res: Response) => {
    try {
        const query = await pool.query(`SELECT token from pasajero WHERE pasajero.token != '' AND pasajero.estado != 'espera';`);
        res.status(200).json({
          tokens: query,
        });
    
      } catch (error) {
        res.status(500).json({
          msg: "Algo salió mal, hable con el administrador.",
        });
      }
   
 };