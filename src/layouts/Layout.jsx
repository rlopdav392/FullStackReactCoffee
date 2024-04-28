import Sidebar from "../components/Sidebar";
import Resumen from "../components/Resumen";
import useQuiosco from "../hooks/useQuiosco";
import Modal from "react-modal";
import ModalProducto from "../components/ModalProducto";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import clienteAxios from "../config/axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
//import useSWR from "swr";
import Inicio from "../views/Inicio";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

function Layout() {
  //autenticación bearer token
  const { modal, handleSetUserToken } = useQuiosco();
  const token = localStorage.getItem("AUTH_TOKEN");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await clienteAxios("/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        handleSetUserToken(response?.data?.name);
      } catch (error) {
        navigate("/auth/login");
      }
    }
    fetchData();
  }, [navigate, token, handleSetUserToken]);

  return (
    <>
      <div className="md:flex">
        <Sidebar />
        <main className="flex-1 h-screen overflow-y-scroll bg-gray-100 p-3">
          <Inicio />
        </main>

        <Resumen />
      </div>

      <Modal isOpen={modal} style={customStyles}>
        <ModalProducto />
      </Modal>
      <ToastContainer />
    </>
  );
}

export default Layout;
