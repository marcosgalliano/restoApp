import "./App.css";
import { Route } from "react-router-dom";
import logo from "./assets/logito.png";
import Home from "./views/home/HomeButtons";
import CreatePedido from "./views/crear_pedido/Create";
import CreateMenu from "./views/crear_plato/CreateMenu";
import EditPlato from "./views/editar_pedido/EditPlato";
import Menu from "./views/Menu/Menu";
import axios from "axios";
import PedidosView from "./views/pedidos/Pedidos";
import { useEffect } from "react";
import { getPedidos, getPlatos } from "./redux/actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
axios.defaults.baseURL = "https://restoapp-production.up.railway.app/";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPedidos());
    dispatch(getPlatos());
  }, [dispatch]);
  return (
    <div className="App">
      <div className="divContenedorLogo">
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
    </div>
  );
}

export default App;
