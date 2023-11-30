import style from "./CreateMenu.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

const CreateMenu = () => {
  const [newPlato, setNewPlato] = useState({
    name: "",
    price: "",
    bebida: false,
  });

  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [isBebida, setIsBebida] = useState(false);

  const [errors, setErrors] = useState({
    name: true,
    price: true,
  });

  const history = useHistory();



  useEffect(() => {
    if (newName === "") {
      setErrors((prevErrors) => ({ ...prevErrors, name: true }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, name: false }));
    }

    if (newPrice === "") {
      setErrors((prevErrors) => ({ ...prevErrors, price: true }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, price: false }));
    }
  }, [newName, newPrice]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setIsBebida(checked);
      setNewPlato({
        name: newName,
        price: newPrice,
        bebida: checked,
      });
    } else {
      if (name === "name") {
        const updatedName = value;
        setNewName(updatedName);

        setNewPlato({
          name: updatedName,
          price: newPrice,
          bebida: checked,
        });
      } else {
        const updatedPrice = value;
        setNewPrice(updatedPrice);

        setNewPlato({
          name: newName,
          price: updatedPrice,
          bebida: checked,
        });
      }
    }
  };

  const submitFunc = async () => {
    try {
      const apiResponse = await axios.post("/platos/", newPlato);
      const apiData = apiResponse.data;

      toast.info("💾 Plato Guardado", {
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

      return apiData;
    } catch (error) {
      alert(error.message);
    }
  };

  const hasErrors = Object.values(errors).some((error) => error === true);

  return (
    <div className={style.divCrearPlato}>
      <input
        type="text"
        placeholder="Nombre"
        name="name"
        onChange={handleInputChange}
        className={errors.name === true ? style.inputError : style.inputOk}
      />
      <input
        type="number"
        inputMode="numeric"
        placeholder="Precio"
        name="price"
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
        onClick={submitFunc}
        disabled={hasErrors} 
      >
        Crear Plato
      </button>
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

export default CreateMenu;
