import { Request, Response } from "express";
const pool = require("../../../mysql/database");
const path = require("path");
const fs = require("fs");


export const infoDriver = async (req: Request, res: Response) => {
  const { id_persona} = req.body;

  try {
    const query = await pool.query(`
    SELECT PE.nombres,PE.telefono, PE.foto, CU.correo, CU.clave FROM
  persona PE INNER JOIN conductor CO
  ON PE.id_persona = CO.id_persona
INNER JOIN cuenta CU ON CO.id_cuenta = CU.id_cuenta
WHERE PE.id_persona = '${id_persona}'`);

    if (query.length > 0) {
      res.status(200).json({
        "conductor": query[0]
       
      });
    }else{
      res.status(400).json({
        code: 400,
        message: "No se encontro informacion."
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error en la solicitud, comuniquese con el equipo de soporte.",
      error: error,
    });
  }
};



export const infoVehicle = async (req: Request, res: Response) => {
    const { id_vehiculo} = req.body;
  
    try {
      const query = await pool.query(`
      SELECT *FROM vehiculo WHERE id_vehiculo = '${id_vehiculo}'`);
  
      if (query.length > 0) {
        res.status(200).json({
          "conductor": query[0]
         
        });
      }else{
        res.status(400).json({
          code: 400,
          message: "No se encontro informacion."
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error en la solicitud, comuniquese con el equipo de soporte.",
        error: error,
      });
    }
  };