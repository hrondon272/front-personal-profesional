import React, { useState, useEffect, useContext } from "react";
import Container from "@mui/material/Container";
import { Card, Button, TextField, Grid, MenuItem } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FormControl } from "@mui/material";
import axios from "axios";
import { loginContext } from "../routes/Router";
import Fab from "@mui/material/Fab";
import { Link } from "react-router-dom";
import ViewListIcon from "@mui/icons-material/ViewList";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "../styles.scss";

const AddForm = () => {
  //Se obtiene el token del contexto
  const { token } = useContext(loginContext);

  //Variables de estado
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cedula, setCedula] = useState("");
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

  //Funciones
  const obtenerVehiculos = () => {
    var config = {
      method: "get",
      url: `http://127.0.0.1:8000/api/cargarVehiculos`,
      headers: {
        "Content-Type": "application/json",
        "APP-KEY":
          "Ke9HAnknaQfYo%EPa7sjG^G3jknZ9ThFANZXgV$t4Nvca%XDy@35VWhwKSP37pTAm4F6CVDHL7$c3v3qBWM4hg7Kx@tsW$pTe9U726UyD&2njqtKnaSHbw9C",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        setListaVehiculos(response.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const obtenerProfesiones = () => {
    var config = {
      method: "get",
      url: `http://127.0.0.1:8000/api/cargarProfesiones`,
      headers: {
        "Content-Type": "application/json",
        "APP-KEY":
          "Ke9HAnknaQfYo%EPa7sjG^G3jknZ9ThFANZXgV$t4Nvca%XDy@35VWhwKSP37pTAm4F6CVDHL7$c3v3qBWM4hg7Kx@tsW$pTe9U726UyD&2njqtKnaSHbw9C",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        setListaProfesiones(response.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const registrar = () => {
    

    let infoVehiculo = vehiculo.split("-");
    var data = {
      nombre: nombre,
      apellido: apellido,
      cedula: cedula,
      fecha_nacimiento: nacimiento,
      profesion: profesion,
      direccion: direccion,
      municipio: municipio,
      telefono: telefono,
      sexo: sexo,
      nombre_vehiculo: infoVehiculo[0],
      marca: infoVehiculo[1],
      año: infoVehiculo[2],
    };

    var config = {
      method: "post",
      url: "http://127.0.0.1:8000/api/registrarPersonalProfesional",
      headers: {
        "Content-Type": "application/json",
        "APP-KEY":
          "Ke9HAnknaQfYo%EPa7sjG^G3jknZ9ThFANZXgV$t4Nvca%XDy@35VWhwKSP37pTAm4F6CVDHL7$c3v3qBWM4hg7Kx@tsW$pTe9U726UyD&2njqtKnaSHbw9C",
        Authorization: `Bearer ${token}`,
      },

      data: data,
    };

    axios(config)
      .then(async function () {
          limpiarCampos();
          alert("Registrado correctamente");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const limpiarCampos = () => {
    setNombre("");
    setApellido("");
    setCedula("");
    setDireccion("");
    setNacimiento("");
    setProfesion("");
    setMunicipio("");
    setTelefono("");
    setSexo("");
    setVehiculo("");
  };

  useEffect(() => {
    obtenerProfesiones();
    obtenerVehiculos();
  }, []);

  return (
    <>
      <Container
        className="my2"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Grid container justifyContent="center">
          <Grid item md={10}>
            <Card className="p2">
              <h1>Registrar Personal</h1>
              <FormControl>
                <Grid container direction="row" justifyContent="center">
                  <Grid item sm={6}>
                    <TextField
                      className="m1 w100"
                      id="outlined-basic"
                      label="Nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item sm={6}>
                    <TextField
                      className="m1 w100"
                      id="outlined-basic"
                      label="Apellido"
                      value={apellido}
                      onChange={(e) => setApellido(e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item sm={6}>
                    <TextField
                      className="m1 w100"
                      id="outlined-basic"
                      label="Cédula"
                      value={cedula}
                      onChange={(e) => setCedula(e.target.value)}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item sm={6}>
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
                  </Grid>

                  <Grid item sm={6}>
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
                  </Grid>

                  <Grid item sm={6}>
                    <TextField
                      className="m1 w100"
                      id="outlined-basic"
                      label="Dirección"
                      value={direccion}
                      onChange={(e) => setDireccion(e.target.value)}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item sm={6}>
                    <TextField
                      className="m1 w100"
                      id="outlined-basic"
                      label="Municipio"
                      value={municipio}
                      onChange={(e) => setMunicipio(e.target.value)}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item sm={6}>
                    <TextField
                      className="m1 w100"
                      id="outlined-basic"
                      label="Teléfono"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item sm={6}>
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
                  </Grid>

                  <Grid item sm={6}>
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
                          <MenuItem key={index} value={item.vehiculo}>
                            {item.vehiculo}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  </Grid>

                  <Button
                    className="m1"
                    variant="contained"
                    onClick={registrar}
                  >
                    Registrar
                  </Button>
                </Grid>
              </FormControl>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Link to="/list">
        <Fab
          variant="extended"
          sx={{ position: "fixed", bottom: 50, right: 50 }}
          color="primary"
        >
          <ViewListIcon sx={{ mr: 1 }} />
          Ver Lista
        </Fab>
      </Link>
    </>
  );
};

export default AddForm;
