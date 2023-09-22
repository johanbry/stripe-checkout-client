import { useCartContext } from "../../context/CartContext";
import { useUserContext } from "../../context/UserContext";

import { ICartItem } from "./../../interfaces/interfaces";
import { useEffect, useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import { SubmitHandler } from "react-hook-form";
import { ILoginUser, IRegisterUser } from "../../interfaces/interfaces";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import "./cart.css";
import { formatPrice } from "../../utils/price";

const Cart = () => {
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { cartItems, subtractFromCart, addToCart, cartTotal } =
    useCartContext();
  const {
    user,
    isLoading: userIsLoading,
    errorMessage: userErrorMessage,
    registerSuccess,
    setRegisterSuccess,
    login,
    register,
  } = useUserContext();

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
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      window.location.replace(data.url);
    } catch (error) {
      setErrorMessage((error as Error).message);
      setIsLoading(false);
    }
  };

  const onLoginSubmit: SubmitHandler<ILoginUser> = async (data: ILoginUser) => {
    login(data.email, data.password);
  };

  const onRegisterSubmit: SubmitHandler<IRegisterUser> = async (
    data: IRegisterUser
  ) => {
    register(data.firstName, data.lastName, data.email, data.password);
  };

  useEffect(() => {
    if (registerSuccess) {
      setShowRegister(false);
      setRegisterSuccess(false);
    }
  }, [registerSuccess, setRegisterSuccess]);

  return (
    <div className="box-container full-width">
      <h1>Varukorg</h1>
      <div className="cart-wrapper">
        {cartItems.length > 0 &&
          cartItems.map((item) => (
            <div key={item.id} className="cart-items-wrapper box-container">
              <img src={item.images[0]} />
              <div className="item-name">
                {item.qty} x {item.name}
                <div>
                  <button
                    className="cart-button"
                    type="button"
                    onClick={() => handleSubtract(item.id)}
                  >
                    -
                  </button>
                  <button
                    className="cart-button"
                    type="button"
                    onClick={() => handleAdd(item)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div>á {formatPrice(item.default_price.unit_amount)}</div>
            </div>
          ))}
        {cartItems.length > 0 ? (
          <p>Totalt: {formatPrice(cartTotal())}</p>
        ) : (
          <p>Varukorgen är tom.</p>
        )}
        {cartItems.length > 0 && user && (
          <button onClick={handleCheckout}>
            {isLoading ? "Vänta..." : "Till kassan"}
          </button>
        )}
        {!user && cartItems.length > 0 && (
          <p>Du måste logga in för att gå till kassan.</p>
        )}
        {!user && cartItems.length > 0 && !showRegister && (
          <div className="form-wrapper box-container">
            <h3>Logga in</h3>
            <LoginForm onSubmit={onLoginSubmit} isLoading={userIsLoading} />
            <div className="toggle-link" onClick={() => setShowRegister(true)}>
              <button
                className="btn-reverse"
                type="button"
                onClick={() => setShowRegister(true)}
              >
                Registrera
              </button>
            </div>
          </div>
        )}
        {!user && cartItems.length > 0 && showRegister && (
          <div className="form-wrapper box-container">
            <h3>Registrera</h3>
            <RegisterForm
              onSubmit={onRegisterSubmit}
              isLoading={userIsLoading}
            />

            <div className="toggle-link">
              <button
                className="btn-reverse"
                type="button"
                onClick={() => setShowRegister(false)}
              >
                Logga in
              </button>
            </div>
          </div>
        )}

        {userErrorMessage && <p>{userErrorMessage}</p>}
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Cart;
