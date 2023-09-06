import { check } from "express-validator";
import { Request, Response, NextFunction } from 'express';
import { validateResult } from "../helpers/validar-campos";
export const register_admin= [
    check("nombres","El correo es obligatorio.").not().isEmpty(),
    check("correo","El correo es inválido.").isEmail(),
    check("clave","La clave es obligatoria.").not().isEmpty(),

    (req :Request,res:Response,next:NextFunction) => {
        validateResult(req,res,next);
    }
    
    
];



export const auth_admin = [
    check("correo","El correo es obligatorio.").not().isEmpty(),
    check("correo","Ingrese un correo valido.").isEmail(),
    check("clave","La contrasena es obligatoria.").not().isEmpty(),

    (req :Request,res:Response,next:NextFunction) => {
        validateResult(req,res,next);
    }
    
    
];