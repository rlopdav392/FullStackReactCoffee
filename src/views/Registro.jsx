import { Link, useNavigate } from "react-router-dom";
import { createRef, useState } from "react";
import clienteAxios from "../config/axios";

function Registro() {
  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();

  const navigate = useNavigate();
  const [errores, setErrores] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const datos = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      //laravel lo espera como password_confirmation
      password_confirmation: passwordConfirmationRef.current.value,
    };

    try {
      const response = await clienteAxios.post("/api/registro", datos);
      localStorage.setItem("AUTH_TOKEN", response.data.token);
      setErrores([]);
      // console.log(response.data.token);
      //console.log(response.data.user);
      navigate("/");
    } catch (error) {
      //console.log(error);
      setErrores(Object.values(error.response.data.errors));
      //navigate("/auth/registro");
    }
  };
  return (
    <>
      <h1 className="text-4xl font-black">Crea tu cuenta</h1>
      <p>Crea tu cuenta llenando el formulario</p>
      <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
        <form onSubmit={handleSubmit} noValidate>
          {errores ? errores.map((error) => <p>{error}</p>) : null}
          <div className="mb-4">
            <label className="text-slate-800" htmlFor="name">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              className="mt-2 w-full p-3 bg-gray-50"
              name="name"
              placeholder="tu nombre"
              ref={nameRef}
            />
          </div>

          <div className="mb-4">
            <label className="text-slate-800" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="mt-2 w-full p-3 bg-gray-50"
              name="email"
              placeholder="tu email"
              ref={emailRef}
            />
          </div>

          <div className="mb-4">
            <label className="text-slate-800" htmlFor="password">
              password:
            </label>
            <input
              type="password"
              id="password"
              className="mt-2 w-full p-3 bg-gray-50"
              name="password"
              placeholder="tu password"
              ref={passwordRef}
            />
          </div>

          <div className="mb-4">
            <label className="text-slate-800" htmlFor="password_confirmation">
              repetir password:
            </label>
            <input
              type="password"
              id="password_confirmation"
              className="mt-2 w-full p-3 bg-gray-50"
              name="password_confirmation"
              placeholder="repetir password"
              ref={passwordConfirmationRef}
            />
          </div>

          <input
            type="submit"
            value="crear cuenta"
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
          ></input>
        </form>
      </div>
      <nav className="mt-5">
        <Link to="/auth/login">¿Ya tienes cuenta?, inicia sesión</Link>
      </nav>
    </>
  );
}

export default Registro;
