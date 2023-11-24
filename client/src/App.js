import "./App.css";
import { Route } from "react-router-dom";
import logo from "./assets/logito.png";
import Home from "./views/home/HomeButtons";
import CreatePedido from "./views/crear_pedido/Create";
import CreateMenu from "./views/crear_plato/CreateMenu";
import DetailPedido from "./views/detail_pedido/DetailPedido";
import EditPlato from "./views/editar_plato/EditPlato";
import Menu from "./views/Menu/Menu";
import axios from "axios";
import PedidosView from "./views/pedidos/Pedidos";
import { useEffect } from "react";
import { getPedidos, getPlatos } from "./redux/actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
axios.defaults.baseURL = "https://restoapp-production.up.railway.app/";
//https://restoapp-production.up.railway.app/
//http://localhost:3001/

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    dispatch(getPedidos());
    dispatch(getPlatos());
  }, [dispatch]);
  const handleClick = () => {
    const path = location.pathname;

    if (path.startsWith("/pedidos")) {
      return history.push("/");
    } else if (path.startsWith("/Menu")) {
      return history.push("/");
    } else if (path.startsWith("/crear_pedidos")) {
      return history.push("/");
    } else if (
      path.startsWith("/agregarPlato") ||
      path.startsWith("/editarPlato")
    ) {
      return history.push("/Menu");
    } else if (path.startsWith("/detailPedido")) {
      return history.push("/pedidos");
    } else {
      return history.push("/");
    }
  };

  return (
    <div className="App">
      <div className="divContenedorLogo">
        <button
          onClick={handleClick}
          className={
            location.pathname != "/" ? "buttonBackActive" : "disabledButtonBack"
          }
        >
          <ion-icon name="chevron-back-outline"></ion-icon>
        </button>
        <Link to="/">
          <img src={logo} alt="logo" className="principalImage" />
        </Link>
      </div>
      <Route exact path="/" component={Home} />
      <Route path="/pedidos" component={PedidosView} />
      <Route path="/crear_pedidos" component={CreatePedido} />
      <Route path="/Menu" component={Menu} />
      <Route path="/agregarPlato" component={CreateMenu} />
      <Route path="/editarPlato/:id" component={EditPlato} />
      <Route path="/detailPedido/:id" component={DetailPedido} />
    </div>
  );
}

export default App;
