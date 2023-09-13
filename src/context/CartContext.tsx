import { PropsWithChildren, createContext, useContext, useState } from "react";

export interface IProduct {
  id: string;
  name: string;
  description: string;
  default_price: {
    id: string;
    unit_amount: number;
  };
  price: number;
  price_id: string;
  images: string[];
}

export interface ICartItem extends IProduct {
  qty: number;
}

interface ICartContext {
  cartItems: ICartItem[];
  addToCart: (product: IProduct, qty: number) => void;
  subtractFromCart: (id: string, qty: number) => void;
  clearCart: () => void;
  qtyInCart: () => number;
  cartTotal: () => number;
}

export const CartContext = createContext<ICartContext>(null as any);

export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

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

  const clearCart = () => {
    setCartItems([]);
  };

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
