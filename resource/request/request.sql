
drop procedure if exists SOLICITUD;
delimiter //
CREATE PROCEDURE SOLICITUD
(
   in id_pasajero int,
   in latitud_origen decimal(15,9),
   in longitud_origen decimal(15,9),
   in latitud_destino decimal(15,9),
   in longitud_destino decimal(15,9),
   in direccion_actual varchar(70),
   in direccion_destino varchar(200),
   in referencia varchar(70),
   in precio float,
   in tipo_pago varchar(40)
)


BEGIN
DECLARE id_localizacion,id_solicitud INT;

      START TRANSACTION;
         UPDATE  pasajero PA SET  PA.estado = "espera" WHERE PA.id_pasajero = id_pasajero;
        insert into localizacion
        values(NULL,latitud_origen,longitud_origen,latitud_destino,
        longitud_destino,direccion_actual,direccion_destino,referencia);
         set id_localizacion = last_insert_id();
        insert into solicitud(id_solicitud,id_pasajero,id_conductor,id_localizacion,estado,tipo,precio,tipo_pago) 
        values(NULL, id_pasajero,1,id_localizacion,'pendiente','app', precio, tipo_pago);
          set id_solicitud = last_insert_id();
        if(id_solicitud !='NULL') then 
          commit; 
           SELECT id_solicitud;
        else 
          rollback;
          signal sqlstate '45000' set message_text = 'Error al crear el viaje, revise los datos.';
        end if;
END;
//


drop procedure if exists OPINION_PASSENGER;
delimiter //
CREATE PROCEDURE OPINION_PASSENGER(
   in id_solicitud int,
   in id_pasajero int,
   in valoracion decimal,
   in comentario varchar(150)
)
BEGIN
DECLARE id_opinion INT;

        insert into opinion (id_solicitud,id_pasajero,valoracion,comentario)
        values(id_solicitud,id_pasajero,valoracion,comentario);
   
END;
//


drop procedure if exists OPINION_DRIVER;
delimiter //
CREATE PROCEDURE OPINION_DRIVER(
   in id_solicitud int,
   in id_conductor int,
   in valoracion decimal,
   in comentario varchar(150)
)
BEGIN
DECLARE id_opinion INT;

        insert into opinion_conductor (id_solicitud,id_conductor,valoracion,comentario)
        values(id_solicitud,id_conductor,valoracion,comentario);
   
END;
//





drop procedure if exists SOLICITUD_WEB;
delimiter //
CREATE PROCEDURE SOLICITUD_WEB
(
   in nombres varchar(70),
   in telefono varchar(50),
   in latitud_origen decimal(15,9),
   in longitud_origen decimal(15,9),
   in direccion_actual varchar(70),
   in referencia varchar(70),
  in precio float
)

proc_label:BEGIN
DECLARE id_localizacion,id_solicitud,id_persona,id_pasajero,id_cuenta INT;
 set id_pasajero = (
   select PA.id_pasajero from pasajero PA 
   INNER JOIN persona PE 
   ON PA.id_persona = PE.id_persona
   where PE.telefono = telefono);
	if(id_pasajero<=>NULL) then
        START TRANSACTION;
        insert into persona(id_persona,nombres,telefono, correo)
        values(NULL,nombres,telefono, CONCAT(telefono,'@gmail.com'));
          set id_persona = last_insert_id();
        insert into info_pasajero(id,id_persona, direccion,referencia,latitud,longitud)
        values(NULL,id_persona,direccion_actual,referencia, latitud_origen,longitud_origen );
        insert into cuenta(cod_rol,correo,clave) values(1000, CONCAT(telefono,'@gmail.com'),telefono);
          set id_cuenta = last_insert_id();
        insert into  pasajero(id_pasajero,id_persona,id_cuenta)
          values(NULL,id_persona,id_cuenta);
          set id_pasajero = last_insert_id();
        insert into localizacion
        values(NULL,latitud_origen,longitud_origen,latitud_origen,
        longitud_origen,direccion_actual,direccion_actual,referencia);
         set id_localizacion = last_insert_id();
        insert into solicitud(id_solicitud,id_pasajero,id_conductor,id_localizacion,estado, precio) 
        values(NULL, id_pasajero,1,id_localizacion,'pendiente',precio);
         set id_solicitud = last_insert_id();
        if(id_solicitud !='NULL') then 
          commit; 
           SELECT id_solicitud;
            LEAVE proc_label;
        else 
          rollback;
          signal sqlstate '45000' set message_text = 'Error al crear el viaje, revise los datos.';
        end if;
   else 

    START TRANSACTION;
        UPDATE  pasajero PA SET  PA.estado = "espera" WHERE PA.id_pasajero = id_pasajero;
        insert into localizacion values(NULL,latitud_origen,longitud_origen,latitud_origen,
        longitud_origen,direccion_actual,referencia,referencia);
         set id_localizacion = last_insert_id();
        insert into solicitud(id_solicitud,id_pasajero,id_conductor,id_localizacion,estado,precio) 
        values(NULL, id_pasajero,1,id_localizacion,'pendiente',precio);
          set id_solicitud = last_insert_id();
        if(id_solicitud !='NULL') then 
          commit; 
          SELECT id_solicitud;
           LEAVE proc_label;
        else 
          rollback;
          signal sqlstate '45000' set message_text = 'Error al crear el viaje, revise los datos.';
        end if;
     
    end if;
