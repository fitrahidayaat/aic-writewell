import LandingPage from "./components/LandingPage";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import Layout from "./components/Layout";
import HistoryPage from "./components/HistoryPage";
import ResultPage from "./components/ResultPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <LandingPage />,
            },
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "/signup",
                element: <SignupPage />,
            },
            {
                path: "/home",
                element: <ProtectedRoute element={<HomePage />} />, // Protect this route
            },
            {
                path: "/history",
                element: <ProtectedRoute element={<HistoryPage />} />, // Protect this route
            },
            {
                path: "/result",
                element: <ProtectedRoute element={<ResultPage />} />, // Protect this route
            }
        ]
    }
]);


export default function App() {
    return <RouterProvider router={router} />;
}