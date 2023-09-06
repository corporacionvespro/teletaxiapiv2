
/*----- CREAR PASAJERO -----*/
drop procedure if exists CREAR_PASAJERO;
delimiter //
CREATE PROCEDURE  CREAR_PASAJERO
(in nombres varchar(70),in telefono char(9),
 in correo varchar(50), clave varchar(200))
BEGIN
DECLARE id_persona, aux,aux2, id_pasajero,id_cuenta INT;
	set aux = (select persona.id_persona 
               from persona 
               where persona.telefono = telefono);
  set aux2 = (select persona.id_persona 
               from persona 
               where persona.correo = correo);
	if(aux<=>NULL AND aux2<=>NULL) then
      START TRANSACTION;
        insert into persona(id_persona,nombres,telefono,correo) 
        values(NULL,nombres,telefono,correo);
          set id_persona = last_insert_id();
        insert into cuenta(cod_rol,correo,clave) values(1000,correo,clave);
          set id_cuenta = last_insert_id();
        insert into  pasajero(id_pasajero,id_persona,id_cuenta)
          values(NULL,id_persona,id_cuenta);
          set id_pasajero = last_insert_id();
        if(id_pasajero !='NULL') then 
          commit; 
        else 
          rollback;
          signal sqlstate '45000' set message_text = 'No se pudo registrar al pasajero.';
        end if;
  else signal sqlstate '45000' set message_text = 'El teléfono o correo ya esta registrado.';
	end if;
END;
//


/*----- CREAR PASAJERO POR FACEBOOK Y GOOGLE-----*/
drop procedure if exists CREAR_PASAJERO_FB;
delimiter //
CREATE PROCEDURE  CREAR_PASAJERO_FB
(in nombres varchar(70),in correo varchar(50), clave varchar(200))
BEGIN
DECLARE id_persona, aux,aux2, id_pasajero,id_cuenta,idcuenta INT;
  set aux = (select persona.id_persona 
               from persona 
               where persona.correo = correo);
  set idcuenta = (select cuenta.id_cuenta 
               from cuenta 
               where cuenta.correo = correo);

	if(aux<=>NULL) then
      START TRANSACTION;
        insert into persona(id_persona,nombres,telefono,correo) 
        values(NULL,nombres,null,correo);
          set id_persona = last_insert_id();
        insert into cuenta(cod_rol,correo,clave) values(1000,correo,clave);
          set id_cuenta = last_insert_id();
        insert into  pasajero(id_pasajero,id_persona,id_cuenta)
          values(NULL,id_persona,id_cuenta);
          set id_pasajero = last_insert_id();
        if(id_pasajero !='NULL') then 
           
              SELECT PE.id_persona, PA.id_pasajero, CU.id_cuenta, PE.nombres, PE.correo,PE.telefono, PA.estado
              FROM persona PE INNER JOIN pasajero PA ON PA.id_persona = PE.id_persona 
              INNER JOIN cuenta CU ON PA.id_cuenta = CU.id_cuenta
              WHERE CU.correo = correo AND CU.id_cuenta = id_cuenta;
                  commit; 
        else 
          rollback;
          signal sqlstate '45000' set message_text = 'No se pudo registrar al pasajero.';
        end if;
  else 
            SELECT PE.id_persona, PA.id_pasajero, CU.id_cuenta, PE.nombres, 
            PE.telefono, PE.correo, PA.estado FROM persona PE INNER JOIN
            pasajero PA ON PA.id_persona = PE.id_persona INNER JOIN 
            cuenta CU ON PA.id_cuenta = CU.id_cuenta 
            WHERE CU.correo = correo AND CU.id_cuenta = idcuenta;

	end if;
END;
//


/*----- CREAR PASAJERO POR SMS OPT----*/
drop procedure if exists CREAR_PASAJERO_OPT;
delimiter //
CREATE PROCEDURE  CREAR_PASAJERO_OPT
(in telefono char(9),clave varchar(200))
BEGIN
DECLARE id_persona, aux, id_pasajero,id_cuenta INT;
  set aux = (select persona.id_persona 
               from persona 
               where persona.telefono = telefono);
	if(aux<=>NULL) then
      START TRANSACTION;
        insert into persona(id_persona,telefono) 
        values(NULL,telefono);
          set id_persona = last_insert_id();
        insert into cuenta(cod_rol,correo,clave) values(1000,'vespro@gmail.com',clave);
          set id_cuenta = last_insert_id();
        insert into  pasajero(id_pasajero,id_persona,id_cuenta)
          values(NULL,id_persona,id_cuenta);
          set id_pasajero = last_insert_id();
        if(id_pasajero !='NULL') then 
              SELECT PE.id_persona, PA.id_pasajero, CU.id_cuenta, PE.nombres,  PE.telefono, PE.correo, PA.estado
              FROM persona PE INNER JOIN pasajero PA ON PA.id_persona = PE.id_persona 
              INNER JOIN cuenta CU ON PA.id_cuenta = CU.id_cuenta
              WHERE PE.telefono = telefono AND CU.clave = clave;
                  commit; 
        else 
          rollback;
          signal sqlstate '45000' set message_text = 'No se pudo registrar al pasajero.';
        end if;
  else 
              SELECT PE.id_persona, PA.id_pasajero, CU.id_cuenta, PE.nombres,  PE.telefono, PE.correo, PA.estado
              FROM persona PE INNER JOIN pasajero PA ON PA.id_persona = PE.id_persona 
              INNER JOIN cuenta CU ON PA.id_cuenta = CU.id_cuenta
              WHERE PE.telefono = telefono AND CU.clave = clave;

	end if;
