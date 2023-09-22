import { useForm, SubmitHandler } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import { IRegisterUser } from "./../../interfaces/interfaces";
import { registerSchema } from "../../schemas/schemas";

type Props = {
  onSubmit: SubmitHandler<IRegisterUser>;
  isLoading: boolean;
};

const RegisterForm = ({ onSubmit, isLoading }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterUser>({
    resolver: joiResolver(registerSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="firstName">Förnamn</label>
      <input
        autoComplete="given-name"
        id="firstName"
        {...register("firstName")}
      />
      <span>{errors.firstName?.message}</span>

      <label htmlFor="lastName">Efternamn</label>
      <input
        autoComplete="family-name"
        id="lastName"
        {...register("lastName")}
      />
      <span>{errors.lastName?.message}</span>

      <label htmlFor="email">E-post</label>
      <input autoComplete="email" id="email" {...register("email")} />
      <span>{errors.email?.message}</span>

      <label htmlFor="password">Lösenord</label>
      <input
        autoComplete="new-password"
        id="password"
        {...register("password")}
      />
      <span>{errors.password?.message}</span>
      <button type="submit">{isLoading ? "Vänta..." : "Registrera"}</button>
    </form>
  );
};

export default RegisterForm;
