import { useState, useEffect } from "react";
import style from "./Create.module.css";
import { useSelector } from "react-redux";
import { getPlatos } from "../../redux/actions";
import { useDispatch } from "react-redux";
import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

const CreatePedido = () => {
  const platos = useSelector((state) => state.platos);
  const [inputs, setInputs] = useState([]);
  const [item, setItem] = useState([]);
  const [nameP, setNameP] = useState("");
  const [table, setTable] = useState("");
  const [pedido, setPedido] = useState({
    name: nameP,
    tableNumber: table,
    items: item,
  });
  const [errors, setErrors] = useState({
    inputName: true,
    inputMesa: true,
  });
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (platos && platos.length > 0) {
      setInputs([platos[0].id]);
      const platoSeleccionado = platos.find(
        (plato) => plato.id === platos[0].id
      );
      const nuevoItems = [{ ...platoSeleccionado, cantidad: 1 }]; // Initialize cantidad to 1
      setItem(nuevoItems);
      setPedido({
        name: nameP,
        tableNumber: table,
        items: nuevoItems,
      });
    }
  }, [platos]);

  useEffect(() => {
    dispatch(getPlatos());
  }, []);

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

  const calculateTotal = () => {
    let total = 0;

    for (const items of item) {
      const price = parseFloat(items.price);
      const cantidad = parseInt(items.cantidad);
      total += price * cantidad;
    }

    return total;
  };

  const totalPedido = calculateTotal();

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
    });
  };

  const handleInputChangeTable = (event) => {
    const updatedTable = event.target.value;
    setTable(updatedTable);

    setPedido({
      name: nameP,
      tableNumber: updatedTable,
      items: item,
    });
  };

  // POST PEDIDO

  const postPedido = async (info) => {
    try {
      const pedidoReq = await axios.post("/pedidos", info);

      toast.info("💾 Pedido Enviado", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () => {
          history.push("/pedidos");
        },
      });

      setTable("");
      setNameP("");
      setInputs([platos[0].id]);
      const platoSeleccionado = platos.find(
        (plato) => plato.id === platos[0].id
      );
      const nuevoItems = [{ ...platoSeleccionado, cantidad: 1 }];
      setItem(nuevoItems);

      return pedidoReq;
    } catch (error) {
      console.log(error);
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
              inputmode="numeric"
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
        <h2>$ {totalPedido}</h2>
      </div>
      <button
        onClick={() => postPedido(pedido)}
        disabled={hasErrors}
        className={style.buttonSubmit}
      >
        Enviar Pedido
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

export default CreatePedido;
