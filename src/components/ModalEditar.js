import React, { useState, useEffect, useContext } from "react";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { loginContext } from "../routes/Router";
import { Card, TextField, MenuItem, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 500,
  p: 4,
  overflow: "auto",
};
const ModalEditar = ({ open, handleClose, item, obtenerDatosTabla }) => {
  //Se obtiene el token del contexto
  const { token } = useContext(loginContext);

  //Variables de estado
  const [nombre, setNombre] = useState(item.nombre);
  const [apellido, setApellido] = useState(item.apellido);
  const [cedula, setCedula] = useState(item.cedula);
  const [nacimiento, setNacimiento] = useState(null);
  const [profesion, setProfesion] = useState("");
  const [listaProfesiones, setListaProfesiones] = useState([
    { nombre: "Prueba Profesion" },
  ]);
  const [direccion, setDireccion] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [telefono, setTelefono] = useState("");
  const [sexo, setSexo] = useState("");
  const [vehiculo, setVehiculo] = useState("");
  const [listaVehiculos, setListaVehiculos] = useState([
    { nombre: "Prueba Vehiculo" },
  ]);

  const obtenerVehiculos = () => {
    var config = {
      method: "get",
      url: ``,
      headers: {
        "Content-Type": "application/json",
        "APP-KEY": "Ke9HAnknaQfYo%EPa7sjG^G3jknZ9ThFANZXgV$t4Nvca%XDy@35VWhwKSP37pTAm4F6CVDHL7$c3v3qBWM4hg7Kx@tsW$pTe9U726UyD&2njqtKnaSHbw9C",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        setListaVehiculos(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const obtenerProfesiones = () => {
    var config = {
      method: "get",
      url: ``,
      headers: {
        "Content-Type": "application/json",
        "APP-KEY": "Ke9HAnknaQfYo%EPa7sjG^G3jknZ9ThFANZXgV$t4Nvca%XDy@35VWhwKSP37pTAm4F6CVDHL7$c3v3qBWM4hg7Kx@tsW$pTe9U726UyD&2njqtKnaSHbw9C",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        setListaProfesiones(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const definirCampos = ()=>{
    setNombre(item.nombre)
    setApellido(item.apellido)
    setCedula(item.cedula)
    setNacimiento(item.fecha_nacimiento)
    setProfesion(item.profesion)
    setDireccion(item.direccion)
    setMunicipio(item.municipio)
    setTelefono(item.telefono)
    setSexo(item.sexo)
    setVehiculo(item.vehiculo)
}

  const editar = () => {
    let infoVehiculo = vehiculo.split('-')
    var data = JSON.stringify({
      id: item.id,
      nombre: nombre,
      apellido:apellido,
      cedula: cedula,
      fecha_nacimiento: nacimiento,
      profesion: profesion,
      direccion: direccion,
      municipio: municipio,
      telefono: telefono,
      sexo: sexo,
      nombre_vehiculo: infoVehiculo[0],
      marca: infoVehiculo[1],
      año: infoVehiculo[2]
    });
    var config = {
        method: "put",
        url: ``,
        headers: {
          "Content-Type": "application/json",
          "APP-KEY": "Ke9HAnknaQfYo%EPa7sjG^G3jknZ9ThFANZXgV$t4Nvca%XDy@35VWhwKSP37pTAm4F6CVDHL7$c3v3qBWM4hg7Kx@tsW$pTe9U726UyD&2njqtKnaSHbw9C",
          Authorization: `Bearer ${token}`,
        },
        data:data
      };
  
      axios(config)
        .then(function (response) {
          console.log(response)
          handleClose()
          obtenerDatosTabla()
        })
        .catch(function (error) {
          console.log(error);
        });
  };

  useEffect(() => {
    obtenerProfesiones();
    obtenerVehiculos();
  }, []);

  useEffect(()=>{
    definirCampos()
  },[open])

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card sx={style} className="m2">
        <h1>Editar</h1>
        <TextField
          className="m1 w100"
          id="outlined-basic"
          label="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          variant="outlined"
        />
        <TextField
          className="m1 w100"
          id="outlined-basic"
          label="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          variant="outlined"
        />
        <TextField
          className="m1 w100"
          id="outlined-basic"
          label="Cédula"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
          variant="outlined"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="m1 w100"
            label="Fecha de Nacimiento"
            value={nacimiento}
            onChange={(newValue) => {
              setNacimiento(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <TextField
          className="m1 w100"
          variant="outlined"
          value={profesion}
          onChange={(e) => setProfesion(e.target.value)}
          select
          label="Profesión"
        >
          {listaProfesiones.map((item, index) => {
            return (
              <MenuItem key={index} value={item.nombre}>
                {item.nombre}
              </MenuItem>
            );
          })}
        </TextField>
        <TextField
          className="m1 w100"
          id="outlined-basic"
          label="Dirección"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          variant="outlined"
        />
        <TextField
          className="m1 w100"
          id="outlined-basic"
          label="Municipio"
          value={municipio}
          onChange={(e) => setMunicipio(e.target.value)}
          variant="outlined"
        />
        <TextField
          className="m1 w100"
          id="outlined-basic"
          label="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          variant="outlined"
        />
        <TextField
          className="m1 w100"
          variant="outlined"
          value={sexo}
          onChange={(e) => setSexo(e.target.value)}
          select
          label="Sexo"
        >
          <MenuItem key={1} value="hombre">
            Hombre
          </MenuItem>
          <MenuItem key={2} value="mujer">
            Mujer
          </MenuItem>
          <MenuItem key={3} value="otro">
            Otro
          </MenuItem>
        </TextField>
        <TextField
          className="m1 w100"
          variant="outlined"
          value={vehiculo}
          onChange={(e) => setVehiculo(e.target.value)}
          select
          label="Vehículo"
        >
          {listaVehiculos.map((item, index) => {
            return (
              <MenuItem key={index} value={item.nombre}>
                {item.nombre}
              </MenuItem>
            );
          })}
        </TextField>
        <Button className="m1" variant="contained" onClick={editar}>
          Editar
        </Button>
      </Card>
    </Modal>
  );
};

export default ModalEditar;
