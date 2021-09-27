const app = require('../../../config/server');
const connection = require('../../../config/dbConnection');
const { request } = require('../../../config/server');



module.exports = app => {

    app.get('/', (req,res) => {
        if (req.session.loggedin) {
            connection.query("SELECT * FROM tb_usuariosregistrados", (err, result) => {
                if(err){
                    res.send(err);
                } else {
                    res.render("../views/index.ejs", {
                        usuariosregistrados: result,
                        login: true,
                        name: req.session.nombre_usuario
                    });
                }
            })
        } else {
            res.render('../views/login.ejs');
        }

    })

    app.post('/auth', async (req, res) => {
        const { nombre_usuario, contrasena } = req.body;

        if (nombre_usuario && contrasena) {
            connection.query('SELECT * FROM tb_usuariosregistrados WHERE nombre_usuario = ?', [nombre_usuario], async (error, results) => {
                console.log(results[0].contrasena===contrasena);
                if (results.length === 0 || !(results[0].contrasena===contrasena) ) {
                    res.render('../views/login.ejs', {
                        //config sweet alert error
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "Usuario y/o contraseña incorrectas",
                        alertIcon: "error",
                        showConfirmButton: true,
                        timer: 3500,
                        ruta: 'login'

                    })
                } else {
                    req.session.loggedin = true,
                    req.session.nombre_usuario = results[0].nombre_usuario;
                    connection.query("SELECT * FROM tb_usuariosregistrados", (err, result) => {
                        if(err){
                            res.send(err);
                        } else {
                            res.render("../views/index.ejs", {
                                usuariosregistrados: result,
                                login: true,
                                name: req.session.nombre_usuario,
                                alert: true,
                                alertTitle: "Ingreso Exitoso",
                                alertMessage: "Ha ingresado correctamente",
                                alertIcon: "success",
                                showConfirmButton: true,
                                timer: 3500,
                                ruta: 'index',
                            });
                        }
                    });
                    console.log(req.session.nombre_usuario);
                }
            })

        }
    })

    app.get('/index', (req, res) => {
        // res.render('../views/index.ejs');
        if (req.session.loggedin) {
            connection.query("SELECT * FROM tb_usuariosregistrados", (err, result) => {
                if(err){
                    res.send(err);
                } else {
                    res.render("../views/index.ejs", {
                        usuariosregistrados: result,
                        login: true,
                        name: req.session.nombre_usuario
                    });
                }
            })
        } else {
            res.render('../views/login.ejs');
        }

    })

    app.get("/delete/:id_usuario", (req,res) => {
        const id_usuario = req.params.id_usuario;
        connection.query("DELETE FROM tb_usuariosregistrados WHERE id_usuario = ?", [id_usuario], (err, result) => {
            if(err){
                res.send(err);
            } else {
                connection.query("SELECT * FROM tb_usuariosregistrados", (err, result) => {
                    if(err){
                        res.send(err);
                    } else {
                        res.render("../views/index.ejs", {
                            usuariosregistrados: result,
                            alert:true,
                            ruta: ""
                        });
                    }
                })
            }
        })
    })

    app.post("/add", (req,res) => {
        const {nombre_completo, nombre_usuario, fecha_creacion, restringido} = req.body;
        connection.query("INSERT INTO tb_usuariosregistrados SET ?", {
            nombre_completo: nombre_completo,
            nombre_usuario: nombre_usuario,
            fecha_creacion: fecha_creacion,
            restringido: restringido
        }, (err, result) => {
            if(err){
                res.send(err);
            } else {
                res.redirect("/index")
            }
        })
    })


    app.post("/edit/:id_usuario", (req,res) => {
        const id_usuario = req.params.id_usuario;
        const {nombre_completo, nombre_usuario, fecha_creacion, restringido} = req.body
        console.log(req.body);
        connection.query("UPDATE tb_usuariosregistrados SET nombre_completo = ?, nombre_usuario = ?, fecha_creacion = ?, restringido = ? WHERE id_usuario = ?", [nombre_completo, nombre_usuario, fecha_creacion, restringido, id_usuario], (err, result) => {
            if(err){
                res.send(err);
            } else {
                res.redirect("/index");
            }
        })
    })

    app.get('/restringidos', (req, res) => {
        if(req.session.loggedin) {
            connection.query("SELECT * FROM tb_usuariosregistrados", (err, result) => {
                if (err){
                    res.send(err);
                } else {
                    res.render("../views/restringidos.ejs", {
                        usuariosregistrados: result,
                        login:true,
                        name: req.session.nombre_usuario                
                    }) 
                }
            })
        }
    })

    app.get('/logout', (req, res) =>{
        req.session.destroy(() =>{
            res.redirect('/')
        })
    })



}


