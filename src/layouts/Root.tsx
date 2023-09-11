import { Outlet } from "react-router-dom";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import "./root.css";
import UserProvider from "../context/UserContext";

type Props = {};

const Root = (props: Props) => {
  return (
    <UserProvider>
      <Header />
      <main>
        <div className="main-container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </UserProvider>
  );
};

export default Root;
