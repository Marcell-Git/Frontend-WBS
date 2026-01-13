import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";

const router = createBrowserRouter([
    {
        path: "*",
        element: <div>404 Not Found!</div>
    },
    {
        path: "/",
        element: <LandingPage/>,
    },
    {
        path: "/login",
        element: <LoginPage/>,
    },
    
]);

const AppRouter = () => {
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <RouterProvider router={router} />
        </>
    );
};

export default AppRouter;