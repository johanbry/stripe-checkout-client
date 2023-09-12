import { Link } from "react-router-dom";
import { FaUserLock, FaUser } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import "./header.css";
import { useUserContext } from "../../context/UserContext";
import { useCartContext } from "../../context/CartContext";

type Props = {};

const Header = (props: Props) => {
  const { user } = useUserContext();
  const { qtyInCart } = useCartContext();
  const qty = qtyInCart();
  return (
    <header>
      <div className="header-container">
        <h1>
          <Link to="/">Ball Store</Link>
        </h1>
        <div className="header-icon-buttons">
          {user ? (
            <Link to="/userprofile">
              <FaUser />
            </Link>
          ) : (
            <Link to="/login">
              <FaUserLock />
            </Link>
          )}
          <Link to="/cart">
            <FaBagShopping />
            {qty > 0 && <div className="qty-circle">{qty}</div>}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
