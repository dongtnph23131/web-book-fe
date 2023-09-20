import { createBrowserRouter } from "react-router-dom";
import LayoutWebsite from "./components/layouts/website";
import HomePage from "./pages/HomePage";
import Signin from "./pages/Signin";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import BookDetail from "./pages/BookDetail";
import Cart from "./pages/Cart";
import Signup from "./pages/Signup";
import ProfilePage from "./pages/ProfilePage";
import UpdatePassword from "./pages/UpdatePassword";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const routers = createBrowserRouter([
    {
        path: '', element: <LayoutWebsite />, children: [
            { index: true, element: <HomePage /> },
            { path: 'signin', element: <Signin /> },
            { path: 'categories/:id', element: <CategoryPage /> },
            { path: 'search/:search', element: <SearchPage /> },
            { path: 'books/:id', element: <BookDetail /> },
            { path: 'cart', element: <Cart /> },
            {path:'signup',element:<Signup/>},
            {path:'profile',element:<ProfilePage/>},
            {path:'updatepassword',element:<UpdatePassword/>},
            {path:'forgotPassword',element:<ForgotPassword/>},
            {path:'resetPassword',element:<ResetPassword/>}
        ]
    }
])
export default routers