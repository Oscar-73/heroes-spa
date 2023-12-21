import { useReducer } from "react"
import { types } from "../types/types"
import { AuthContext } from "./AuthContext"
import { authReducer } from "./authReducer"

// Función de inicio para recuperar los datos del usuario (en el caso de que haya).
const init = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  // Si el usuario existe, "logged" quedará en "true" y se asignará en "user".
  return {
    logged: !!user,
    user: user,
  }
}

export const AuthProvider = ({ children }) => {

  const [authState, dispatch] = useReducer(authReducer, {}, init);

  const login = (name = '') => {

    const user = {id: 'ABC', name }

    const action = { type: types.login, payload: user };

    // Almacenamos el nombre del usuario.
    localStorage.setItem('user', JSON.stringify(user));

    dispatch(action);
  }

  const logout = () => {
      localStorage.removeItem('user');

      const action = {type: types.logout};

      dispatch(action);
  }

  return (
    <AuthContext.Provider value={{
      ...authState,

      // Methods
      login: login,
      logout: logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}
