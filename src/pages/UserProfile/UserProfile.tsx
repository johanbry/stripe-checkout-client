import { useUserContext } from "../../context/UserContext";
import { useEffect, useState } from "react";

import { IOrder } from "./../../interfaces/interfaces";
import OrderSummary from "../../components/OrderSummary/OrderSummary";

const UserProfile = () => {
  const { user, logout } = useUserContext();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        setErrorMessage(null);
        const res = await fetch("/api/users/me/orders");
        const data = await res.json();
        if (!res.ok) throw new Error(data);
        setOrders(data);
      } catch (error) {
        setErrorMessage((error as Error).message);
      }
    };

    getOrders();
  }, []);

  const handleLogout = () => {
    logout();
  };
  return (
    <div className="box-container full-width">
      <button className="float-right" type="button" onClick={handleLogout}>
        Logga ut
      </button>
      <h1>Mina sidor</h1>
      <h3>Användaruppgifter:</h3> Namn: {user?.name}
      <br />
      E-post: {user?.email}
      <br />
      <br />
      <h2>Beställningar</h2>
      {orders &&
        orders.map((order) => <OrderSummary order={order} key={order.id} />)}
      {orders.length < 1 && <p>Det finns inga beställningar att visa ännu.</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default UserProfile;
