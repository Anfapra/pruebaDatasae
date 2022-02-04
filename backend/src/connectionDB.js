const mysql = require('mysql');
const mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "datasaePrueba",
})

mysqlConnection.connect(function (err){
    if(err){
        console.log(err);
        return
    }else{
        console.log("Coneccion exitosa!!!")
    }
});

//Exportacion
module.exports = mysqlConnection;