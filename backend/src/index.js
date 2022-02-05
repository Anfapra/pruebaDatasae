const express = require('express');
const cors = require('cors')
const app = express();


//Settings
app.set('port', process.env.PORT || 3000)
app.use(cors())
//Middleware
app.use(express.json())

//Routes
app.use(require("./views/users.js"))

//Iniciar servidor
app.listen(app.get('port'), ()=>{
    console.log('Servidor en puerto: ', app.get('port'))
})