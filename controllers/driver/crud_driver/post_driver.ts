import { Request, Response } from "express";
const pool = require("../../../mysql/database");
const path = require("path");
const fs = require("fs");

export const postDriver = async (req: Request, res: Response) => {
  try {
    const { nombres, telefono, correo, foto, placa,marca,unidad,color,anio,clave} = req.body;
    const query = await pool.query(
      `CALL CREAR_CONDUCTOR(
        '${nombres}',
        '${telefono}',
        '${correo}',
        '${(foto === undefined) ? 'driver.png' : foto}',  
        '${placa}',  
        '${marca}',  
        '${unidad}',  
        '${color}',  
        '${anio}',  
        '${clave}'
      );`
    );
    if (query.serverStatus === 16418) {
      res.status(200).json({
        message: "Conductor creado correctamente",
      });
    } else {
      if( req.body.foto === undefined || req.body.foto === "undefined"){
        res.status(400).json({
          message:
            "Al parecer los datos ingresados son incorrectos, por favor intentelo de nuevo."
        });
       }else{
        let directory = path.join(__dirname, "../../../public/images/" + req.body.foto);
        fs.unlinkSync(directory);
        res.status(400).json({
          message:
          "Al parecer los datos ingresados son incorrectos, por favor intentelo de nuevo."
        });
       }
    
    }
  } catch (error) {
   
     if( req.body.foto === undefined || req.body.foto === "undefined"){
      res.status(500).json({
        message:
          "Posiblemente el correo, telefono o unidad ya existe, verifique sus datos o comuniquese con el equipo de soporte."
      });
     }else{
      let directory = path.join(__dirname, "../../../public/images/" + req.body.foto);
      fs.unlinkSync(directory);
      res.status(500).json({
        error,
        message:
          "Posiblemente el correo, telefono o unidad ya existe, verifique sus datos o comuniquese con el equipo de soporte."
      });
     }
    }
};




export const postDriverRequest = async (req: Request, res: Response) => {
  try {
    const { nombres, telefono, correo, clave, placa,marca,color,anio} = req.body;
    const query = await pool.query(
      `CALL CREAR_CONDUCTOR_REQUEST(
        '${nombres}',
        '${telefono}',
        '${correo}',
        '${clave}',
        '${placa}',  
        '${marca}',  
        '${color}',  
        '${anio}'
      );`
    );
    if (query.serverStatus === 16418) {
      res.status(200).json({
        message: "Conductor creado correctamente",
      });
    } 
  } catch (error) {
    res.status(500).json({
      error,
      message:
        "Posiblemente el correo, telefono o unidad ya existe, verifique sus datos o comuniquese con el equipo de soporte."
    });
  }
};

export const stateDriver = async (req: Request, res: Response) => {
  const { id_conductor, estado} = req.body;

  try {
    const query = await pool.query(`
    UPDATE conductor CO SET CO.estado='${estado}'
    WHERE id_conductor ='${id_conductor}';`);

    if (query.affectedRows > 0) {
      res.status(200).json({
        code: 200,
        message: `Estado en modo ${estado}`
      });
    }else{
      res.status(400).json({
        code: 400,
        message: "No se pudo actualizar el estado."
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error en la solicitud, comuniquese con el equipo de soporte.",
      error: error,
    });
  }
};


