import { Request, Response } from "express";
const pool = require("../../../mysql/database");

export const getTokensDrivers = async (req: Request, res: Response) => {
    try {
        const query = await pool.query(`SELECT token from conductor WHERE conductor.token != '' AND conductor.estado = 'activo' ORDER BY RAND(); `);
        res.status(200).json({
          tokens: query,
        });
    
      } catch (error) {
        res.status(500).json({
          msg: "Algo salió mal, hable con el administrador.",
        });
      }
   
 };