END;
//




DROP VIEW IF EXISTS TABLA_SOLICITUDES;
 CREATE VIEW TABLA_SOLICITUDES AS
    select 
    SO.id_solicitud as 'id',
    
     PC.nombres as 'conductor',
     PP.nombres AS 'pasajero', 
     PP.telefono as 'telefono',
     LO.direccion_actual as 'origen', 
     LO.direccion_destino as 'destino',
     LO.referencia,
     LO.latitud_origen as 'latorigen', 
     LO.longitud_origen as 'lngorigen',
     LO.latitud_destino as 'latdestino',
     LO.longitud_destino as 'lngdestino',
     VE.unidad,
     SO.fechayhora, 
     SO.estado 
     from solicitud SO 
     INNER JOIN conductor CO 
     ON SO.id_conductor = CO.id_conductor 
     INNER JOIN persona PC
     ON PC.id_persona = CO.id_persona 
     INNER JOIN pasajero PA 
     ON SO.id_pasajero = PA.id_pasajero 
     INNER JOIN persona PP 
     ON PP.id_persona = PA.id_persona 
     inner join localizacion LO 
     on SO.id_localizacion = LO.id_localizacion 
    INNER JOIN vehiculo VE
     ON VE.id_vehiculo = CO.id_vehiculo
     WHERE YEAR(SO.fechayhora) = YEAR(CURRENT_DATE()) 
     AND MONTH(SO.fechayhora) = MONTH(CURRENT_DATE())
     AND DAY(SO.fechayhora) = DAY(CURRENT_DATE())
     ORDER BY(SO.fechayhora) DESC;
     


DROP VIEW IF EXISTS SOLICITUDES_PENDIENTES;
 CREATE VIEW SOLICITUDES_PENDIENTES AS
    select 
     SO.id_solicitud as 'id',
     PP.nombres AS 'pasajero', 
     PA.token,
     LO.direccion_actual as 'origen', 
     LO.direccion_destino as 'destino',
     LO.referencia,
     LO.latitud_origen as 'latorigen', 
     LO.longitud_origen as 'lngorigen',
     LO.latitud_destino as 'latdestino',
     LO.longitud_destino as 'lngdestino',
     SO.estado,
     SO.tipo,
     SO.precio,
     SO.tipo_pago,
     SO.fechayhora
     from solicitud SO 
     INNER JOIN pasajero PA 
     ON SO.id_pasajero = PA.id_pasajero 
     INNER JOIN persona PP 
     ON PP.id_persona = PA.id_persona 
     inner join localizacion LO 
     on SO.id_localizacion = LO.id_localizacion 
     WHERE SO.estado = 'pendiente'
     ORDER BY(SO.fechayhora) DESC;



