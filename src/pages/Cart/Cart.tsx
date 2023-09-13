import { useSearchParams } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import { useUserContext } from "../../context/UserContext";

import { ICartItem } from "./../../context/CartContext";
import { useState } from "react";

type Props = {};

const Cart = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { cartItems, subtractFromCart, addToCart, cartTotal } =
    useCartContext();
  const { user } = useUserContext();

  const handleSubtract = (id: string) => {
    subtractFromCart(id, 1);
  };

  const handleAdd = (item: ICartItem) => {
    addToCart(item, 1);
  };

  const handleCheckout = async () => {
    const createParams = {
      cart: cartItems,
      customer: user?.stripeId,
    };
    try {
      setErrorMessage(null);
      setIsLoading(true);
      const res = await fetch("/api/checkout/create-stripe-session", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(createParams),
      });
      if (!res.ok) throw Error;
      const session = await res.json();
      window.location.href = session.url;
    } catch (error) {
      setErrorMessage("Could not proceed to checkout.");
      setIsLoading(false);
    }
  };

  return (
    <div>
      {cartItems.map((item) => (
        <div key={item.id}>
          {item.qty} x {item.name}[{item.id}] á {item.default_price.unit_amount}
          - {item.default_price.id}
          <button type="button" onClick={() => handleSubtract(item.id)}>
            -
          </button>
          <button type="button" onClick={() => handleAdd(item)}>
            +
          </button>
        </div>
      ))}
      <p>Total: {cartTotal()}</p>
      {user && <button onClick={handleCheckout}>Checkout</button>}
      {!user && <p>Log in to proceed to checkout!</p>}
    </div>
  );
};

export default Cart;
