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

// Directorio Público
app.use( express.static('public'));


// Middlewares


// Rutas
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/hospitales', require('./routes/hospitales') );
app.use( '/api/medicos', require('./routes/medicos') );
app.use( '/api/login', require('./routes/auth') );
app.use( '/api/buscar', require('./routes/buscar') );
app.use( '/api/uploads', require('./routes/uploads') );


app.listen( 3000, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT );
} );