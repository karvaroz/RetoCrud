const app = require("./config/server");

const rutas = require("./src/app/routes/app");
rutas(app);

const connection = require("./config/dbConnection");



//Escuchar en el puerto

app.listen(app.get("port"), () => {
    console.log("Servidor en el puerto: http://localhost:3000/", app.get("port"));
})