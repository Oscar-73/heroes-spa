import { Route, Routes } from "react-router-dom";

import { LoginPage } from "../auth";
import { HeroesRoutes } from "../heroes/routes/HeroesRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

export const AppRouter = () => {
    return (
        <>
            <Routes>

                {/* Rutas públicas solo accesibles sin haber hecho login */}
                <Route path="login" element={
                    <PublicRoutes>
                        <LoginPage />
                    </PublicRoutes>
                } />

                {/* Rutas privadas solo accesibles tras hacer login */}
                <Route path="/*" element={
                    <PrivateRoutes>
                        <HeroesRoutes />
                    </PrivateRoutes>
                } />
            </Routes>

        </>
    )
}
