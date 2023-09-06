
CREATE DATABASE chapatutaxi;
USE chapatutaxi;
CREATE TABLE rol (
  cod_rol INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  nombre_rol VARCHAR(60) 
);

INSERT INTO rol  VALUES (1000, 'pasajero');
INSERT INTO rol  VALUES (2000, 'conductor');
INSERT INTO rol  VALUES (3000, 'administrador');

CREATE TABLE cuenta (
  id_cuenta INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  cod_rol INT NOT NULL,
  correo VARCHAR (50) NOT NULL,
  clave VARCHAR(200) NOT NULL,
  estado VARCHAR(50) DEFAULT 'inactivo',
  fechayhora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT cuenta_rol FOREIGN KEY (cod_rol) REFERENCES rol(cod_rol) 
);

CREATE TABLE persona (
  id_persona INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  nombres VARCHAR(70),
  telefono VARCHAR(50),
  correo VARCHAR(50),
  foto VARCHAR(200) DEFAULT 'https://chapatutaxi.com/chapaapi/images/logo.png'
);

CREATE TABLE pasajero(
  id_pasajero INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  id_persona INT NOT NULL,
  id_cuenta INT NOT NULL,
  token TEXT,
  estado VARCHAR(45) DEFAULT 'inactivo',
  CONSTRAINT pasajero_persona FOREIGN KEY (id_persona) REFERENCES persona (id_persona),
  CONSTRAINT pasajero_cuenta FOREIGN KEY (id_cuenta) REFERENCES cuenta(id_cuenta) 
);


CREATE TABLE administrador(
  id_administrador INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  id_persona INT NOT NULL,
  id_cuenta INT NOT NULL,
  estado VARCHAR(45) DEFAULT 'inactivo',
  CONSTRAINT administrador_persona FOREIGN KEY (id_persona) REFERENCES persona (id_persona),
  CONSTRAINT administrador_cuenta FOREIGN KEY (id_cuenta) REFERENCES cuenta(id_cuenta) 
);

CREATE TABLE vehiculo(
  id_vehiculo INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  placa VARCHAR(45) NOT NULL,
  marca VARCHAR(45),
  unidad VARCHAR(45),
  color VARCHAR(45),
  anio INT
);


CREATE TABLE conductor(
  id_conductor INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  id_persona INT NOT NULL,
  id_vehiculo INT NOT NULL,
  id_cuenta INT NOT NULL,
  token TEXT,
  latitud DECIMAL(15,9) DEFAULT '0.000000000',
  longitud DECIMAL(15,9) DEFAULT '0.000000000',
  estado VARCHAR(45) DEFAULT 'inactivo',
  CONSTRAINT conductor_persona FOREIGN KEY (id_persona) REFERENCES persona (id_persona) ,
  CONSTRAINT conductor_vehiculo FOREIGN KEY (id_vehiculo) REFERENCES vehiculo(id_vehiculo) ,
  CONSTRAINT conductor_cuenta FOREIGN KEY (id_cuenta) REFERENCES cuenta(id_cuenta) 
);



CREATE TABLE localizacion(
  id_localizacion INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  latitud_origen DECIMAL(15,9) DEFAULT '0.000000000',
  longitud_origen DECIMAL(15,9) DEFAULT '0.000000000',
  latitud_destino DECIMAL(15,9) DEFAULT '0.000000000',
  longitud_destino DECIMAL(15,9) DEFAULT '0.000000000',
  direccion_actual VARCHAR(70),
  direccion_destino VARCHAR(70),
  referencia VARCHAR(70) 
);


CREATE TABLE solicitud(
  id_solicitud INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  id_pasajero INT NOT NULL,
  id_conductor INT DEFAULT 0,
  id_localizacion INT NOT NULL,
  fechayhora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  estado VARCHAR(50) DEFAULT 'pendiente', 
  tipo VARCHAR(45),
  precio FLOAT DEFAULT 0,
  tipo_pago VARCHAR(40),
  CONSTRAINT solicitud_pasajero FOREIGN KEY (id_pasajero) REFERENCES pasajero (id_pasajero),
  CONSTRAINT solicitud_localizacion FOREIGN KEY (id_localizacion) REFERENCES localizacion (id_localizacion) 
);


CREATE TABLE solicitud_temporal(
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  id_solicitud INT NOT NULL,
  id_conductor INT NOT NULL,
  fechayhora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  tarifa FLOAT
);


CREATE TABLE opinion(
  id_opinion INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  id_solicitud INT NOT NULL,
  id_pasajero INT NOT NULL,
  valoracion FLOAT NOT NULL,
  comentario TEXT,
  fechayhora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT opinion_pasajero FOREIGN KEY (id_pasajero) REFERENCES pasajero (id_pasajero) ,
  CONSTRAINT opinion_solicitud FOREIGN KEY (id_solicitud) REFERENCES solicitud (id_solicitud) 
);

CREATE TABLE opinion_conductor (
  id_opinion INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  id_solicitud INT NOT NULL,
  id_conductor INT NOT NULL,
  valoracion FLOAT NOT NULL,
  comentario TEXT,
  fechayhora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_opinion_conductor FOREIGN KEY (id_conductor) REFERENCES conductor (id_conductor) ,
  CONSTRAINT fk_opinion_solicitud FOREIGN KEY (id_solicitud) REFERENCES solicitud (id_solicitud) 
);



CREATE TABLE lugares_frecuentes (
  id_lugarfrecuente INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  id_pasajero INT NOT NULL,
  titulo VARCHAR(100),
  latitud  DECIMAL(15,9) DEFAULT '0.000000000',
  longitud DECIMAL(15,9) DEFAULT '0.000000000',
  direccion varchar(200),
  fechayhora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_pasajerolf FOREIGN KEY (id_pasajero) REFERENCES pasajero(id_pasajero) 
);

CREATE TABLE info_pasajero(
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  id_persona INT NOT NULL,
  direccion VARCHAR(100),
  referencia VARCHAR(60),
  latitud  DECIMAL(15,9) DEFAULT '0.000000000',
  longitud DECIMAL(15,9) DEFAULT '0.000000000',
  CONSTRAINT fk_info_pasajero FOREIGN KEY(id_persona) REFERENCES persona(id_persona)
);

CREATE TABLE wallet(
  id_wallet INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  id_conductor INT NOT NULL,
  total float,
  CONSTRAINT fk_wallet_conductor FOREIGN KEY(id_conductor) REFERENCES conductor(id_conductor)
)


SELECT PE.nombres as 'conductor', CO.id_conductor, ST.tarifa, VE.placa, VE.unidad, VE.marca FROM solicitud_temporal ST INNER JOIN solicitud SO ON ST.id_solicitud = SO.id_solicitud INNER JOIN conductor CO ON ST.id_conductor = CO.id_conductor INNER JOIN vehiculo VE ON CO.id_vehiculo = VE.id_vehiculo INNER JOIN persona PE ON PE.id_persona = CO.id_persona WHERE SO.id_solicitud =1;




SELECT COUNT(*) FROM information_schema.routines WHERE routine_type = 'PROCEDURE' AND routine_schema = 'chapatutaxi';
SELECT COUNT(*) FROM information_schema.views WHERE table_schema = 'chapatutaxi';
