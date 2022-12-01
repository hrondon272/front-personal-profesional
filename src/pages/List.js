import React, { useContext, useState, useEffect } from "react";
import { Card, Grid, Container } from "@mui/material";
import { loginContext } from "../routes/Router";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import ModalEditar from "../components/ModalEditar";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
const List = () => {
  //Se obtiene el token del contexto
  const { token } = useContext(loginContext);

  //Variables de estado
  const [datosTabla, setDatosTabla] = useState([]);
  const [open, setOpen] = React.useState(false);
  //Estado de la fila seleccionada para las acciones
  const [fila, setFila] = useState({});

  //Funciones
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const obtenerDatosTabla = () => {
    var config = {
      method: "get",
      url: `http://127.0.0.1:8000/api/cargarPersonalProfesional`,
      headers: {
        "Content-Type": "application/json",
        "APP-KEY":
          "Ke9HAnknaQfYo%EPa7sjG^G3jknZ9ThFANZXgV$t4Nvca%XDy@35VWhwKSP37pTAm4F6CVDHL7$c3v3qBWM4hg7Kx@tsW$pTe9U726UyD&2njqtKnaSHbw9C",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        setDatosTabla(response.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const abrirModalEditar = (item) => {
    setFila(item);
    handleOpen();
  };

  const eliminar = (item) => {
    try {
      var data = JSON.stringify({
        id: item.id,
        profesion: item.profesion,
        nombre_vehiculo: item.nombre_vehiculo,
        marca: item.marca,
        año: item.año,
      });
    } catch (error) {
      data = JSON.stringify({
        id: "",
        profesion: "",
        nombre_vehiculo: "",
        marca: "",
        año: "",
      });
    }

    var config = {
      method: "delete",
      url: `http://127.0.0.1:8000/api/eliminarPersonalProfesional`,
      headers: {
        "Content-Type": "application/json",
        "APP-KEY":
          "Ke9HAnknaQfYo%EPa7sjG^G3jknZ9ThFANZXgV$t4Nvca%XDy@35VWhwKSP37pTAm4F6CVDHL7$c3v3qBWM4hg7Kx@tsW$pTe9U726UyD&2njqtKnaSHbw9C",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios(config)
      .then(function () {
        obtenerDatosTabla();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    obtenerDatosTabla();
  }, []);

  return (
    <>
      <ModalEditar
        open={open}
        handleClose={handleClose}
        item={fila}
        obtenerDatosTabla={obtenerDatosTabla}
      />
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
              <h1>Lista de Personal</h1>

              <Grid container direction="row" justifyContent="center">
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell align="right">Cédula</TableCell>
                        <TableCell align="center">
                          Fecha de Nacimiento
                        </TableCell>
                        <TableCell align="right">Profesión</TableCell>
                        <TableCell align="right">Dirección</TableCell>
                        <TableCell align="right">Municipio</TableCell>
                        <TableCell align="right">Teléfono</TableCell>
                        <TableCell align="right">Sexo</TableCell>
                        <TableCell align="right">Vehículo</TableCell>
                        <TableCell align="right">Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {datosTabla.map((fila, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {fila.nombre_completo}
                          </TableCell>
                          <TableCell align="right">{fila.cedula}</TableCell>
                          <TableCell align="right">
                            {fila.fecha_nacimiento}
                          </TableCell>
                          <TableCell align="right">{fila.profesion}</TableCell>
                          <TableCell align="right">{fila.direccion}</TableCell>
                          <TableCell align="right">{fila.municipio}</TableCell>
                          <TableCell align="right">{fila.telefono}</TableCell>
                          <TableCell align="right">{fila.sexo}</TableCell>
                          <TableCell align="right">
                            {fila.nombre_vehiculo +
                              " - " +
                              fila.marca +
                              " - " +
                              fila.año}
                          </TableCell>
                          <TableCell align="right">
                            {
                              <>
                                <IconButton
                                  aria-label="delete"
                                  onClick={() => eliminar(fila)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                                <IconButton
                                  aria-label="edit"
                                  onClick={() => abrirModalEditar(fila)}
                                >
                                  <EditIcon />
                                </IconButton>
                              </>
                            }
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Link to="/add">
        <Fab
          variant="extended"
          sx={{ position: "fixed", bottom: 50, right: 50 }}
          color="primary"
        >
          <AddIcon sx={{ mr: 1 }} />
          Añadir
        </Fab>
      </Link>
    </>
  );
};

export default List;
