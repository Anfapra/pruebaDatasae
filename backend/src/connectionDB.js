const mysql = require('mysql');
const mysqlConnection = mysql.createConnection({
    host: "database-1.ca76dz2zua02.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "Lcpmak.03",
    database: "datasaePrueba",
})

//Conexión base de datos
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