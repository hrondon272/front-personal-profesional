import React, {useState, useContext} from "react";
import Container from "@mui/material/Container";
import { Card, Button, TextField, Grid } from "@mui/material";
import '../styles.scss'
import { loginContext } from "../routes/Router";
import axios from "axios";

const Login = () => {
  
  //Se obtiene el metodo del contexto
  const { setToken } = useContext(loginContext);

  //Variables de estado
  const [usuario, setUsuario] = useState('')
  const [pass, setPass] = useState('')

  //Funciones
  const iniciarSesion= ()=> {
    var data = JSON.stringify({
      email: usuario,
      password: pass,
      remember_me: true,
    });

    var config = {
      method: "post",
      url: "",
      headers: {
        "Content-Type": "application/json",
        "APP-KEY":"Ke9HAnknaQfYo%EPa7sjG^G3jknZ9ThFANZXgV$t4Nvca%XDy@35VWhwKSP37pTAm4F6CVDHL7$c3v3qBWM4hg7Kx@tsW$pTe9U726UyD&2njqtKnaSHbw9C",
      },
      data: data,
    };

    axios(config)
      .then(async function (response) {
        if (response.data.respuesta === 1) {
          setToken(response.data.access_token);
          
        } else {
          setToken(null)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  return (
    <Container className="my2" sx={{display:'flex',justifyContent:'center', alignItems:'center', minHeight:'100vh'}}>
      <Grid container justifyContent="center" >
        <Grid item md={6} direction="column">
          <Card className="p2">
            <Grid container direction='column' justifyContent="center">
                <h1>Inicia Sesión</h1>
                <TextField
                className="m1"
                  id="outlined-basic"
                  label="Usuario"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  variant="outlined"
                />
                <TextField
                className="m1"
                  id="outlined-basic"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  label="Contraseña"
                  variant="outlined"
                />
                <Button className="m1" variant="contained" onClick={iniciarSesion}>Iniciar Sesión</Button>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
