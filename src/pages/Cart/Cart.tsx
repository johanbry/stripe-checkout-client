import { useCartContext } from "../../context/CartContext";

import { ICartItem } from "./../../context/CartContext";

type Props = {};

const Cart = (props: Props) => {
  const { cartItems, subtractFromCart, addToCart, cartTotal } =
    useCartContext();

  const handleSubtract = (id: string) => {
    subtractFromCart(id, 1);
  };

  const handleAdd = (item: ICartItem) => {
    addToCart(item, 1);
  };

  return (
    <div>
      {cartItems.map((item) => (
        <div key={item.id}>
          {item.qty} x {item.name}[{item.id}] á {item.price}{" "}
          <button type="button" onClick={() => handleSubtract(item.id)}>
            -
          </button>
          <button type="button" onClick={() => handleAdd(item)}>
            +
          </button>
        </div>
      ))}
      <p>Total: {cartTotal()}</p>
    </div>
  );
};

export default Cart;
