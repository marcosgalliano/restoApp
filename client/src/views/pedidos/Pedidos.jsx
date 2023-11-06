import style from "./Pedidos.module.css";
import FormPedidos from "../../components/forms/FormPedidos";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Card from "../../components/card/Card";

const PedidosView = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const pedidos = useSelector((state) => state.pedidos);
  const searchedMesa = useSelector((state) => state.searchedMesa);
  const searchMesa = useSelector((state) => state.searchMesa);
  const searchName = useSelector((state) => state.searchName);
  const searchedName = useSelector((state) => state.searchedName);
  const [itemsToDisplay, setItemsToDisplay] = useState([]);

  useEffect(() => {
    if (searchMesa) {
      if (filters.byPendientes) {
        const items = searchedMesa.filter(
          (pedido) => pedido.pedidoStatus === "Pendiente"
        );

        setItemsToDisplay(items);
        return;
      } else if (filters.byEnMesa) {
        const items = searchedMesa.filter(
          (pedido) => pedido.pedidoStatus === "En Mesa"
        );

        setItemsToDisplay(items);
        return;
      } else {
        const items = searchedMesa.filter(
          (pedido) => pedido.pedidoStatus === "Pagado"
        );

        setItemsToDisplay(items);
        return;
      }
    }

    if (searchName) {
      if (filters.byPendientes) {
        const items = searchedName.filter(
          (pedido) => pedido.pedidoStatus === "Pendiente"
        );

        setItemsToDisplay(items);
        return;
      } else if (filters.byEnMesa) {
        const items = searchedName.filter(
          (pedido) => pedido.pedidoStatus === "En Mesa"
        );

        setItemsToDisplay(items);
        return;
      } else {
        const items = searchedName.filter(
          (pedido) => pedido.pedidoStatus === "Pagado"
        );

        setItemsToDisplay(items);
        return;
      }
    }

    if (filters.byPendientes) {
      const items = pedidos.filter(
        (pedido) => pedido.pedidoStatus === "Pendiente"
      );

      setItemsToDisplay(items);
    } else if (filters.byEnMesa) {
      const items = pedidos.filter(
        (pedido) => pedido.pedidoStatus === "En Mesa"
      );

      setItemsToDisplay(items);
    } else {
      const items = pedidos.filter(
        (pedido) => pedido.pedidoStatus === "Pagado"
      );

      setItemsToDisplay(items);
    }
  }, [filters, dispatch, pedidos, searchedMesa, searchMesa, searchName, searchedName]);
  return (
    <div className={style.PedidosViewDiv}>
      <FormPedidos />
      <div className={style.cardsContainer}>
        {itemsToDisplay.length > 0 ? (
          itemsToDisplay.map((pedido, index) => {
            return (
              <Card
                id={pedido.id}
                name={pedido.name}
                tableNumber={pedido.tableNumber}
                pedidoStatus={pedido.pedidoStatus}
                items={pedido.items}
                key={index}
              />
            );
          })
        ) : (
          <h1>No hay pedidos...</h1>
        )}
      </div>
    </div>
  );
};

export default PedidosView;
