//Importaciones
const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connectionDB');

/*RUTAS:*/
router.get('/', (req, res) => {
    res.send("Leer Usuarios: /users<br>Leer Usuario por Id: /user/:id<br>Crear Usuario: /users<br>Actualizar username: /userUpdateUsername/:id<br>Actualizar password: /userUpdatePassword/:id<br>Actualizar Nombre: /userUpdateNombre/:id<br>Borrar usuario: /userDelete/:id<br>ObtenerMonto: /getMonto/:id<br>Actualizar monto: /updateMonto/:id<br>Login: /login")
})
//Leer todos los usuarios
router.get('/users', (req, res) => {
    mysqlConnection.query('SELECT * FROM users', (err, rows, fields) =>{
        if(!err){
            res.json(rows);
            res.status(200)
        }else{
            console.log(err);
            res.status(401)
        }
    })
})

//Leer un solo usuario
router.get('/user/:username', (req, res) => {
    const { username } = req.params;
    mysqlConnection.query('SELECT * FROM users WHERE username = ?',[username], (err, row, fields)=>{
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
router.post('/users', (req, res) => {
    const { username, password, nombre} = req.body;
    const query = "INSERT INTO users(username, password, nombre) VALUES(?,?,?)"
    mysqlConnection.query(query, [username, password, nombre], (err, row, fields)=>{
        if(!err){
            res.json({status: "200"})
        }else{
            if(err.errno == 1062){
                res.json({status: "409"})
            }else{
                console.log(err)
                res.json({status: "400"})
            }
        }
    })
})

//Actualizar Username
router.put('/userUpdateUsername/:id', (req, res) => {
    const { id } = req.params;
    const { username } = req.body;
    var query = "UPDATE users SET username=? WHERE id=?";
    mysqlConnection.query(query, [username, id], (err, row, fields)=>{
        if(!err){
            res.json({status: "Username actualizado correctamente"})
            res.status(200)
        }else{
            res.status(400)
        }
    })
})

//Actualizar password
router.put('/userUpdatePassword/:id', (req, res) => {
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
router.put('/userUpdateNombre/:id', (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    const query = "UPDATE users SET nombre=? WHERE id=?";
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

//Borrar Usuario
router.delete('/userDelete/:id', (req, res) => {
    const {id} = req.params;
    const query = "DELETE FROM users WHERE id=?"
    mysqlConnection.query(query, [id], (err, roww, fields)=>{
        if(!err){
            res.json({status: "Usuario eliminado"})
            res.status(200)
        }else{
            console.log(err)
            res.status(400)
        }
    })
})


//Obtener monto
router.get('/getMonto/:username', (req, res) => {
    const { username } = req.params;
    mysqlConnection.query('SELECT monto FROM users WHERE username = ?',[username], (err, row, fields)=>{
        if(!err){
            res.json(row)
            res.status(200)
        }else{
            console.log(err)
            res.status(400)
        }
    })
})

//Actualizar a monto
router.put('/updateMonto/:username', (req, res) =>{
    const { username } = req.params;
    const { monto } = req.body;
    var query = "UPDATE users SET monto=? WHERE username=?";
    mysqlConnection.query(query, [monto, username], (err, row, fields)=>{
        if(!err){
            res.json({status: "Se sumo dinero al monto."})
            res.status(200)
        }else{
            console.log(err)
            res.status(400)
        }
    })
})
//LeerToken
router.get('/getToken/:username', (req, res) =>{
    const { username } = req.params;
    mysqlConnection.query('SELECT token FROM userstoken WHERE username = ?',[username], (err, row, fields)=>{
        if(!err){
            res.json(row)
            res.status(200)
        }else{
            console.log(err)
            res.status(400)
        }
    })
})
//Login
router.post('/login', (req, res) => {
    const {username, password} = req.body;
    const query = "SELECT password FROM users WHERE username=?"
    const query1 = "INSERT INTO userstoken(username,token) VALUES(?,?)"
    mysqlConnection.query(query, [username], (err, row) =>{
        if(!err){
            const passwordRequest = row[0]['password'];
            if(password != passwordRequest){
                res.json({status: "401"})                
            }else{
                res.json({status: ["200"]});
                console.log(err);
            };
        }else{
            res.json({status: ["404"]})
        }
    })
})

//Exportaciones
module.exports = router;