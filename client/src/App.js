import './App.css';
import { useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState(0);
  const [pais, setPais] = useState('');
  const [cargo, setCargo] = useState('');
  const [experiencia, setExperiencia] = useState(0);

  const [empleados, setEmpleados] = useState([]);

  ////////////////////////////// AGREGAR EMPLEADOS A LA TABLA
  const add = () => {
    Axios.post("http://localhost:3001/create", {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      experiencia: experiencia
    }).then(() => {
      alert('Empleado registrado');
      getEmpleados();
    });
  }
  /////// FIN AGREGAR

  ////////////////////////////// LISTAR EMPLEADOS 
  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados").then((response) => {
      setEmpleados(response.data);
    });
  }
  /////// FIN LISTAR

  return (
    <div className="container">
      <div className="App">
        <div className='datos'>

        </div>
        <div className='lista'>

          {
            empleados.map((val, key) => {
              return <div className=''> {val.nombre} {val.edad} {val.cargo} </div>
            })
          }

        </div>
      </div>


      {/*  */}

      <div className="card text-center">
        <div className="card-header">
          GESTION DE EMPLEADOS
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre: </span>

            <input type="text"
              onChange={(event) => {
                setNombre(event.target.value)
              }}
              className="form-control" placeholder="Apellido y nombre" aria-label="Username" aria-describedby="basic-addon1" />

            <span className="input-group-text" id="basic-addon1">Edad: </span>
            <input type="text"
              onChange={(event) => {
                setNombre(event.target.value)
              }}
              className="form-control" placeholder="Edad" aria-label="Username" aria-describedby="basic-addon1" />

            <span className="input-group-text" id="basic-addon1">País: </span>
            <input type="text"
              onChange={(event) => {
                setNombre(event.target.value)
              }}
              className="form-control" placeholder="País" aria-label="Username" aria-describedby="basic-addon1" />

            <span className="input-group-text" id="basic-addon1">Cargo: </span>
            <input type="text"
              onChange={(event) => {
                setNombre(event.target.value)
              }}
              className="form-control" placeholder="Cargo" aria-label="Username" aria-describedby="basic-addon1" />

            <span className="input-group-text" id="basic-addon1">Experiencia: </span>
            <input type="text"
              onChange={(event) => {
                setNombre(event.target.value)
              }}
              className="form-control" placeholder="Experiencia" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
        </div>
        <div className="card-footer text-body-secondary">
          <button className='btn btn-primary' onClick={add}>Registrar</button>

        </div>
      </div>

    </div>
  );
}

export default App;
