import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PublicRoutes } from '../../src/router/PublicRoutes';

describe('Pruebas en <PublicRoute />', () => {

    test('Debe mostrar el children si no está autenticado', () => {

        const contextValue = {
            logged: false
        };

        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRoutes>
                    <h1>Ruta pública</h1>
                </PublicRoutes>
            </AuthContext.Provider>
        )

        expect(screen.getByText('Ruta pública')).toBeTruthy();
    });

    test('Debe navegar si está autenticado', () => {

        const contextValue = {
            logged: true,
            user: {
                id: 'ABC',
                name: 'Pepito'
            }
        };

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}>

                    <Routes>
                        <Route path='login' element={
                            <PublicRoutes>
                                <h1>Ruta pública</h1>
                            </PublicRoutes>
                        } />

                        <Route path='marvel' element={<h1>Página Marvel</h1>} />
                    </Routes>

                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(screen.getByText('Página Marvel')).toBeTruthy();
    });
});