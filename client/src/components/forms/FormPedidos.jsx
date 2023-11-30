import style from "./FormPedidos.module.css";
import { useDispatch } from "react-redux";
import { toggleFilter } from "../../redux/actions";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  searchMesa,
  setFilter,
  searchName,
  setInputMesaInReducer,
  setInputNombreInReducer,
} from "../../redux/actions";

const FormPedidos = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const searchNameInput = useSelector((state) => state.searchNameInput);
  const searchMesaInput = useSelector((state) => state.searchMesaInput);

  const handleChange = (event) => {
    const mesaUpdated = event.target.value;
    dispatch(setInputMesaInReducer(mesaUpdated));

    if (mesaUpdated === "") {
      dispatch(setFilter("searchMesa"));
    } else {
      dispatch(setInputNombreInReducer(""));
    }
  };

  const handleChangeName = (event) => {
    const nameUpdated = event.target.value;
    dispatch(setInputNombreInReducer(nameUpdated));

    if (nameUpdated === "") {
      dispatch(setFilter("searchName"));
    } else {
      dispatch(setInputMesaInReducer(""));
    }
  };

  const searchNames = () => {
    dispatch(searchName(searchNameInput));
  };

  const searchMesas = () => {
    dispatch(searchMesa(searchMesaInput));
  };

  return (
    <div className={style.FormPedidosDiv}>
      <button
        className={
          filters.byPendientes ? style.activeButton : style.buttonFilter
        }
        onClick={() => dispatch(toggleFilter("byPendientes"))}
      >
        Pendientes
      </button>
      <button
        className={filters.byEnMesa ? style.activeButton : style.buttonFilter}
        onClick={() => dispatch(toggleFilter("byEnMesa"))}
      >
        En Mesa
      </button>
      <button
        className={filters.byPagados ? style.activeButton : style.buttonFilter}
        onClick={() => dispatch(toggleFilter("byPagados"))}
      >
        Pagados
      </button>
      <div className={style.inputSearchMesaDiv}>
        <input
          type="number"
          inputMode="numeric"
          placeholder="Por Mesa"
          onChange={handleChange}
          value={searchMesaInput}
        />
        <button onClick={searchMesas}>
          <ion-icon name="search-outline"></ion-icon>
        </button>
      </div>
      <div className={style.inputSearchNombreDiv}>
        <input
          type="text"
          placeholder="Por Nombre"
          onChange={handleChangeName}
          value={searchNameInput}
        />
        <button onClick={searchNames}>
          <ion-icon name="search-outline"></ion-icon>
        </button>
      </div>
    </div>
  );
};

export default FormPedidos;
