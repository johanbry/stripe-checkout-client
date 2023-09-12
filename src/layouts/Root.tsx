import { Outlet } from "react-router-dom";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import "./root.css";
import UserProvider from "../context/UserContext";
import CartProvider from "../context/CartContext";

const Root = () => {
  return (
    <UserProvider>
      <CartProvider>
        <Header />
        <main>
          <div className="main-container">
            <Outlet />
          </div>
        </main>
        <Footer />
      </CartProvider>
    </UserProvider>
  );
};

export default Root;
