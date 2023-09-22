import { formatDate } from "../../utils/date";
import { IOrder } from "./../../interfaces/interfaces";
import "./ordersummary.css";
import { formatPrice } from "../../utils/price";

type Props = {
  order: IOrder;
};

const OrderSummary = ({ order }: Props) => {
  return (
    <div key={order.id} className="order-summary box-container">
      <h4>Order#: {order.id}</h4>
      <span>{formatDate(order.created)}</span>
      <div className="order-summary-items">
        <table>
          <thead>
            <tr>
              <th className="cell-left">Produkt</th>
              <th className="cell-right">á</th>
              <th className="cell-right">Rabatt</th>
              <th className="cell-right">Summa</th>
            </tr>
          </thead>

          {order.orderItems.map((item) => (
            <tbody key={item?.id}>
              <tr>
                <td>
                  {item?.quantity} x {item?.name}
                </td>
                <td className="cell-right no-wrap">
                  {formatPrice(item?.price)}
                </td>
                <td className="cell-right no-wrap">
                  {formatPrice(item?.discount)}
                </td>
                <td className="cell-right no-wrap">
                  {formatPrice(item?.totalPrice)}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className="order-total">
        Totalsumma: {formatPrice(order.totalAmount)}
      </div>
    </div>
  );
};

export default OrderSummary;
