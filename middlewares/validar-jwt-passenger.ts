import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { Administrador } from "../models/models";

const validaJWTPassenger = (req: Request, res: Response, next: Function) => {
  const token = req.header("x-token-passenger");
  if (!token) {
    return res.status(401).json({
      msg: "No estás verificado para esta petición 🐸.",
    });
  }

  try {
    const { estado } = jwt.verify(
      token,
      process.env.AUTH_PASSENGER as string
    ) as Administrador;
    if (estado !== "bloqueado") {
      next();
    } else {
      res.status(401).json({
        msg: "Tu cuenta ha sido bloqueada, no tienes acceso.",
      });
    }
  } catch (error) {
    res.status(401).json({
      msg: "No estás verificado para esta petición 🐸 ," + error,
    });
  }
};
export default validaJWTPassenger;

