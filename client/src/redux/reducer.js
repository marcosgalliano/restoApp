import {
  GET_PEDIDOS,
  TOGGLE_FILTER,
  SEARCH_MESA,
  SET_FILTER,
  SEARCH_NAME,
  SET_INPUTMESA,
  SET_INPUTNOMBRE,
  GET_PLATOS,
} from "./actions";

const initialState = {
  pedidos: [],
  filters: {
    byPendientes: true,
    byEnMesa: false,
    byPagados: false,
  },
  searchMesaInput: "",
  searchMesa: false,
  searchedMesa: [],
  searchNameInput: "",
  searchName: false,
  searchedName: [],
  platos: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PEDIDOS:
      return {
        ...state,
        pedidos: action.payload,
      };

    case GET_PLATOS:
      return {
        ...state,
        platos: action.payload,
      };

    case TOGGLE_FILTER:
      const currentFilters = { ...state.filters };

      const isCurrentlyTrue = currentFilters[action.payload];

      if (isCurrentlyTrue) {
        return state;
      }

      currentFilters[action.payload] = true;

      for (const filter in currentFilters) {
        if (filter !== action.payload) {
          currentFilters[filter] = false;
        }
      }

      return {
        ...state,
        filters: currentFilters,
      };

    case SEARCH_MESA:
      return {
        ...state,
        searchMesa: true,
        searchedMesa: action.payload,
        searchName: false,
        searchedName: [],
      };

    case SEARCH_NAME:
      return {
        ...state,
        searchName: true,
        searchedName: action.payload,
        searchMesa: false,
        searchedMesa: [],
      };

    case SET_FILTER:
      return {
        ...state,
        [action.payload]: false,
      };

    case SET_INPUTMESA:
      return {
        ...state,
        searchMesaInput: action.payload,
      };

    case SET_INPUTNOMBRE:
      return {
        ...state,
        searchNameInput: action.payload,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
