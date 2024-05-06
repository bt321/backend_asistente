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
const app = express();

app.get('/api/data', (req, res) => {
  const data = req.body;
  res.json({ message: 'Hola desde el backend!' });
  req.json({ message: data});
});

app.listen(3000, () => {
  console.log('Servidor backend corriendo en el puerto 3000');
});

  