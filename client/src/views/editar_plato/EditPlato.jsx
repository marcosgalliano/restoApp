import { useParams } from "react-router-dom";
import style from "./EditPlato.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const EditPlato = () => {
  const params = useParams();
  const id = params.id;
  const [platoName, setPlatoName] = useState(null);
  const [platoPrice, setPlatoPrice] = useState(null);
  const [isBebida, setIsBebida] = useState(null);
  const [newPlato, setNewPlato] = useState({
    name: "",
    price: "",
    bebida: null,
  });
  const [errors, setErrors] = useState({
    name: true,
    price: true,
  });
  const [displayButtons, setDisplayButtons] = useState(false);

  useEffect(async () => {
    try {
      const plato = await axios.get(`/platos/?id=${id}`);

      const platoData = plato.data;

      setPlatoName(platoData.name);
      setPlatoPrice(platoData.price);
      setIsBebida(platoData.bebida);
      setNewPlato({
        name: platoData.name,
        price: platoData.price,
        bebida: platoData.bebida,
      });
    } catch (error) {
      alert(error);
    }
  }, []);

  useEffect(() => {
    if (platoName === "") {
      setErrors((prevErrors) => ({ ...prevErrors, name: true }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, name: false }));
    }

    if (platoPrice === "") {
      setErrors((prevErrors) => ({ ...prevErrors, price: true }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, price: false }));
    }
  }, [platoName, platoPrice]);

  const history = useHistory();
  const hasErrors = Object.values(errors).some((error) => error === true);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setIsBebida(checked);
      setNewPlato({
        name: platoName,
        price: platoPrice,
        bebida: checked,
      });
    } else {
      if (name === "name") {
        const updatedName = value;
        setPlatoName(updatedName);

        setNewPlato({
          name: updatedName,
          price: platoPrice,
          bebida: isBebida,
        });
      } else {
        const updatedPrice = value;
        setPlatoPrice(updatedPrice);

        setNewPlato({
          name: platoName,
          price: updatedPrice,
          bebida: isBebida,
        });
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const updatedPlato = await axios.put(`/platos/${id}`, newPlato);
      const data = updatedPlato.data;

      toast.info("💾 Plato Editado", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () => {
          history.push("/Menu");
        },
      });

      return data;
    } catch (error) {
      alert(error);
    }
  };

  const handleDeletePlato = async () => {
    try {
      const deletePlato = await axios.delete(`platos/${id}`);

      toast.info("🗑️ Plato eliminado", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () => {
          history.push("/Menu");
        },
      });

      return deletePlato;
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className={style.divEditPlato}>
      <input
        type="text"
        placeholder="Nombre"
        name="name"
        value={platoName != null ? platoName : ""}
        onChange={handleInputChange}
        className={errors.name === true ? style.inputError : style.inputOk}
      />
      <input
        type="number"
        inputMode="numeric"
        placeholder="Precio"
        name="price"
        value={platoPrice != null ? platoPrice : ""}
        onChange={handleInputChange}
        className={errors.price === true ? style.inputError : style.inputOk}
      />
      <label>
        Es una bebida:
        <input
          type="checkbox"
          name="isBebida"
          checked={isBebida}
          onChange={handleInputChange}
        />
      </label>
      <button
        className={style.buttonSubmit}
        onClick={handleSubmit}
        disabled={hasErrors}
      >
        Editar Plato
      </button>
      <div className={style.containerDeleteButtons}>
        <button
          className={style.buttonDelete}
          onClick={() => setDisplayButtons(!displayButtons)}
          disabled={displayButtons === true}
        >
          Eliminar plato
        </button>
        <div
          className={
            displayButtons === true ? style.activeDisplay : style.idleDisplay
          }
        >
          <button onClick={handleDeletePlato}>Confirmar</button>
          <button onClick={() => setDisplayButtons(false)}>Cancelar</button>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
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

export default EditPlato;
