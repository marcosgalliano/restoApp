import style from "./DetailPedido.module.css";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DetailPedido = () => {
  const params = useParams();
  const id = params.id;
  const pedidos = useSelector((state) => state.pedidos);
  const [item, setItem] = useState(null);
  const [totalPedido, setTotalPedido] = useState();

  useEffect(async () => {
    const fetchData = async () => {
      try {
        const objetoEncontrado = pedidos.find((obj) => obj.id == id);

        setItem(objetoEncontrado);
        console.log(objetoEncontrado);
      } catch (error) {
        console.error("Error al obtener el objeto:", error);
      }
    };

    fetchData();

    if (item != null) {
      const calculateTotal = () => {
        let total = 0;

        for (const itemm of item.items) {
          const price = parseFloat(itemm.price);
          const cantidad = parseInt(itemm.cantidad);
          total += price * cantidad;
        }

        return total;
      };

      setTotalPedido(calculateTotal());
    }
  }, [id, pedidos, item]);

  return (
    <div className={style.divDetailPedido}>
      {item != null ? (
        <div className={style.containerDetaiPedido}>
          <h2 className={style.name}>{item.name}</h2>
          <h2 className={style.tableNumber}>{item.tableNumber}</h2>
          <div className={style.ContainerDetailedItems}>
            {item.items.map((i) => {
              return (
                <div className={style.detailedItems}>
                  <h3>{i.name}</h3>
                  <h3>x {i.cantidad}</h3>
                </div>
              );
            })}
          </div>
          <h2 className={style.totalPedido}>$ {totalPedido}</h2>
          <h4
            className={
              item.pedidoStatus == "Pendiente"
                ? style.pedidoStatusPT
                : item.pedidoStatus == "En Mesa"
                ? style.pedidoStatusM
                : item.pedidoStatus == "Pagado"
                ? style.pedidoStatusPG
                : style.pedidoStatus
            }
          >
            {item.pedidoStatus}
          </h4>
        </div>
      ) : (
        <h1>Cargando...</h1>
      )}
      <Link to={`/editarPedido/${id}`}>
        <button className={style.buttonSubmit}>Editar Pedido</button>
      </Link>
    </div>
  );
};

export default DetailPedido;
