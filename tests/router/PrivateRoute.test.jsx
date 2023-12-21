import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PrivateRoutes } from '../../src/router/PrivateRoutes';

describe('Pruebas en el <PrivateRoutes />', () => {

    test('Debe mostrar el children si está autenticado', () => {

        // Así simulamos un "localStorage.setItem()".
        Storage.prototype.setItem = jest.fn();

        const contextValue = {
            logged: true,
            user: {
                id: 'ABC',
                name: 'Antonio'
            }
        };

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/search?q=batman']}>
                    <PrivateRoutes>
                        <h1>Ruta privada</h1>
                    </PrivateRoutes>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(screen.getByText('Ruta privada')).toBeTruthy();
        expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/search?q=batman");
    });
});