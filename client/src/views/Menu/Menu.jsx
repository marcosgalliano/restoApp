import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import style from "./Menu.module.css";

const Menu = () => {
  const [menu, setMenu] = useState([]);

  useEffect(async () => {
    const menuAxios = await axios.get("/platos/");

    const apiData = menuAxios.data;
    setMenu(apiData);
  }, []);

  return (
    <div className={style.divMenu}>
      {menu.length > 0 ? (
        menu.map((item, index) => {
          return (
            <div className={style.divPlato} key={index}>
              <div className={style.infoContainer}>
                <h3>{item.name}</h3>
                <h4>$ {item.price}</h4>
              </div>
              <Link to={`/editarPlato/${item.id}`}>
                <button>
                  <ion-icon name="create-outline"></ion-icon>
                </button>
              </Link>
            </div>
          );
        })
      ) : (
        <h1>No hay Platos...</h1>
      )}
      <Link to="/agregarPlato">
        <button className={style.buttonAddInput}>+</button>
      </Link>
    </div>
  );
};

export default Menu;