END;
//


/*----- VERIFY AUTH CREDENTIALS -----*/

drop procedure if exists VERIFY_PASSENGER;
delimiter //
CREATE PROCEDURE VERIFY_PASSENGER ( in correo varchar(50), id_cuenta INT) 
BEGIN
 DECLARE  exist_mail INT; 
  set exist_mail = (select persona.id_persona from persona 
      where persona.correo  = correo); 
	if(exist_mail<=>NULL) THEN
     signal sqlstate '45000' set message_text = 'Usuario o clave incorrecta.';
  ELSE 
      SELECT PE.id_persona, PA.id_pasajero, CU.id_cuenta,  PE.nombres,  PE.telefono, PE.correo, PA.estado
      FROM persona PE INNER JOIN pasajero PA ON PA.id_persona = PE.id_persona 
      INNER JOIN cuenta CU ON PA.id_cuenta = CU.id_cuenta
      WHERE CU.correo = correo AND CU.id_cuenta = id_cuenta;
  END IF; 
END;
//

/*----- UPDATE INFO PASSENGER -----*/

drop procedure if exists UPDATE_INFO_PASSENGER;
delimiter //
CREATE PROCEDURE UPDATE_INFO_PASSENGER (
  in nombres varchar(70),in telefono char(9),
  in correo varchar(50), in id_persona INT, in id_cuenta INT)
  BEGIN 
   
        UPDATE persona P SET P.nombres = nombres, P.telefono = telefono, P.correo =correo 
        WHERE P.id_persona = id_persona; 
        UPDATE cuenta CU SET CU.correo = correo WHERE CU.id_cuenta = id_cuenta;

  END;

/*----- VIEW ALL PASENGERS -----*/

DROP VIEW IF EXISTS TABLA_PASAJEROS;
 CREATE VIEW TABLA_PASAJEROS AS
    SELECT 
       
        PE.id_persona,
        PE.nombres,
        PE.correo,
        PE.telefono,
        PA.estado,
        PA.id_pasajero      
    FROM
        persona PE INNER JOIN pasajero PA ON PE.id_persona = PA.id_persona
        INNER JOIN cuenta CU ON PA.id_cuenta = CU.id_cuenta ORDER BY(CU.fechayhora) DESC;



/*----- CREAR UN LUGAR FRECUENTE -----*/
drop procedure if exists CREATE_PLACE;
delimiter //
CREATE PROCEDURE  CREATE_PLACE
(in id_pasajero INT,in titulo varchar(100),in direccion varchar(200),
latitud DECIMAL(15,9), longitud DECIMAL(15,9))
BEGIN
DECLARE id_lugar INT;
      START TRANSACTION;
        insert into lugares_frecuentes(id_lugarfrecuente, id_pasajero,titulo,direccion,latitud,longitud) 
        values(NULL,id_pasajero,titulo,direccion,latitud,longitud);
          set id_lugar = last_insert_id();
        if(id_lugar !='NULL') then 
          commit; 
        else 
          rollback;
          signal sqlstate '45000' set message_text = 'No se pudo registrar lugar frecuente.';
        end if;
END;
//


/*----- TRAER LUGARES FRECUENTES DE UN PASAJERO -----*/

drop procedure if exists PLACES_PASSENGER;
delimiter //
CREATE PROCEDURE  PLACES_PASSENGER
(in id_pasajero INT)
BEGIN
    SELECT           
           LU.id_lugarfrecuente as 'id',
           LU.titulo,
           LU.direccion,
           LU.latitud,
           LU.longitud
    FROM
        lugares_frecuentes LU INNER JOIN pasajero PA ON LU.id_pasajero = PA.id_pasajero
      WHERE LU.id_pasajero = id_pasajero  ORDER BY(LU.fechayhora) ASC;

END;
//



