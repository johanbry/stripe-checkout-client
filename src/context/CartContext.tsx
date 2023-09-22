import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
} from "react";

import { useLocalStorage } from "../components/hooks/useLocalStorage";
import { ICartContext, ICartItem, IProduct } from "../interfaces/interfaces";

const defaultValues = {
  cartItems: [],
  addToCart: () => {},
  subtractFromCart: () => {},
  clearCart: () => {},
  qtyInCart: () => {
    return 0;
  },
  cartTotal: () => {
    return 0;
  },
};

export const CartContext = createContext<ICartContext>(defaultValues);

export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setCartItems] = useLocalStorage<ICartItem[]>("cart", []);

  const addToCart = (product: IProduct, qty: number) => {
    const itemIndex = cartItems.findIndex((item) => item.id === product.id);

    if (itemIndex === -1) setCartItems([...cartItems, { ...product, qty }]);
    else {
      const newCartItems = [...cartItems];
      newCartItems[itemIndex].qty += qty;
      setCartItems(newCartItems);
    }
  };

  const subtractFromCart = (id: string, qty: number) => {
    const itemIndex = cartItems.findIndex((item) => item.id === id);
    if (itemIndex === -1) return;

    const newCartItems = [...cartItems];

    if (cartItems[itemIndex].qty <= qty) newCartItems.splice(itemIndex, 1);
    else newCartItems[itemIndex].qty -= qty;

    setCartItems(newCartItems);
  };

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, [setCartItems]);

  const qtyInCart = () => {
    return cartItems.reduce((sum: number, item) => sum + item.qty, 0);
  };

  const cartTotal = () => {
    return cartItems.reduce(
      (sum: number, item) => sum + item.qty * item.default_price.unit_amount,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        subtractFromCart,
        clearCart,
        qtyInCart,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
