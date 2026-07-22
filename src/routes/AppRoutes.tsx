import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Dashboard } from "../Tickets/pages/Dashboard/Dashboard";
import { Tickets } from "../Tickets/pages/Tickets/Tickets";
import { Users } from "../Users/Users";
import { LoginPage } from "../features/auth/pages/LoginPage";

import ProtectedRoute from "./ProtectedRoutes";
import Layout from "../components/Layout/Layout";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<LoginPage />} />
                <Route path="/tickets" element={<Tickets />} />

                <Route
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="/dashboard" element={<Dashboard />} />
                    {/* <Route path="/tickets" element={<Tickets />} /> */}
                    <Route path="/users" element={<Users />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;