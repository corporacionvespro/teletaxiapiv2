import jwt from "jsonwebtoken";
import {Administrador, Passenger} from '../models/models'

export const generaJWT = (payload: Passenger) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      `${process.env.AUTH_PASSENGER}`,
      {
        expiresIn: "180d",
      },
      (err, token) => {
        if (err) {
          reject("No se pudo generr el JWT: " + err);
        } else {
          resolve(token);
        }
      }
    );
  });
};


export const generaJWTAdmin = (payload: Administrador) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      `${process.env.AUTH_ADMIN}`,
      {
        expiresIn: "7d",
      },
      (err, token) => {
        if (err) {
          reject("No se pudo generr el JWT: " + err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generaJWT,
  generaJWTAdmin
};
