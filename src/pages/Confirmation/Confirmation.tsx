import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IOrder } from "./../../interfaces/interfaces";
import { useCartContext } from "../../context/CartContext";
import { useUserContext } from "../../context/UserContext";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import AnimationDotsPulse from "../../components/AnimationDotsPulse/AnimationDotsPulse";

const Confirmation = () => {
  const [order, setOrder] = useState<IOrder | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPaymentVerified, setIsPaymentVerified] = useState<boolean>(false);
  const { user } = useUserContext();
  const { clearCart } = useCartContext();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const stripeSessionId = searchParams.get("session_id");
  // To avoid double rendering in Strict mode
  //const hasVerified = useRef(false);

  useEffect(() => {
    const createOrder = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        setIsPaymentVerified(false);
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ stripeSessionId }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        // 201 means new order created, 200 means already created.
        if (res.status === 201) setIsPaymentVerified(true);
        setOrder(data.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setErrorMessage((error as Error).message);
      }
    };

    if (!stripeSessionId) navigate("/", { replace: true });
    createOrder();
    /* Avoid double rendering in Strict mode. */
    // else if (!hasVerified.current) {
    //   createOrder();
    //   hasVerified.current = true;
    // }
  }, [stripeSessionId, navigate]);

  useEffect(() => {
    if (isPaymentVerified) clearCart();
  }, [isPaymentVerified, clearCart]);

  return (
    <div className="box-container full-width">
      {order && user?.stripeId === order.customer.stripeId && !isLoading && (
        <div>
          <h2>Orderbekräftelse</h2>
          <OrderSummary order={order} />
        </div>
      )}
      {isLoading && <AnimationDotsPulse />}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default Confirmation;
