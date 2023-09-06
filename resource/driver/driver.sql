/*----- CREAR CONDUCTOR -----*/
DROP PROCEDURE IF EXISTS CREAR_CONDUCTOR;
delimiter //
CREATE PROCEDURE  CREAR_CONDUCTOR
( in nombres varchar(70), in telefono varchar(9), in correo varchar(50), in foto varchar(200),
  in placa varchar(45),in marca varchar(45),in unidad varchar(45),in color varchar(45),in anio int,
  in clave varchar(200) )
 begin 
 
 DECLARE  aux, aux2, aux3,id_persona,id_cuenta,id_vehiculo,id_conductor int;
 	set aux = (select persona.id_persona 
               from persona 
               where persona.telefono = telefono);
        set aux2 = (select persona.id_persona 
                from persona 
                where persona.correo = correo);
        set aux3 = (select vehiculo.id_vehiculo 
                from vehiculo 
                where vehiculo.unidad = unidad);
                       
    set id_persona = (select id_persona from persona where persona.correo=correo);
	if(aux<=>NULL AND aux2<=>NULL AND aux3 <=>NULL) then
         START TRANSACTION;
		insert into persona(id_persona,nombres,telefono,correo,foto) 
				values(NULL,nombres,telefono,correo,foto);
		set id_persona = last_insert_id();
        
        insert into cuenta(cod_rol,correo,clave) 
                values(2000,correo,clave);
        set id_cuenta = last_insert_id();
        
        insert into vehiculo(placa,marca,unidad,color,anio)
                values(placa, marca,unidad,color,anio);
        set id_vehiculo = last_insert_id();

        insert into conductor(id_persona,id_vehiculo,id_cuenta) 
                values(id_persona,id_vehiculo,id_cuenta);
        set id_conductor =last_insert_id();

        if(id_conductor !='NULL') then 
          commit; 
        else 
          rollback;
          signal sqlstate '45000' set message_text = 'No se pudo registrar al conductor.';
        end if;
  else signal sqlstate '45000' set message_text = 'El correo o telefono ya esta registrado.';
	end if;
END;
//

CALL CREAR_CONDUCTOR('Vespro Tech',"999999999","vespro@gmail.com","default.png",'ABC-123',"Tesla","0","Blanco","2022","123")



DROP PROCEDURE IF EXISTS CREAR_CONDUCTOR_REQUEST;
delimiter //
CREATE PROCEDURE  CREAR_CONDUCTOR_REQUEST
( in nombres varchar(70), in telefono varchar(9), in correo varchar(50),  in clave varchar(200),
  in placa varchar(45),in marca varchar(45),in color varchar(45),in anio int)
 begin 
 
 DECLARE  aux, aux2,id_persona,id_cuenta,id_vehiculo,id_conductor int;
 	set aux = (select persona.id_persona 
               from persona 
               where persona.telefono = telefono);
        set aux2 = (select persona.id_persona 
                from persona 
                where persona.correo = correo);
    
                       
    set id_persona = (select id_persona from persona where persona.correo=correo);
	if(aux<=>NULL AND aux2<=>NULL) then
         START TRANSACTION;
		insert into persona(id_persona,nombres,telefono,correo) 
				values(NULL,nombres,telefono,correo);
		set id_persona = last_insert_id();
        
        insert into cuenta(cod_rol,correo,clave) 
                values(2000,correo,clave);
        set id_cuenta = last_insert_id();
        
        insert into vehiculo(placa,marca,color,anio)
                values(placa, marca,color,anio);
        set id_vehiculo = last_insert_id();

        insert into conductor(id_persona,id_vehiculo,id_cuenta,estado) 
                values(id_persona,id_vehiculo,id_cuenta,"sinaprobar");
        set id_conductor =last_insert_id();

        if(id_conductor !='NULL') then 
          commit; 
        else 
          rollback;
          signal sqlstate '45000' set message_text = 'No se pudo registrar al conductor.';
        end if;
  else signal sqlstate '45000' set message_text = 'El correo o telefono ya esta registrado.';
	end if;
END;
//

DROP VIEW IF EXISTS TABLA_CONDUCTORES;
 CREATE VIEW TABLA_CONDUCTORES AS
    SELECT
    PE.id_persona as idpersona,
    VE.id_vehiculo as idvehiculo,
     CO.id_conductor as idconductor, 
     PE.nombres, 
     PE.foto,
     PE.telefono, 
     PE.correo, 
     VE.unidad, 
     VE.placa, 
     VE.marca,
     CU.id_cuenta as idcuenta,
     CU.clave,
     CO.estado FROM persona PE INNER JOIN conductor CO 
     ON PE.id_persona = CO.id_persona INNER JOIN vehiculo VE
     ON CO.id_vehiculo = VE.id_vehiculo INNER JOIN cuenta CU 
     ON CO.id_cuenta = CU.id_cuenta ORDER BY(CU.fechayhora) DESC;



drop procedure if exists VERIFY_DRIVER;
delimiter //
CREATE PROCEDURE VERIFY_DRIVER ( in correo varchar(50), id_cuenta INT) 
BEGIN
 DECLARE  exist_mail INT; 
  set exist_mail = (select persona.id_persona from persona 
      where persona.correo  = correo); 
	if(exist_mail<=>NULL) THEN
     signal sqlstate '45000' set message_text = 'Usuario o clave incorrecta.';
  ELSE 
        SELECT PE.id_persona, PE.foto, CO.id_conductor, VE.unidad, CU.id_cuenta, PE.nombres, 
        PE.telefono, PE.correo, CO.estado FROM persona PE 
        INNER JOIN conductor CO ON CO.id_persona = PE.id_persona 
        INNER JOIN vehiculo VE ON CO.id_vehiculo = VE.id_vehiculo
        INNER JOIN cuenta CU  ON CO.id_cuenta = CU.id_cuenta
        WHERE CU.correo =  correo AND CU.id_cuenta = id_cuenta;

  END IF; 
END;
//



DROP PROCEDURE IF EXISTS EDITAR_CONDUCTOR;
delimiter //
CREATE PROCEDURE  EDITAR_CONDUCTOR
( in id_persona int, in id_cuenta int, in nombres varchar(70), in telefono varchar(9), in correo varchar(50), in clave varchar(50))
BEGIN 
    
        UPDATE cuenta CU SET CU.correo = correo, CU.clave = clave
        WHERE CU.id_cuenta = id_cuenta;

        UPDATE persona P SET P.nombres = nombres, P.telefono = telefono, 
        P.correo = correo WHERE P.id_persona = id_persona;
END;
//      

DROP PROCEDURE IF EXISTS EDITAR_CONDUCTOR_PHOTO;
delimiter //
CREATE PROCEDURE  EDITAR_CONDUCTOR_PHOTO
( in id_persona int,in foto varchar(200) )
BEGIN 

        UPDATE persona P SET  P.foto = foto WHERE P.id_persona = id_persona;
END;
//      


DROP PROCEDURE IF EXISTS EDITAR_VEHICLE;
delimiter //
CREATE PROCEDURE  EDITAR_VEHICLE
( in id_vehiculo int,in placa varchar(45),in marca varchar(45),in unidad varchar(45),in color varchar(45),in anio int)
BEGIN 
        UPDATE vehiculo V SET V.placa =placa , V.marca = marca, 
        V.unidad = unidad, V.color = color, V.anio = anio
        WHERE V.id_vehiculo = id_vehiculo;
END;
//      