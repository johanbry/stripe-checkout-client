import { SubmitHandler } from "react-hook-form";
import { useUserContext } from "../../context/UserContext";
import { IRegisterUser } from "./../../interfaces/interfaces";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Register = () => {
  const { register, errorMessage, setErrorMessage, isLoading } =
    useUserContext();

  const onSubmit: SubmitHandler<IRegisterUser> = async (
    data: IRegisterUser
  ) => {
    register(
      data.firstName,
      data.lastName,
      data.email,
      data.password,
      "/login"
    );
  };

  useEffect(() => {
    setErrorMessage(null);
  }, [setErrorMessage]);

  return (
    <div className="box-container form-wrapper">
      <h1>Registrera</h1>
      <RegisterForm isLoading={isLoading} onSubmit={onSubmit} />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="toggle-link">
        <Link to="/login">Logga in</Link>
      </div>
    </div>
  );
};

export default Register;
