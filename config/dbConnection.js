const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "db_jariousuarios"
});

connection.connect((err)=>{
    if(err){
        console.log("El error de conexion a la Base de Datos es: " + err)
        return;
    }
    console.log("Conectado exitosamente a la Base de Datos");
});

module.exports = connection;