import { useForm, SubmitHandler } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import { ILoginUser } from "../../interfaces/interfaces";
import { loginSchema } from "../../schemas/schemas";

type Props = {
  onSubmit: SubmitHandler<ILoginUser>;
  isLoading: boolean;
};

const LoginForm = ({ onSubmit, isLoading }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginUser>({
    resolver: joiResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">E-post</label>
      <input autoComplete="email" id="email" {...register("email")} />
      <span>{errors.email?.message}</span>

      <label htmlFor="password">Lösenord</label>
      <input
        autoComplete="current-password"
        id="password"
        type="password"
        {...register("password")}
      />
      <span>{errors.password?.message}</span>
      <button type="submit">{isLoading ? "Vänta..." : "Logga in"}</button>
    </form>
  );
};

export default LoginForm;
