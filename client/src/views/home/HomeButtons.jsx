import style from "./HomeButtons.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className={style.divHomeButtons}>
      <Link to="/pedidos">
        <button>Pedidos</button>
      </Link>
      <Link to="/crear_pedidos">
        <button>Crear Pedido</button>
      </Link>
      <Link>
        <button>Estadisticas</button>
      </Link>
      <Link to="/Menu">
        <button>Menú</button>
      </Link>
    </div>
  );
};

export default Home;