drop procedure if exists INFO_SOLICITUD;
delimiter //
CREATE PROCEDURE INFO_SOLICITUD
( in id_solicitud int)
BEGIN
       SELECT 
     SO.id_solicitud as 'id',
     SO.precio,
     SO.tipo_pago,
     PC.nombres as 'conductor',
     CO.latitud as 'lat_driver',
     CO.longitud as 'lng_driver',
     PP.nombres AS 'pasajero',
     PP.telefono AS 'tel_passenger',
     PC.foto,
     PC.telefono,
  	 VE.unidad,
     VE.marca,
     VE.placa,
     VE.color,
     LO.referencia,
     LO.latitud_origen as 'lat',
     LO.longitud_origen as 'lng',
     LO.latitud_destino as 'lat_destiny',
     LO.longitud_destino as 'lng_destiny',
     LO.direccion_actual as 'direccion',
     LO.direccion_destino as 'destino',
     SO.estado 
     from solicitud SO 
     INNER JOIN conductor CO 
     ON SO.id_conductor = CO.id_conductor 
     INNER JOIN persona PC
     ON PC.id_persona = CO.id_persona 
     INNER JOIN pasajero PA
     ON  SO.id_pasajero =PA.id_pasajero
    INNER JOIN persona PP
    ON PP.id_persona = PA.id_persona
     INNER JOIN vehiculo VE
	   ON CO.id_vehiculo = VE.id_vehiculo
      INNER JOIN localizacion LO
      	ON SO.id_localizacion  = LO.id_localizacion
     WHERE SO.id_solicitud = id_solicitud;
END;
//

--pendiente (se crea por defecto), aceptado (el conductor), enruta (lo hace el pasajero)
drop procedure if exists ACEPT_REQUEST;
delimiter //
CREATE PROCEDURE ACEPT_REQUEST
(in id_solicitud INT, in id_conductor INT, in precio float)
BEGIN
DECLARE estado VARCHAR(45);

  set estado = (select SO.estado 
               from solicitud SO
               where SO.id_solicitud = id_solicitud);
	  if(estado != 'pendiente') then
          signal sqlstate '45000' set message_text = 'El estado de la solicitud no esta en pendiente.';
    else
         UPDATE  solicitud SO SET  SO.estado = "abordo" 
         WHERE SO.id_solicitud = id_solicitud;

         UPDATE  solicitud SO SET  SO.id_conductor = id_conductor
         WHERE SO.id_solicitud = id_solicitud;

     

         UPDATE conductor CO SET CO.estado = "ocupado"
         WHERE CO.id_conductor = id_conductor;
    end if;
END;
//


drop procedure if exists FINISH_REQUEST;
delimiter //
CREATE PROCEDURE FINISH_REQUEST
(in id_solicitud INT, in id_conductor INT)
BEGIN
         UPDATE  solicitud SO SET  SO.estado = "finalizado" 
         WHERE SO.id_solicitud = id_solicitud;
         UPDATE conductor CO SET CO.estado = "activo"
         WHERE CO.id_conductor = id_conductor;
END;
//


drop procedure if exists STATE_REQUEST_DRIVER;
delimiter //
CREATE PROCEDURE STATE_REQUEST_DRIVER
(in id_solicitud INT, in estado_viaje VARCHAR(45), 
in id_conductor INT, in estado_conductor VARCHAR(45))
BEGIN
         UPDATE  solicitud SO SET  SO.estado = estado_viaje
         WHERE SO.id_solicitud = id_solicitud;
         UPDATE conductor CO SET CO.estado = estado_conductor
         WHERE CO.id_conductor = id_conductor;

END;
//


drop procedure if exists STATE_REQUEST_PASSENGER;
delimiter //
CREATE PROCEDURE STATE_REQUEST_PASSENGER
(in id_solicitud INT, in estado_viaje VARCHAR(45), 
in id_pasajero INT, in estado_pasajero VARCHAR(45))
BEGIN
         UPDATE  solicitud SO SET  SO.estado = estado_viaje
         WHERE SO.id_solicitud = id_solicitud;
         UPDATE pasajero CO SET CO.estado = estado_pasajero
         WHERE CO.id_pasajero = id_pasajero;

END;
//


drop procedure if exists REQUEST_TEMPORAL;
delimiter //
CREATE PROCEDURE REQUEST_TEMPORAL
(in id_solicitud INT, in id_conductor INT, in precio FLOAT,
 in latitud decimal(15,9),in longitud decimal(15,9)

)
BEGIN
   INSERT INTO solicitud_temporal (id_solicitud, id_conductor,tarifa) 
      VALUES (id_solicitud, id_conductor, precio);
    UPDATE conductor CO SET CO.latitud=latitud, CO.longitud = longitud
      WHERE CO.id_conductor = id_conductor;

END;
//