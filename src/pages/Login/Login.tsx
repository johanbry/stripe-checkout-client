import { FormEvent, useState } from "react";
import { useUserContext } from "../../context/UserContext";

type Props = {};

const Login = (props: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { login, errorMessage } = useUserContext();

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handlelogin", email, password);

    login(email, password);
  };

  return (
    <>
      <form onSubmit={(e) => handleLogin(e)}>
        <input
          type="text"
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
};

export default Login;
