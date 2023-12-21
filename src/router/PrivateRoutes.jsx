import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../auth";

export const PrivateRoutes = ({ children }) => {

    // Obtenemos dicha variable para comprobar si el usuario está logueado.
    const { logged } = useContext(AuthContext);

    // De esta forma almacenamos la última ubicación y búsqueda.
    const {pathname, search} = useLocation();
    const lastPath = pathname + search;
    localStorage.setItem('lastPath', lastPath);

    // Si el usuario está logueado, muestra los children (rutas privadas). Si no, lo manda de vuelta al login.
    return (logged)
        ? children
        : <Navigate to="/login" />
}
