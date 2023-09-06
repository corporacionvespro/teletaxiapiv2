import { check } from "express-validator";
import { Request, Response, NextFunction } from 'express';
import { validateResult } from "../helpers/validar-campos";
export const register_validator = [
    check("nombres","Tus nombres son obligatorios.").not().isEmpty(),
    check("telefono","El teléfono  es obligatorio.").not().isEmpty(),
    check("correo","El correo que ingresaste es inválido.").isEmail(),
    check("clave","La clave es obligatoria.").not().isEmpty(),
    (req :Request,res:Response,next:NextFunction) => {
        validateResult(req,res,next);
    }
];

export const register_socialmedia = [
    check("nombres","Tus nombres son obligatorios.").not().isEmpty(),
    check("correo","El correo que ingresaste es inválido.").isEmail(),
    check("idtoken","La clave es obligatoria.").not().isEmpty(),
    (req :Request,res:Response,next:NextFunction) => {
        validateResult(req,res,next);
    }
];

export const register_optsms = [
    check("telefono","El teléfono  es obligatorio.").not().isEmpty(),
    check("idtoken","El token es obligatorio.").not().isEmpty(),
    (req :Request,res:Response,next:NextFunction) => {
        validateResult(req,res,next);
    }
];

export const auth_credentials = [
    check("correo","El correo es obligatorio.").not().isEmpty(),
    check("correo","El correo que ingresaste es inválido.").isEmail(),
    check("clave","La clave es obligatoria.").not().isEmpty(),
    (req :Request,res:Response,next:NextFunction) => {
        validateResult(req,res,next);
    }
];

export const update_validator = [
    check("nombres","Tus nombres son obligatorios.").not().isEmpty(),
    check("telefono","El teléfono  es obligatorio.").not().isEmpty(),
    check("correo","El correo que ingresaste es inválido.").isEmail(),
    check("id_persona","El campo id_persona es oblicagorio.").not().isEmpty(),
    check("id_cuenta","El campo id_cuenta es oblicagorio.").not().isEmpty(),
    (req :Request,res:Response,next:NextFunction) => {
        validateResult(req,res,next);
    }
];

export const  postplace_validator = [
    check("id","El campo id_pasajero es oblicagorio.").not().isEmpty(),
    check("titulo","El titulo de lugar es obligatorios.").not().isEmpty(),
    check("direccion","La dirección  es obligatoria.").not().isEmpty(),
    check("latitud","El campo latitud  es inválido.").not().isEmpty(),
    check("longitud","El campo latitud  es longitud.").not().isEmpty(),
    (req :Request,res:Response,next:NextFunction) => {
        validateResult(req,res,next);
    }
];

export const  getplace_validator = [
    check("id_pasajero","El campo id_pasajero es oblicagorio.").not().isEmpty(),

    (req :Request,res:Response,next:NextFunction) => {
        validateResult(req,res,next);
    }
];