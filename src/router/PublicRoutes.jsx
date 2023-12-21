import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth";

export const PublicRoutes = ({children}) => {

    // Obtenemos dicha variable para comprobar si el usuario está logueado.
    const { logged } = useContext(AuthContext);

    // Si el usuario no está logueado, muestra los children (rutas públicas). Si lo está, lo manda de vuelta a la página de Marvel.
    return (!logged)
        ? children
        : <Navigate to="/marvel" />
}

