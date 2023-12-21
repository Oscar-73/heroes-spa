import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const LoginPage = () => {

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const onLogin = () => {

    // Obtenemos la última ubicación para llevar directamente ahí al usuario tras iniciar sesión.
    // Si no hay última ubicación registrada, se le redirige a '/'.
    const lastPath = localStorage.getItem('lastPath') || '/';

    // Esto almacena el nombre del usuario durante el tiempo que tenga la sesión iniciada.
    login('Óscar Gómez');

    navigate(lastPath, {
      replace: true
    });
  }

  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <hr />

      <button
        className="btn btn-primary"
        onClick={onLogin}
      >
        Login
      </button>
    </div>
  )
}
