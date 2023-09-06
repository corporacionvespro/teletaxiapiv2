import { Request, Response } from "express";
const pool = require("../../../mysql/database");

export const getRequest = async (req: Request, res: Response) => {
  try {
    const query = await pool.query(`SELECT *FROM TABLA_SOLICITUDES;`);

    if (query.length > 0) {
      res.status(200).json({
        solicitudes: query,
      });
    } else {
      res.status(500).json({
        msg: "Error al crear lugar frecuente, comuníquese con soporte.",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

export const getRequestToday = async (req: Request, res: Response) => {
  try {
    const query = await pool.query(
      `SELECT COUNT(*) AS total FROM solicitud SO WHERE YEAR(SO.fechayhora) = YEAR(CURRENT_DATE()) 
          AND MONTH(SO.fechayhora) = MONTH(CURRENT_DATE())
          AND DAY(SO.fechayhora) = DAY(CURRENT_DATE());`
    );
    if (query.length > 0) {
      res.status(200).json({
        total: query[0].total,
      });
    } else {
      res.status(500).json({
        msg: "Error al crear lugar frecuente, comuníquese con soporte.",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};
export const getRequestTotal = async (req: Request, res: Response) => {
  try {
    const query = await pool.query(`SELECT COUNT(*) AS total FROM solicitud;`);

    if (query.length > 0) {
      res.status(200).json({
        total: query[0].total,
      });
    } else {
      res.status(500).json({
        msg: "Error al crear lugar frecuente, comuníquese con soporte.",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

export const getRequestPending = async (req: Request, res: Response) => {
  try {
    const query = await pool.query(`SELECT * FROM SOLICITUDES_PENDIENTES;`);

    if (query.length > 0) {
      res.status(200).json({
        solicitudes: query,
      });
    } else {
      res.status(500).json({
        msg: "Error al crear lugar frecuente, comuníquese con soporte.",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

export const getRequestTemporals = async (req: Request, res: Response) => {
  const { id_solicitud } = req.params;
  try {
    const query = await pool.query(`
    SELECT 
    PE.nombres AS 'conductor',
	  CO.token,
    CO.latitud,
    CO.longitud,
    CO.id_conductor,
    VE.placa,
    VE.unidad,
    VE.marca,
    VE.color,
    MAX(ST.id) AS id,
    ST.id_solicitud,
    PE.foto,
	  ST.tarifa,
      (
          SELECT CAST(AVG(opinion.valoracion) AS DECIMAL(10,2)) 
          FROM opinion 
          INNER JOIN solicitud ON solicitud.id_solicitud = opinion.id_solicitud 
          WHERE solicitud.id_conductor = CO.id_conductor
          GROUP BY solicitud.id_conductor
      ) AS valoraciones,
      (
        SELECT COUNT(*) 
        FROM solicitud SO 
        INNER JOIN conductor CO ON SO.id_conductor = CO.id_conductor 
        WHERE SO.estado = "finalizado" AND CO.id_conductor = ST.id_conductor
    ) AS viajes_realizados
    FROM solicitud_temporal ST
    INNER JOIN solicitud SO ON ST.id_solicitud = SO.id_solicitud 
    INNER JOIN conductor CO ON ST.id_conductor = CO.id_conductor
    INNER JOIN vehiculo VE ON CO.id_vehiculo = VE.id_vehiculo 
    INNER JOIN persona PE ON PE.id_persona = CO.id_persona 
    WHERE SO.id_solicitud = ${id_solicitud} 
    GROUP BY PE.nombres, CO.token, CO.latitud, CO.longitud, CO.id_conductor, VE.placa, VE.unidad, VE.marca, VE.color, ST.id_solicitud, PE.foto, ST.tarifa
    ORDER BY MAX(ST.tarifa) ASC;
`);

    if (query.length > 0) {
      res.status(200).json({
        solicitudes: query,
      });
    } else {
      res.status(500).json({
        msg: "Error traer los conductores temporales, comuníquese con soporte.",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

export const deleteTemporal = async (req: Request, res: Response) => {
  const { id_conductor, id_solicitud } = req.body;

  try {
    const query = await pool.query(`
    DELETE FROM solicitud_temporal SO WHERE 
    SO.id_conductor = ${id_conductor} AND SO.id_solicitud =${id_solicitud} 
    `);

    if (query.affectedRows > 0) {
      res.status(200).json({
        code: 200,
        message: "Eliminado correctamente.",
      });
    } else {
      res.status(500).json({
        code: 500,
        message: "Ocurrio un error, llama a soporte.",
      });
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error,
    });
  }
};
