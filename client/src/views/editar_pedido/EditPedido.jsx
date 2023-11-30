import style from "./EditPedido.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getPlatos, getPedidos } from "../../redux/actions";
import { useDispatch } from "react-redux";
import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

const EditPedido = () => {
  const params = useParams();
  const id = params.id;
  const platos = useSelector((state) => state.platos);
  const pedidos = useSelector((state) => state.pedidos);
  const [inputs, setInputs] = useState([]);
  const [total, setTotal] = useState(0);
  const [pedidoStatusChange, setpedidoStatusChange] = useState(null);
  const [originalPedidoStatus, setoriginalPedidoStatus] = useState(null);
  const [item, setItem] = useState([]);
  const [nameP, setNameP] = useState("");
  const [table, setTable] = useState("");
  const [pedido, setPedido] = useState({
    name: nameP,
    tableNumber: table,
    items: item,
    pedidoStatus: pedidoStatusChange,
  });
  const [errors, setErrors] = useState({
    inputName: true,
    inputMesa: true,
  });
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const objetoEncontrado = pedidos.find((obj) => obj.id == id); 

        if (objetoEncontrado) {
          setNameP(objetoEncontrado.name);
          setTable(objetoEncontrado.tableNumber);

          const itemsGuardados = objetoEncontrado.items;

          setItem((prevItems) => [
            ...prevItems,
            ...itemsGuardados.map((i) => ({
              id: i.id,
              name: i.name,
              cantidad: i.cantidad,
              price: i.price,
              pedidoStatus: objetoEncontrado.pedidoStatus,
            })),
          ]);

          setInputs(itemsGuardados.map((i) => i.id));
          setoriginalPedidoStatus(objetoEncontrado.pedidoStatus);
          setpedidoStatusChange(objetoEncontrado.pedidoStatus)
          setPedido({
            name: objetoEncontrado.name,
            tableNumber: objetoEncontrado.tableNumber,
            items: itemsGuardados,
            pedidoStatus: objetoEncontrado.pedidoStatus,
          });
        }
      } catch (error) {
        console.error("Error al obtener el objeto:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, pedidos]);

  useEffect(() => {
    dispatch(getPlatos());

    let totall = 0;
    for (const items of item) {
      const price = parseFloat(items.price);
      const cantidad = parseInt(items.cantidad);
      totall += price * cantidad;
    }
    setTotal(totall);

  }, [item, pedido]);

  useEffect(() => {
    if (nameP === "") {
      setErrors((prevErrors) => ({ ...prevErrors, inputName: true }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, inputName: false }));
    }

    if (table === "") {
      setErrors((prevErrors) => ({ ...prevErrors, inputMesa: true }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, inputMesa: false }));
    }
  }, [nameP, table]);

  const agregarInput = () => {
    if (platos && platos.length > 0) {
      setInputs([...inputs, platos[0].id]);
    }
    const platoSeleccionado = platos.find((plato) => plato.id === platos[0].id);
    const nuevoItems = [...item];
    nuevoItems.push({ ...platoSeleccionado, cantidad: 1 });
    setItem(nuevoItems);

    setPedido({
      name: nameP,
      tableNumber: table,
      items: nuevoItems,
      pedidoStatus: pedidoStatusChange,
    });
  };

  const borrarInput = (index) => {
    const nuevosInputs = [...inputs];
    nuevosInputs.splice(index, 1);
    setInputs(nuevosInputs);

    const nuevosItems = [...item];
    nuevosItems.splice(index, 1);
    setItem(nuevosItems);
    setPedido({
      name: nameP,
      tableNumber: table,
      items: nuevosItems,
      pedidoStatus: pedidoStatusChange,
    });
  };

  const handleInputChange = (index, platoId) => {
    const nuevosInputs = [...inputs];
    nuevosInputs[index] = platoId;
    setInputs(nuevosInputs);

    const platoSeleccionado = platos.find((plato) => plato.id === platoId);
    const nuevoItems = [...item];
    nuevoItems[index] = { ...platoSeleccionado, cantidad: 1 }; // Reset cantidad to 1
    setItem(nuevoItems);

    setPedido({
      name: nameP,
      tableNumber: table,
      items: nuevoItems,
      pedidoStatus: pedidoStatusChange, 
    });
  };

  const handleSelectStatus = (e) => {
    const { value } = e.target;

    setpedidoStatusChange(value);
    setPedido({
      name: nameP,
      tableNumber: table,
      items: item,
      pedidoStatus: value,
    });
  };

  const incrementQuantity = (index) => {
    const nuevosItems = [...item];
    nuevosItems[index].cantidad++;
    setItem(nuevosItems);

    setPedido({
      name: nameP,
      tableNumber: table,
      items: nuevosItems,
      pedidoStatus: pedidoStatusChange,
    });
  };

  const decrementQuantity = (index) => {
    const nuevosItems = [...item];
    if (nuevosItems[index].cantidad > 1) {
      nuevosItems[index].cantidad--;
      setItem(nuevosItems);
      setPedido({
        name: nameP,
        tableNumber: table,
        items: nuevosItems,
        pedidoStatus: pedidoStatusChange,
      });
    }
  };

  const handleInputChangeName = (event) => {
    const updatedName = event.target.value;
    setNameP(updatedName);

    setPedido({
      name: updatedName,
      tableNumber: table,
      items: item,
      pedidoStatus: pedidoStatusChange,
    });
  };

  const handleInputChangeTable = (event) => {
    const updatedTable = event.target.value;
    setTable(updatedTable);

    setPedido({
      name: nameP,
      tableNumber: updatedTable,
      items: item,
      pedidoStatus: pedidoStatusChange,
    });
  };

  // POST PEDIDO

  const editPedido = async (info) => {
    try {
      const pedidoReq = await axios.put(`/pedidos/${id}`, info);

      toast.info("💾 Pedido Editado", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () => {
          history.push(`/detailPedido/${id}`);
          dispatch(getPedidos());
        },
      });

      return pedidoReq;
    } catch (error) {
      alert(error.message)
    }
  };

  /* CHEQUEAR ERRORES */

  const hasErrors = Object.values(errors).some((error) => error === true);

  return (
    <div className={style.crearPedidoViewDiv}>
      <div className={style.divCrearPedido}>
        <div className={style.divInputsNameYmesa}>
          <div className={style.inputNameAndTable}>
            <input
              type="text"
              placeholder="Nombre"
              name="inputName"
              value={nameP}
              onChange={handleInputChangeName}
            />
            {errors.inputName === true ? (
              <h3 className={style.errorP}>*</h3>
            ) : (
              ""
            )}
          </div>
          <div className={style.inputNameAndTable}>
            <input
              type="number"
              inputMode="numeric"
              placeholder="Nro. Mesa"
              name="inputMesa"
              value={table}
              onChange={handleInputChangeTable}
            />
            {errors.inputMesa === true ? (
              <h3 className={style.errorP}>*</h3>
            ) : (
              ""
            )}
          </div>
        </div>
        {inputs.map((platoId, index) => (
          <div key={index} className={style.containerPlato}>
            <select
              value={platoId}
              onChange={(e) =>
                handleInputChange(index, parseInt(e.target.value))
              }
            >
              {platos && platos.length > 0
                ? platos.map((plato) => (
                    <option key={plato.id} value={plato.id}>
                      {plato.name}
                    </option>
                  ))
                : null}
            </select>
            <div className={style.divCantidad}>
              <button
                onClick={() => decrementQuantity(index)}
                className={style.buttonCantidad}
              >
                -
              </button>
              <h3>{item[index].cantidad}</h3>
              <button
                onClick={() => incrementQuantity(index)}
                className={style.buttonCantidad}
              >
                +
              </button>
            </div>
            <button
              onClick={() => borrarInput(index)}
              disabled={inputs.length === 1}
              className={style.buttonDelete}
            >
              <ion-icon name="trash-outline"></ion-icon>
            </button>
          </div>
        ))}
        {platos && platos.length > 0 ? (
          <button onClick={agregarInput} className={style.buttonAddInput}>
            +
          </button>
        ) : null}
        <div className={style.divTotalAndStatusContainer}>
          <h2>$ {total}</h2>
          <select onChange={(e) => handleSelectStatus(e)}>
            {originalPedidoStatus === "Pendiente" ? (
              <>
                <option value={originalPedidoStatus}>
                  {originalPedidoStatus}
                </option>
                <option value="En Mesa">En Mesa</option>
                <option value="Pagado">Pagado</option>
              </>
            ) : originalPedidoStatus === "En Mesa" ? (
              <>
                <option value={originalPedidoStatus}>
                  {originalPedidoStatus}
                </option>
                <option value="Pendiente">Pendiente</option>
                <option value="Pagado">Pagado</option>
              </>
            ) : (
              <>
                <option value={originalPedidoStatus}>
                  {originalPedidoStatus}
                </option>
                <option value="En Mesa">En Mesa</option>
                <option value="Pendiente">Pendiente</option>
              </>
            )}
          </select>
        </div>
      </div>
      <button
        onClick={() => editPedido(pedido)}
        disabled={hasErrors}
        className={style.buttonSubmit}
      >
        Editar Pedido
      </button>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default EditPedido;
