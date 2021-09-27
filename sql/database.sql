-- RETO JAIRO S.A

CREATE DATABASE db_jariousuarios;

USE db_jariousuarios;

CREATE TABLE tb_usuariosregistrados (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombre_completo VARCHAR (50) NOT NULL,
    nombre_usuario VARCHAR (50) NOT NULL,
    contrasena VARCHAR (150) NOT NULL,
    fecha_creacion  DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    restringido VARCHAR (10) NOT NULL
);

INSERT INTO tb_usuariosregistrados(nombre_completo, nombre_usuario, contrasena, fecha_creacion) values ("Karina Vargas", "admin", "admon321", 1/07/2021);

SELECT * FROM tb_usuariosregistrados;