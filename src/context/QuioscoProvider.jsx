import { createContext, useState, useEffect } from "react";
import { categorias as categoriasDB } from "../data/categorias";
import { toast } from "react-toastify";
import clienteAxios from "../config/axios";

const QuioscoContext = createContext();
const QuioscoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState({});
  const [modal, setModal] = useState(false);
  const [producto, setProducto] = useState({});
  const [pedido, setPedido] = useState([]);
  const [total, setTotal] = useState(0);
  const [productosDB, setProductosDB] = useState([]);
  const [userToken, setUserToken] = useState();

  const handleSetUserToken = (userName) => {
    setUserToken(userName);
  };

  useEffect(() => {
    const nuevoTotal = pedido.reduce(
      (total, producto) => producto.precio * producto.cantidad + total,
      0
    );
    setTotal(nuevoTotal);
  }, [pedido]);

  const obtenerProductos = async () => {
    try {
      const { data } = await clienteAxios("/api/productos");
      console.log(data);
      setProductosDB(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerCategorias = async () => {
    try {
      const respuesta = await clienteAxios("/api/categorias");
      console.log(respuesta);
      setCategorias(respuesta.data.data);
      setCategoriaActual(respuesta.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const handleSetPedido = (pedido) => {
    setPedido(pedido);
  };

  const handleSetProducto = (producto) => {
    setProducto(producto);
  };
  const handleClickModal = () => {
    setModal(!modal);
    console.log(modal);
  };
  const handleClickCategoria = (id) => {
    const categoria = categorias.filter((categoria) => categoria.id === id)[0];
    setCategoriaActual(categoria);
  };

  const handleAgregarPedido = ({ categoria_id, ...producto }) => {
    if (pedido.some((pedidoState) => pedidoState.id === producto.id)) {
      const pedidoActualizado = pedido.map((pedidoState) =>
        pedidoState.id === producto.id ? producto : pedidoState
      );
      setPedido(pedidoActualizado);
      toast.success("guardado correctamente");
    } else {
      setPedido([...pedido, producto]);

      toast.success("agregado al pedido");
    }
  };

  const handleEditarCantidad = (id) => {
    const productoActualizar = pedido.filter(
      (producto) => producto.id === id
    )[0];
    setProducto(productoActualizar);
    setModal(!modal);
  };

  const handleEliminarProductoPedido = (id) => {
    const pedidoActualizado = pedido.filter((producto) => producto.id !== id);
    setPedido(pedidoActualizado);
    toast.success("eliminado del pedido");
  };

  return (
    <QuioscoContext.Provider
      value={{
        categorias,
        categoriaActual,
        handleClickCategoria,
        handleClickModal,
        modal,
        producto,
        handleSetProducto,
        pedido,
        handleSetPedido,
        handleAgregarPedido,
        handleEditarCantidad,
        handleEliminarProductoPedido,
        total,
        productosDB,
        handleSetUserToken,
        userToken,
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };
export default QuioscoContext;
