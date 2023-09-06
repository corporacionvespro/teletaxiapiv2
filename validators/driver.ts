import { check } from "express-validator";
import { Request, Response, NextFunction } from 'express';
import { validateResult } from "../helpers/validar-campos";

export const postdriver_validator = [
    check("nombres","El nombre es obligatorios.").not().isEmpty(),
    check("telefono","El teléfono  es obligatorio.").not().isEmpty(),
    check("correo","El correo que ingresaste es inválido.").isEmail(),
    check("placa","La placa del vehiculo es obligatoria.").not().isEmpty(),
    check("marca","La marca del vehiculo es obligatoria.").not().isEmpty(),
    check("unidad","La unidad del vehiculo es obligatoria.").not().isEmpty(),
    check("color","El color del vehiculo es obligatoria.").not().isEmpty(),
    check("anio","El anio del vehiculo es obligatoria.").not().isEmpty(),
    check("clave","La clave es obligatoria.").not().isEmpty(),
    (req :Request,res:Response,next:NextFunction) => {
        validateResult(req,res,next);
    }
];