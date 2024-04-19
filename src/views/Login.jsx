import { Link, useNavigate } from "react-router-dom";
import { createRef, useState } from "react";
import clienteAxios from "../config/axios";

function Login() {
  const emailRef = createRef();
  const passwordRef = createRef();

  const navigate = useNavigate();
  const [errores, setErrores] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const datos = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const { data } = await clienteAxios.post("/api/login", datos);
      localStorage.setItem("AUTH_TOKEN", data.token);
      setErrores([]);
      navigate("/");
      console.log(data);
    } catch (error) {
      console.log(error);
      setErrores(Object.values(error.response.data.errors));
    }
  };
  return (
    <>
      <h1 className="text-4xl font-black">Iniciar sesión</h1>
      <p>Para crear un pedido debes iniciar sesión</p>
      <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
        <form onSubmit={handleSubmit} noValidate>
          {errores ? errores.map((error) => <p>{error}</p>) : null}
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

          <input
            type="submit"
            value="iniciar sesión"
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
          ></input>
        </form>
      </div>
      <nav className="mt-5">
        <Link to="/auth/registro">¿No tienes cuenta?, crea una</Link>
      </nav>
    </>
  );
}

export default Login;
