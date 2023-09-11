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
  login: (email: string, password: string, redirect?: string) => void;
  logout: () => void;
}

export const UserContext = createContext<IUserContext>(null as any);

export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  const login = async (email: string, password: string, redirect: string) => {
    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error(res.status.toString());
      const data = await res.json();
      setUser(data);
      setErrorMessage(null);
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
    } catch (error) {
      console.log("Error when logging out on server");
    }
  };

  return (
    <UserContext.Provider value={{ user, errorMessage, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
