
/*----- CREAR ADMINISTRADOR -----*/
drop procedure if exists CREAR_ADMINISTRADOR;
delimiter //
CREATE PROCEDURE  CREAR_ADMINISTRADOR
(in nombres varchar(70),in telefono char(9), 
in correo varchar(50), clave varchar(200))
BEGIN
DECLARE id_persona, aux, id_admin,id_cuenta INT;
	set aux = (select persona.id_persona 
               from persona 
               where persona.correo = correo);
	if(aux<=>NULL) then
      START TRANSACTION;
        insert into persona(id_persona,nombres,telefono,correo) 
          values(NULL,nombres,telefono,correo);
          set id_persona = last_insert_id();
        insert into cuenta(cod_rol,correo,clave) values(3000,correo,clave);
          set id_cuenta = last_insert_id();
        insert into administrador(id_administrador,id_persona, id_cuenta) 
          values(NULL,id_persona,id_cuenta);
          set id_admin = last_insert_id();
        if(id_admin !='NULL') then 
          commit; 
        else 
          rollback;
          signal sqlstate '45000' set message_text = 'No se pudo registrar al administrador.';
        end if;
  else signal sqlstate '45000' set message_text = 'El correo ya esta registrado.';
	end if;
END;
//

/*----- VERIFY AUTH CREDENTIALS -----*/

drop procedure if exists VERIFY_ADMIN;
delimiter //
CREATE PROCEDURE VERIFY_ADMIN ( in correo varchar(50), id_cuenta INT) 
BEGIN  
  DECLARE exist_mail INT; 
  set exist_mail = (select persona.id_persona from persona 
      where persona.correo  = correo); 
	if(exist_mail<=>NULL) THEN
     signal sqlstate '45000' set message_text = 'Usuario o clave incorrecta.';
  ELSE 
      SELECT PE.id_persona, AD.id_administrador, CU.id_cuenta, PE.nombres, PE.telefono, PE.correo, CU.estado
      FROM persona PE INNER JOIN administrador AD ON AD.id_persona = PE.id_persona 
      INNER JOIN cuenta CU ON AD.id_cuenta = CU.id_cuenta
      WHERE CU.correo = correo AND CU.id_cuenta = id_cuenta;
  END IF; 
END;
//