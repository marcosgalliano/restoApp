import axios from "axios";

export const GET_PEDIDOS = "GET_PEDIDOS";
export const TOGGLE_FILTER = "TOGGLE_FILTER";
export const SEARCH_MESA = "SEARCH_MESA";
export const SEARCH_NAME = "SEARCH_NAME";
export const SET_FILTER = "SET_FILTER";
export const SET_INPUTMESA = "SET_INPUTMESA";
export const SET_INPUTNOMBRE = "SET_INPUTNOMBRE";
export const GET_PLATOS = "GET_PLATOS";

export const getPedidos = () => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get(`/pedidos`);

      const pedidosApi = apiData.data;
      dispatch({ type: GET_PEDIDOS, payload: pedidosApi });
    } catch (error) {
      alert(
        "Error 505, Internal Server Error. No se pudieron obtener los pedidos"
      );
    }
  };
};

export const toggleFilter = (filterName) => ({
  type: TOGGLE_FILTER,
  payload: filterName,
});

export const searchMesa = (n) => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get(`/pedidos?table=${n}`);

      const data = apiData.data;
      dispatch({ type: SEARCH_MESA, payload: data });
    } catch (error) {
      alert("error al obtener la mesa", error);
    }
  };
};

export const searchName = (n) => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get(`pedidos/?name=${n}`);

      console.log(apiData);

      const data = apiData.data;
      dispatch({ type: SEARCH_NAME, payload: data });
    } catch (error) {
      alert("error al obtener el nombre", error);
    }
  };
};

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter,
});

export const setInputMesaInReducer = (input) => ({
  type: SET_INPUTMESA,
  payload: input,
});

export const setInputNombreInReducer = (input) => ({
  type: SET_INPUTNOMBRE,
  payload: input,
});

export const getPlatos = () => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get(`/platos`);

      const platosApi = apiData.data;
      dispatch({ type: GET_PLATOS, payload: platosApi });
    } catch (error) {
      alert(
        "Error 505, Internal Server Error. No se pudieron obtener los platos", error
      );
    }
  };
};

