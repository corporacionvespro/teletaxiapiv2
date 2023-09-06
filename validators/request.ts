import { check } from "express-validator";
import { Request, Response, NextFunction } from 'express';
import { validateResult } from "../helpers/validar-campos";

export const request_validator = [
    check("id_pasajero","Se necesita el id del pasajero en cuestion.").not().isEmpty(),
    check("latitud_origen","Se necesita una latitud origen.").not().isEmpty(),
    check("longitud_origen","Se necesita una longitud origen.").not().isEmpty(),
    check("latitud_destino","Se necesita una latitud destino.").not().isEmpty(),
    check("longitud_destino","Se necesita una longitud destino.").not().isEmpty(),
    check("direccion_actual","La direccion actual es obligatoria.").not().isEmpty(),
    check("direccion_destino","La direccion destino es obligatoria.").not().isEmpty(),

    (req :Request,res:Response,next:NextFunction) => {
        validateResult(req,res,next);
    }
    
    
];