import { Request, Response } from "express";
const pool = require("../../../mysql/database");
const path = require("path");
const fs = require("fs");

export const updateDriver = async (req: Request, res: Response) => {
  try {
    const { id_persona,id_cuenta, nombres, telefono, correo,clave } = req.body;
    const query = await pool.query(
      `CALL EDITAR_CONDUCTOR(
        '${id_persona}',
        '${id_cuenta}',
        '${nombres}',
        '${telefono}',
        '${correo}',
        '${clave}'
      );`
    );
    if (query.affectedRows > 0) {
      res.status(200).json({
        message: "Conductor actualizado correctamente",
      });
    }
  } catch (error) {}
};

export const updateDriverPhoto = async (req: Request, res: Response) => {
  try {
    const { id_persona, foto } = req.body;
    const person = await pool.query(
      `select * from persona where id_persona='${id_persona}'`
    );

    if (
      person[0].foto !== "default.png"
    ) {
        if (
          fs.existsSync(
              path.join(__dirname, "../../../public/images/" + person[0].foto)
            )
          ) {
            let directory = path.join(
              __dirname,
              "../../../public/images/" + person[0].foto
            );
            fs.unlinkSync(directory);
        }
        
        const query = await pool.query(
          `CALL EDITAR_CONDUCTOR_PHOTO(
              '${id_persona}',
              '${foto}'
            );`
        );
        
        if (query.affectedRows > 0) {
          res.status(200).json({
            message: "Conductor actualizado correctamente",
          });
        }
      
    } else {
      const query = await pool.query(
        `CALL EDITAR_CONDUCTOR_PHOTO(
              '${id_persona}',   
              '${foto}'
            );`
      );
      if (query.affectedRows > 0) {
        res.status(200).json({
          message: "Conductor actualizado correctamente",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el conductor",
    });
  }
};


export const updateVehicle = async (req: Request, res: Response) => {
  try {
    const { id_vehiculo,placa,marca,unidad,color,anio} = req.body;
    const query = await pool.query(
      `CALL EDITAR_VEHICLE(
        '${id_vehiculo}',
        '${placa}',
        '${marca}',
        '${unidad}',
        '${color}',
        '${anio}'
      );`
    );
    if (query.affectedRows > 0) {
      res.status(200).json({
        message: "Vehiculo actualizado correctamente",
      });
    }else{
      res.status(
        400).json({
        message: "Revisa bien tus datos",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el vehiculo, comuniquese con soporte.",
    });
  }
};