import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../src/auth";
import { Navbar } from "../../../src/ui";

// Mock de una librería completa para hacer uso del "useNavigate".
const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}));

describe('Pruebas en <Navbar />', () => {

    const contextValue = {
        logged: true,
        user: {
            id: 'ABC',
            name: 'Antonio'
        },
        logout: jest.fn()
    };

    // Limpiamos todos los mocks antes de volver a usarlos.
    beforeEach(() => jest.clearAllMocks());

    test('Debe mostrar el nombre del usuario logueado', () => {

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText(contextValue.user.name)).toBeTruthy();
    });

    test('Debe llamar a las funciones "logout()" y "navigate()" cuando se haga clic en el botón de "Logout', () => {

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        // Pillamos el botón de "Logout".
        const logoutBtn = screen.getByRole('button');
        fireEvent.click(logoutBtn);

        // Esperamos que la función "logout" de dicho botón se haya llamado.
        expect(contextValue.logout).toHaveBeenCalled();

        // Esperamos que el mock del "useNavigate" se haya llamado con esos argumentos.
        expect(mockedUseNavigate).toHaveBeenCalledWith('/login', { "replace": true });
    });
});