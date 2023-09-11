import {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";

interface IUser {
  stripeId: string;
  name: string;
  email: string;
}

interface IUserContext {
  user: IUser | null;
  errorMessage: string | null;
  infoMessage: string | null;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => void;
  login: (email: string, password: string, redirect: string) => void;
  logout: () => void;
}

export const UserContext = createContext<IUserContext>(null as any);

export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const authorize = async () => {
      try {
        const res = await fetch("/api/users/authorize");
        if (!res.ok) throw new Error(res.status.toString());
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    authorize();
  }, []);

  useEffect(() => {
    console.log("innan timer");
    const timer = setTimeout(() => {
      setInfoMessage(null);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [infoMessage]);

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    try {
      setInfoMessage(null);
      setErrorMessage(null);
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
      if (!res.ok) throw new Error(res.status.toString());
      //const data = await res.json();
      //await login(email, password, "/userprofile");
      navigate("/login");
      setInfoMessage("Welcome! Your account is created, please log in.");
    } catch (error) {
      console.log(error);

      setErrorMessage("Failed to register. " + error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (
    email: string,
    password: string,
    redirect: string | null = null
  ) => {
    try {
      setInfoMessage(null);
      setErrorMessage(null);
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error(res.status.toString());
      const data = await res.json();
      setUser(data);
      setInfoMessage("You are now logged in!");
      if (redirect) navigate(redirect);
    } catch (error) {
      console.log(error);

      setErrorMessage("Failed to login. " + error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/users/logout");
      setUser(null);
      setInfoMessage("You are now logged out!");
    } catch (error) {
      console.log("Error when logging out on server");
    }
  };

  return (
    <UserContext.Provider
      value={{ user, errorMessage, infoMessage, register, login, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
