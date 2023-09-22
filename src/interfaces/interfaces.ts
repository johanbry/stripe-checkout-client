export interface IProduct {
  id: string;
  name: string;
  description: string;
  default_price: {
    id: string;
    unit_amount: number;
  };
  images: string[];
}

export interface ICartItem extends IProduct {
  qty: number;
}

export interface ICartContext {
  cartItems: ICartItem[];
  addToCart: (product: IProduct, qty: number) => void;
  subtractFromCart: (id: string, qty: number) => void;
  clearCart: () => void;
  qtyInCart: () => number;
  cartTotal: () => number;
}

export interface IOrderItem {
  id: string;
  name: string;
  image?: string;
  price: number;
  quantity: number;
  discount: number;
  totalPrice: number;
}

export interface IOrder {
  id: string;
  created: number;
  paymentId: string;
  customer: IUser;
  totalAmount: number;
  orderItems: (IOrderItem | undefined)[];
}

export type IRegisterUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type ILoginUser = {
  email: string;
  password: string;
};

export interface IUser {
  stripeId: string;
  name: string;
  email: string;
}

export interface IUserContext {
  user: IUser | null;
  isLoading: boolean;
  errorMessage: string | null;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
  registerSuccess: boolean;
  setRegisterSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    redirect?: string
  ) => void;
  login: (email: string, password: string, redirect?: string) => void;
  logout: () => void;
}
