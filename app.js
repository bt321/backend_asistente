// Configuración de la conexión a la base de datos
//var mysql = require("mysql");
//var conexion = mysql.createConnection({
//    host: 'localhost',
//    database: 'asistentenut',
//    user: 'root',
//    password: 'tahtah'
//});
//
//  // Conexión a la base de datos
//  conexion.connect((error) => {
//    if (error) {
//      console.error('Error al conectar a la base de datos:', error);
//      return;
//    }
//    console.log('Conexión exitosa a la base de datos.');
//  });
//  
//  // Ejecutar una consulta SELECT
//  conexion.query('SELECT * FROM asesor', (error, resultados) => {
//    if (error) {
//      console.error('Error al ejecutar la consulta:', error);
//      return;
//    }
//    console.log('Resultados de la consulta:', resultados);
//  
//    // Cerrar la conexión cuando hayas terminado todas las consultas
//    conexion.end();
//  });

  
// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
var cors = require('cors')

//app.get('/api/data', (req, res) => {
//  const data = req.query; // Accede a los datos enviados en la solicitud GET como parámetros de consulta
//  console.log('Datos recibidos en el backend:', data);
//  res.json({ message: 'Hola desde el backend!' });
//});
app.use(cors());
app.post('/api/users', async (req, res) => {
  try {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Failed to create user' });
  }
});
app.post('/Usuarios', (req, res) =>{
  const newUser = req.body;
  console.log('datos: ', newUser);

});

app.get('/api/data', (req, res) => {
  const data = req.body; // Accede a los datos enviados en el cuerpo de la solicitud POST
  console.log('Datos recibidos en el backend:', data);
  res.json({ message: 'Datos recibidos correctamente en el backend' });
});

app.listen(3000, () => {
  console.log('Servidor backend corriendo en el puerto 3000 ');
});

  