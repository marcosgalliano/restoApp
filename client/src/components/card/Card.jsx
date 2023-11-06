import style from "./Card.module.css";

const Card = (props) => {
  const { name, tableNumber, pedidoStatus, items } = props;

  // Función para calcular el total del pedido
  const calculateTotal = () => {
    let total = 0;

    for (const item of items) {
      const price = parseFloat(item.price);
      const cantidad = parseInt(item.cantidad);
      total += price * cantidad;
    }

    return total;
  };

  const totalPedido = calculateTotal();

  return (
    <div className={style.cardDiv}>
      <h3 className={style.name}>{name}</h3>
      <h3 className={style.table}>{tableNumber}</h3>
      {items.map((item, index) => {
        return (
          <div className={style.divItems} key={index}>
            <h3>{item.name}</h3>
            <h3>{item.cantidad}</h3>
            <h3>{item.price}</h3>
          </div>
        );
      })}
      <h2 className={style.price}>$ {totalPedido}</h2>
      <h3
        className={
          pedidoStatus === "Pendiente"
            ? style.pendiente
            : pedidoStatus === "En Mesa"
            ? style.enMesa
            : pedidoStatus ==="Pagado"
            ? style.pagado
            : style.status
        }
      >
        {pedidoStatus}
      </h3>
    </div>
  );
};

export default Card;
