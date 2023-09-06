import { Request, Response } from "express";
const pool = require("../../../mysql/database");
import * as geolib from 'geolib';

export const postRequest = async (req: Request, res: Response) => {
  try {
    const {
      id_pasajero,
      latitud_origen,
      longitud_origen,
      latitud_destino,
      longitud_destino,
      direccion_actual,
      direccion_destino,
      referencia,
      precio,
      tipo_pago
    } = req.body;

    const query = await pool.query(
      `CALL SOLICITUD(
        '${id_pasajero}',
        '${latitud_origen}',
        '${longitud_origen}',
        '${latitud_destino}',
        '${longitud_destino}',
        '${direccion_actual}',
        '${direccion_destino}',
        '${referencia}',
        '${precio}',
        '${tipo_pago}'
      );`
    );

    if (query.length > 0) {
      res.status(200).json({
        ...query[0][0],
        code: 200,
        message: "Solicitud enviada correctamente",
      });
    } else {
      res.status(400).json({
        id_pasajero: 0,
        code: 400,
        message: "Error al crear lugar frecuente, comuníquese con soporte.",
      });
    }
  } catch (error) {
    res.status(400).json({
      id_pasajero: 0,
      code: 400,
      message: error,
    });
  }
};

export const postRequestTemporal = async (req: Request, res: Response) => {
  try {
    const { id_conductor, id_solicitud } = req.body;

    const query = await pool.query(
      `SELECT  SO.estado from solicitud SO 
      WHERE SO.id_solicitud = ${id_solicitud}`
    );

    if (query.length > 0) {
      console.log(query);

      if (query[0].estado == "pendiente") {
        res.status(200).json({
          code: 200,
          message: "pendiente",
        });
      }
      if (query[0].estado == "cancelado") {
        res.status(200).json({
          code: 200,
          message: "rechazado",
        });
      }
      if (query[0].estado == "aceptado") {
        const query2 = await pool.query(
          `SELECT  SO.id_conductor from solicitud SO 
           WHERE SO.id_solicitud = ${id_solicitud}`
        );

        if (query2[0].id_conductor == id_conductor) {
          res.status(200).json({
            code: 200,
            message: "confirmado",
          });
        } else {
          res.status(200).json({
            code: 200,
            message: "otro",
          });
        }
      }
    } else {
      res.status(400).json({
        code: 400,
        message: "Error, comunicate con soporte ",
      });
    }
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: "Error, comunicate con soporte ",
    });
  }
};



export const isActiveCity = async (req: Request, res: Response) => {
  try {
    const { latitude, longitude } = req.body;
    console.log(latitude,longitude)
    if (geolib.isPointInPolygon({latitude: latitude,longitude:longitude }, [
      {latitude: -6.6967846, longitude: -79.9158838},
      {latitude: -6.6228543, longitude: -79.7867414},
      {latitude: -6.7293086, longitude: -79.7027940},
      {latitude: -6.7516661, longitude: -79.6918080},
      {latitude: -6.8480349, longitude: -79.8329264},
      {latitude: -6.7933281, longitude: -79.8985702},
      {latitude: -6.7149468, longitude: -79.9382358},
      {latitude: -6.6970457, longitude: -79.9159087}
     ])) {

      return res.status(200).json({
        message: "Chapa tu taxi si esta disponible en tu zona",
        code: 200
      });
   
    }else{
      return res.status(400).json({
        message: "Chapa tu taxi no esta disponible en tu zona",
        code: 400
      });
    }
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: "Error, comunicate con soporte ",
    });
  }
};
