import { useNavigate } from "react-router-dom";
import useAuth from "../store/auth";
import Login from "../types/login";

const LoginPage = () => {
  // const { login } = useAuth();
  const login = useAuth((state) => state.login);
  
  const navigate = useNavigate();
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user: Login = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };
    login(user, navigate);
  };
  return (
    <form onSubmit={submit}>
      <input type="text" name="username" />
      <input type="password" name="password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
