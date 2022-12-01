import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

//Importaciones de los componentes que se renderizan de acuerdo a la ruta
import Login from "../pages/Login";
import List from "../pages/List";
import AddForm from "../pages/AddForm";

//Contexto del login, guarda el token recibido de la petición para usarlo en los demás componentes y poder hacer las peticiones a la API.
export const loginContext = React.createContext({});

const Router = () => {
  //Variables de estado
  const [token, setToken] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  //Funciones
  async function validarSesion(token) {
    var config = {
      method: "get",
      url: "http://127.0.0.1:8000/api/checkSession",
      headers: {
        "Content-Type": "application/json",
        "APP-KEY":
          "Ke9HAnknaQfYo%EPa7sjG^G3jknZ9ThFANZXgV$t4Nvca%XDy@35VWhwKSP37pTAm4F6CVDHL7$c3v3qBWM4hg7Kx@tsW$pTe9U726UyD&2njqtKnaSHbw9C",
        "Authorization": `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        if (response.data.respuesta === true) {
          setIsAuth(true);
        } else if (response.data.respuesta === false) {
          setIsAuth(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //Función que valida la sesión activa para devolver las rutas correspondientes
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      setToken(token);
    }
    validarSesion(token);
  }, [token]);

  return (
    <loginContext.Provider value={{ token, setToken }}>
      <BrowserRouter>
        <Routes>
          {/* Los componentes de las rutas se renderizan de acuerdo al estado de la autenticación (isAuth), redirigiedo al inicio de sesión cuando no hay una sesión activa */}
          <Route
            path="/"
            element={isAuth ? <Navigate to="add" /> : <Navigate to="login" />}
          />
          <Route
            path="login"
            element={isAuth ? <Navigate to="/add" /> : <Login />}
          />
          <Route
            path="list"
            element={isAuth ? <List /> : <Navigate to="/login" />}
          />
          <Route
            path="add"
            element={isAuth ? <AddForm /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </loginContext.Provider>
  );
};

export default Router;
