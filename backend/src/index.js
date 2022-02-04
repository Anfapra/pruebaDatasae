const express = require('express');
const app = express();

//Settings
app.set('port', process.env.PORT || 3000)

//Middleware
app.use(express.json())

//Routes
app.use(require("./views/users.js"))

//Iniciar servidor
app.listen(app.get('port'), ()=>{
    console.log('Servidor en puerto: ', app.get('port'))
})