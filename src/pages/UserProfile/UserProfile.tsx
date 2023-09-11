import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

type Props = {};

const UserProfile = (props: Props) => {
  const { user, logout } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div>
      <h3>User information:</h3> Name: {user?.name}
      <br />
      Email: {user?.email}
      <button type="button" onClick={handleLogout}>
        Logga ut
      </button>
    </div>
  );
};

export default UserProfile;
