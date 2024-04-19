import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Resumen from "../components/Resumen";
import useQuiosco from "../hooks/useQuiosco";
import Modal from "react-modal";
import ModalProducto from "../components/ModalProducto";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import clienteAxios from "../config/axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useSWR from "swr";

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

  const token = localStorage.getItem("AUTH_TOKEN");
  const navigate = useNavigate();

  const { data: user, error } = useSWR("/api/user", () =>
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

  useEffect(() => {
    if (user) {
      navigate("/");
    }

    if (error) {
      navigate("/auth/login");
    }
  }, [user, error]);

  const { modal } = useQuiosco();
  return (
    <>
      <div className="md:flex">
        <Sidebar />
        <main className="flex-1 h-screen overflow-y-scroll bg-gray-100 p-3">
          <Outlet />
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
