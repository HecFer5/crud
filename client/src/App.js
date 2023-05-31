import './App.css';
import { useState } from 'react';
import Axios from 'axios';


function App() {
const [nombre, setNombre] = useState('');
const [edad, setEdad] = useState(0);
const [pais, setPais] = useState('');
const [cargo, setCargo] = useState('');
const [experiencia, setExperiencia] = useState(0);

const add = () =>{
  Axios.post("http://localhost:3001/create",{
    nombre:nombre,
    edad:edad,
    pais:pais,
    cargo:cargo,
    experiencia:experiencia
  }).then(()=>{
    alert('Empleado registrado');
  });
}

  return (
    <div className="App">
    <div className='datos'>
      <label>Nombre: <input
      onChange={(event)=>{
        setNombre (event.target.value)
      }}
      type='text' /></label>

      <label>Edad: <input
       onChange={(event)=>{
         setEdad (event.target.value)
       }}
      type='text' /></label>


      <label>País: <input
       onChange={(event)=>{
        setPais (event.target.value)
      }}
      type='text' /></label>

      <label>Cargo: <input
       onChange={(event)=>{
        setCargo (event.target.value)
      }}
      type='text' /></label>

      <label>Experiencia: <input
       onChange={(event)=>{
        setExperiencia (event.target.value)
      }}
      type='number' /></label>
      <button onClick={add}>Registrar</button>

    </div>
    </div>
  );
}

export default App;
