import { useState, FormEvent } from "react";
import { useUserContext } from "../../context/UserContext";

type Props = {};

const Register = (props: Props) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { register, errorMessage, infoMessage } = useUserContext();

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register(firstName, lastName, email, password);
  };

  return (
    <>
      <form onSubmit={(e) => handleRegister(e)}>
        <input
          type="text"
          value={firstName}
          placeholder="first name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          value={lastName}
          placeholder="last name"
          onChange={(e) => setLastName(e.target.value)}
        />
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
        <button>Register</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      {infoMessage && <p>{infoMessage}</p>}
    </>
  );
};

export default Register;
