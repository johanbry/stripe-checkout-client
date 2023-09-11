import { FaUserLock, FaUser } from "react-icons/fa";
import "./header.css";
import { useUserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

type Props = {};

const Header = (props: Props) => {
  const { user } = useUserContext();
  return (
    <header>
      <div className="header-container">
        <h1>
          <Link to="/">Ball Store</Link>
        </h1>
      </div>
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
      </div>
    </header>
  );
};

export default Header;
