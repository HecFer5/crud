import './App.css';
import { useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import Swal from 'sweetalert2'




function App() {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState();
  const [pais, setPais] = useState('');
  const [cargo, setCargo] = useState('');
  const [experiencia, setExperiencia] = useState();
  const [id, setId] = useState(0);

  const [empleados, setEmpleados] = useState([]);
  const [editar, setEditar] = useState(false);

  ////////////////////////////// AGREGAR EMPLEADOS A LA TABLA
  const add = () => {
    Axios.post("http://localhost:3001/create", {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      experiencia: experiencia
    }).then(() => {
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: '<strong> Registro exitoso </strong>',
        html: '<i><strong>' + nombre + '</ strong> ha sido ingresado</i>',
        icon: 'success',
        timer: 2000
      })
    }).catch(function (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se logró ingresar el registro!',
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error de Servidor. Intente más tarde":JSON.parse(JSON.stringify(error)).message
      })
      limpiarCampos();
    });
  }
  /////// FIN AGREGAR
  const update = () => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      experiencia: experiencia
    }).then(() => {
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: '<strong> ACTUALIZADO </strong>',
        html: '<i><strong>' + nombre + '</ strong></i>',
        icon: 'success',
        timer: 2000

      })
    }).catch(function (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se logró actualizar el registro!',
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error de Servidor. Intente más tarde":JSON.parse(JSON.stringify(error)).message
      })
    });
  }
  /////////////////ACTUALIZAR 

  ////////////////////////////////

  /////////////////// editar

  const editarEmpleado = (val) => {
    setEditar(true);

    setNombre(val.nombre);
    setCargo(val.cargo);
    setEdad(val.edad);
    setPais(val.pais);
    setExperiencia(val.experiencia);
    setId(val.id);
  }

  ///////////////////////////

  ////////////////////////////// LISTAR EMPLEADOS 
  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados").then((response) => {
      setEmpleados(response.data);
    });
  }
  /////// FIN LISTAR

  //////////////LIMPIAR CAMPOS
  const limpiarCampos = () => {
    setNombre("");
    setCargo("");
    setEdad("");
    setPais("");
    setExperiencia("");
    setId("");
    setEditar(false);

  }
  /////////////////////////

  /////////////////////////eliminar registro
  const deleteReg = (val) => {
    Swal.fire({
      title: 'Está seguro?',
      html: '<p>Va a eliminar el registro <strong>' + val.nombre + '</strong> de la lista?</p>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`).then(() => {
          getEmpleados();
          limpiarCampos();
          Swal.fire({
            title: 'El registro ha sido eliminado.',
            icon: 'success',
            showConfirmButton: false,
            timer: 3000
          });
        }).catch(function (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se logró eliminar el registro!',
            footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error de Servidor. Intente más tarde":JSON.parse(JSON.stringify(error)).message
          })
        })

      }
    })

  }

  ////////////////////////////////////////

  return (
    <div className="container">



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
              className="form-control" value={nombre} placeholder="Apellido y nombre" aria-label="Username" aria-describedby="basic-addon1" />
            <div />
            <span className="input-group-text" id="basic-addon1">Edad: </span>
            <input type="number"
              onChange={(event) => {
                setEdad(event.target.value)
              }}
              className="form-control" value={edad} placeholder="Edad" aria-label="Username" aria-describedby="basic-addon1" />
            <div />
            <span className="input-group-text" id="basic-addon1">País: </span>
            <input type="text"
              onChange={(event) => {
                setPais(event.target.value)
              }}
              className="form-control" value={pais} placeholder="País" aria-label="Username" aria-describedby="basic-addon1" />
            <div />
            <span className="input-group-text" id="basic-addon1">Cargo: </span>
            <input type="text"
              onChange={(event) => {
                setCargo(event.target.value)
              }}
              className="form-control" value={cargo} placeholder="Cargo" aria-label="Username" aria-describedby="basic-addon1" />
            <div />
            <span className="input-group-text" id="basic-addon1">Experiencia: </span>
            <input type="number"
              onChange={(event) => {
                setExperiencia(event.target.value)
              }}
              className="form-control" value={experiencia} placeholder="Experiencia" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
        </div>
        <div className="card-footer text-body-secondary">
          <div className="btn-group" role="group" aria-label="Basic example">
            {
              editar ?
                <div>
                  <button type="button" className="btn btn-warning m-2" onClick={update}>Actualizar</button>
                  <button type="button" className="btn btn-info m-2" onClick={limpiarCampos}>Cancelar</button>
                </div>
                : <button type="button" className="btn btn-info m2" onClick={add}>Ingresar</button>

            }

            <button type="button" className="btn btn-danger m-2" onClick={getEmpleados}>Listar</button>
          </div>
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">País</th>
            <th scope="col">Cargo</th>
            <th scope="col">Experiencia</th>
            <th scope="col">Acciones</th>

          </tr>
        </thead>
        <tbody>
          {
            empleados.map((val, key) => {
              return <tr key={val.id}>
                <td>{val.id} </td>
                <td>{val.nombre} </td>
                <td>{val.edad} </td>
                <td>{val.pais} </td>
                <td>{val.cargo} </td>
                <td>{val.experiencia} años </td>
                <td>
                  <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button"
                      onClick={() => {
                        editarEmpleado(val);
                      }}
                      className="btn btn-info m-2" >Editar</button>
                    <button type="button" onClick={() => {
                      deleteReg(val);
                    }} className="btn btn-danger m-2">Eliminar</button>
                  </div>
                </td>

              </tr>
            })
          }

        </tbody>
      </table>

    </div>
  );
}

export default App;
