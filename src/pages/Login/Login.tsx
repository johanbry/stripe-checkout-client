import { useUserContext } from "../../context/UserContext";
import { SubmitHandler } from "react-hook-form";
import LoginForm from "../../components/LoginForm/LoginForm";
import { ILoginUser } from "../../interfaces/interfaces";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const { user, login, isLoading, errorMessage, setErrorMessage } =
    useUserContext();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ILoginUser> = async (data: ILoginUser) => {
    login(data.email, data.password, "/userprofile");
  };

  useEffect(() => {
    if (user) navigate("/userprofile");
  }, [user, navigate]);

  useEffect(() => {
    setErrorMessage(null);
  }, [setErrorMessage]);

  return (
    <div className="box-container form-wrapper">
      <h1>Logga in</h1>
      <LoginForm isLoading={isLoading} onSubmit={onSubmit} />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="toggle-link">
        <Link to="/register">Registrera dig</Link>
      </div>
    </div>
  );
};

export default Login;
