import { Request, Response } from "express";
const pool = require("../../../mysql/database");

export const historyDefault= async (req: Request, res: Response) => {
  const { id_passenger } = req.body;
  try {
    const query = await pool.query(
      `SELECT SO.id_solicitud, SO.fechayhora, SO.precio, SO.tipo_pago,SO.precio, SO.tipo_pago, PC.nombres AS "conductor",
       PC.telefono, PC.foto , LO.direccion_actual AS "origen", 
       LO.direccion_destino AS "destino", LO.latitud_origen, LO.longitud_origen,
       LO.latitud_destino, LO.longitud_destino
       FROM solicitud SO INNER JOIN conductor CO ON SO.id_conductor = 
       CO.id_conductor INNER JOIN  persona PC ON PC.id_persona = CO.id_persona
       INNER JOIN localizacion LO ON SO.id_localizacion = LO.id_localizacion 
       WHERE SO.id_pasajero = '${id_passenger}' AND SO.estado = "finalizado"
      ORDER BY(SO.fechayhora) DESC LIMIT 10;`
    );
    if (query.length > 0) {
      res.status(200).json({
        code: 200,
        msg: "Historial de viajes.",
        historial: query,
      });
    } else {
      res.status(200).json({
        code: 200,
        msg: "Ups, no hay historial de viajes.",
        historial: [],
      });
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      msg: "Algo salió mal, hable con el administrador.",
      historial: []
    });
  }
};



export const historyDefaultDriver= async (req: Request, res: Response) => {
  const { id_conductor } = req.body;
  try {
    const query = await pool.query(
      `SELECT SO.id_solicitud,SO.precio, SO.tipo_pago, SO.fechayhora, PP.nombres AS "pasajero",
       PP.telefono , LO.direccion_actual AS "origen", LO.direccion_destino 
       AS "destino", LO.latitud_origen, LO.longitud_origen,
       LO.latitud_destino, LO.longitud_destino  FROM solicitud SO INNER JOIN pasajero PA ON SO.id_pasajero
      = PA.id_pasajero INNER JOIN persona PP ON PP.id_persona = PA.id_persona 
      INNER JOIN localizacion LO ON SO.id_localizacion = LO.id_localizacion
      WHERE SO.id_conductor = '${id_conductor}' AND SO.estado = "finalizado"
      ORDER BY(SO.fechayhora) DESC LIMIT 10;`
    );
    if (query.length > 0) {
      res.status(200).json({
        code: 200,
        msg: "Historial de viajes.",
        historial: query,
      });
    } else {
      res.status(200).json({
        code: 200,
        msg: "Ups, no hay historial de viajes.",
        historial: [],
      });
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      msg: "Algo salió mal, hable con el administrador.",
      historial: []
    });
  }
};



export const walletDriver= async (req: Request, res: Response) => {
  const { id_conductor } = req.body;
  try {
    const query = await pool.query(
     ` SELECT monto,fecha_final FROM saldo_conductor WHERE id_conductores= '${id_conductor}'  
      ORDER BY saldo_conductor.id_saldo  DESC limit 1`
    );
    if (query.length > 0) {
      res.status(200).json({
        code: 200,
        ...query[0]
      });
    } else {
      res.status(200).json({
        code: 400,
        monto: 0,
        fecha_final: ""
      });
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      monto: 0,
      fecha_final: ""
    });
  }
};