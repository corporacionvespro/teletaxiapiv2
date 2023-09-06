import bcrypt from "bcryptjs";

export const matchClave = (clave: string, claveEncriptada: string) => {
    return bcrypt.compareSync(clave, claveEncriptada);
};

export const encriptarClave = (clave: string) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(clave, salt);
    return hash;
  };