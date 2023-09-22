import {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { IUserContext, IUser } from "../interfaces/interfaces";

const defaultValues = {
  user: null,
  isLoading: false,
  errorMessage: null,
  registerSuccess: false,
  setErrorMessage: () => {},
  setRegisterSuccess: () => {},
  register: () => {},
  login: () => {},
  logout: () => {},
};

export const UserContext = createContext<IUserContext>(defaultValues);

export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [registerSuccess, setRegisterSuccess] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const authorize = async () => {
      try {
        const res = await fetch("/api/users/authorize");
        const data = await res.json();
        if (!res.ok) throw new Error(data);
        setUser(data);
      } catch (error) {
        //
      }
    };
    authorize();
  }, [setUser]);

  useEffect(() => {
    let timer: number;
    if (errorMessage) {
      timer = setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [errorMessage]);

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    redirect: string | undefined
  ) => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      setRegisterSuccess(true);
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data);
      }
      setRegisterSuccess(true);
      if (redirect) navigate(redirect);
    } catch (error) {
      setErrorMessage((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (
    email: string,
    password: string,
    redirect: string | undefined
  ) => {
    try {
      setErrorMessage(null);
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data);

      setUser(data);
      if (redirect) navigate(redirect);
    } catch (error) {
      setErrorMessage((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/users/logout");
      setUser(null);
    } catch (error) {
      //
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        errorMessage,
        isLoading,
        registerSuccess,
        register,
        login,
        logout,
        setRegisterSuccess,
        setErrorMessage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
