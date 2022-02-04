//Importaciones
const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connectionDB');

/*RUTAS:*/
//Leer todos los usuarios
router.get('/users', (req, res) =>{
    mysqlConnection.query('SELECT * FROM users', (err, rows, fields) =>{
        if(!err){
            res.json(rows);
            res.status(200)
        }else{
            console.log(err);
            res.status(400)
        }
    })
})

//Leer un solo usuario
router.get('/user/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM users WHERE id = ?',[id], (err, row, fields)=>{
        if(!err){
            res.json(row)
            res.status(200)
        }else{
            console.log(err)
            res.status(400)
        }
    })
})

//Agregar un usuario
router.post('/users', (req, res) =>{
    const { username, password, nombre} = req.body;
    const query = "INSERT INTO users(username, password, nombre) VALUES(?,?,?)"
    mysqlConnection.query(query, [username, password, nombre], (err, row, fields)=>{
        if(!err){
            res.json({Status: "Usuario Agregado"})
            res.status(200)
        }else{
            console.log(err)
            res.status(400)
        }
    })
})

//Actualizar Username
router.put('/userUpdateUsername/:id', (req, res) =>{
    const { id } = req.params;
    const { username } = req.body;
    var query = "UPDATE users SET username=? WHERE id=?";
    mysqlConnection.query(query, [username, id], (err, row, fields)=>{
        if(!err){
            res.json({status: "Username actualizado correctamente"})
            res.status(200)
        }else{
            console.log(err)
            res.status(400)
        }
    })
})

//Actualizar password
router.put('/userUpdatePassword/:id', (req, res) =>{
    const { id } = req.params;
    const { password } = req.body;
    var query = "UPDATE users SET password=? WHERE id=?";
    mysqlConnection.query(query, [password, id], (err, row, fields)=>{
        if(!err){
            res.json({status: "Password actualizado correctamente"})
            res.status(200)
        }else{
            console.log(err)
            res.status(400)
        }
    })
})

//Actualizar Nombre
router.put('/userUpdateNombre/:id', (req, res) =>{
    const { id } = req.params;
    const { nombre } = req.body;
    var query = "UPDATE users SET nombre=? WHERE id=?";
    mysqlConnection.query(query, [nombre, id], (err, row, fields)=>{
        if(!err){
            res.json({status: "Nombre actualizado correctamente"})
            res.status(200)
        }else{
            console.log(err)
            res.status(400)
        }
    })
})

//Obtener monto
router.get('/obtenerMonto/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT monto FROM users WHERE id = ?',[id], (err, row, fields)=>{
        if(!err){
            res.json(row)
            res.status(200)
        }else{
            console.log(err)
            res.status(400)
        }
    })
})

//Sumar a monto
router.put('/sumarMonto/:id', (req, res) =>{
    const { id } = req.params;
    const { monto } = req.body;
    var query = "UPDATE users SET nonto=? WHERE id=?";
    mysqlConnection.query(query, [monto, id], (err, row, fields)=>{
        if(!err){
            res.json({status: "Se sumo dinero al monto."})
            res.status(200)
        }else{
            console.log(err)
            res.status(400)
        }
    })
})

//Restar a monto
router.put('/restaMonto/:id', (req, res) =>{
    const { id } = req.params;
    const { monto } = req.body;
    var query = "UPDATE users SET monto=? WHERE id=?";
    mysqlConnection.query(query, [monto, id], (err, row, fields)=>{
        if(!err){
            res.json({status: "Se resto dinero al monto"})
            res.status(200)
        }else{
            console.log(err)
            res.status(400)
        }
    })
})

//Exportaciones
module.exports = router;