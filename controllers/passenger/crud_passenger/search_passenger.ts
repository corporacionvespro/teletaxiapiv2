import { Request, Response } from "express";
const pool = require("../../../mysql/database");

export const searchPassenger = async (req: Request, res: Response) => {
  try {
    const { telefono } = req.body;
    const query = await pool.query(
      `SELECT PE.nombres, IP.direccion, IP.referencia, IP.latitud, IP.longitud FROM info_pasajero IP INNER
       JOIN persona PE ON PE.id_persona = IP.id_persona WHERE PE.telefono
       = '${telefono}'; `
    );

    if(query.length > 0){
        res.status(200).json({
           "info" : query[0]
        })
    }else{
        res.status(400).json({
            msg: "No se encontro el usuario"
        })
    }
  } catch (error) {

    res.status(500).json({
      msg: error,
    });
  }
};


