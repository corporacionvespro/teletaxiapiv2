import { check } from "express-validator";
import { Request, Response, NextFunction } from 'express';
import { validateResult } from "../helpers/validar-campos";
export const credentials_validator = [
    check("correo","El correo es obligatorio.").not().isEmpty(),
    check("correo","Ingrese un correo valido.").isEmail(),
    check("clave","La contrasena es obligatoria.").not().isEmpty(),

    (req :Request,res:Response,next:NextFunction) => {
        validateResult(req,res,next);
    }
    
    
];