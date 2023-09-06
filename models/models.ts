export interface Passenger {
    id_persona: number,
    id_pasajero: number,
    id_cuenta: number,
    nombres: string;
    correo: string;
    telefono: string;
    estado: string;
    role: 'passenger'

  }

  export interface Administrador {
    id_persona: number,
    id_administrador: number,
    id_cuenta: number,
    nombres: string;
    correo: string;
    telefono: string;
    estado: string;
    role: 'admin'
  }