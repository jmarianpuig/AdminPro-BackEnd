const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { dbConnection } = require('./database/config');

// Crear servidor express
const app = express();

// Configurar CORS
app.use(cors());

// lectura y parseo del body
app.use( express.json());

// Base de datos
dbConnection();

// Middlewares

// Rutas
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/login', require('./routes/auth') );


app.listen( 3000, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT );
} );