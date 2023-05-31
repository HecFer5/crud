const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'empleados'
});

app.post("/create",(req, res) => {
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const experiencia = req.body.experiencia;

    db.query('INSERT INTO empleados_t(nombre, edad, pais, cargo, experiencia) VALUES (?,?,?,?,?)',
        [nombre, edad, pais, cargo, experiencia], (err, result) => {
            if (err) {
                console.log(err);
            }else{
                res.send('Empleado registrado con éxito');
            }
        }
    );


});

app.listen(3001, () => {
    console.log('Puerto 3001')
})