import Categoria from "./Categoria";
import useQuiosco from "../hooks/useQuiosco";
import clienteAxios from "../config/axios";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

function Sidebar() {
  const { categorias } = useQuiosco();

  const token = localStorage.getItem("AUTH_TOKEN");
  const navigate = useNavigate();

  const { data: user } = useSWR("/api/user", () =>
    clienteAxios("/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.data)
      .catch((error) => {
        throw Error(error?.response?.data?.errors);
      })
  );

  const logout = async () => {
    try {
      await clienteAxios.post("/api/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("AUTH_TOKEN");
      navigate("/auth/login");
    } catch (error) {
      throw Error(error?.response?.data?.errors);
    }
  };

  return (
    <aside className="md:w-72">
      Sidebar
      <div className="p-4">
        <img className="w-40" src="../img/logo.svg" alt="imagen logo" />
      </div>
      <p className="my-10 text-xl text-center">Hola: {user?.name}</p>
      <div className="mt-10">
        {categorias.map((categoria) => (
          <Categoria key={categoria.id} categoria={categoria} />
        ))}
      </div>
      <div className="my-5 py-5">
        <button
          type="button"
          className="text-center bg-red-500 w-full p-5 font-bold text-white truncate"
          onClick={logout}
        >
          Cancelar orden
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
