import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
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
import BooksPage from "./pages/BooksPage";
import LayoutAdmin from "./components/layouts/admin/LayoutAdmin";
import BookListAdmin from "./pages/admin/books/BookList";
import BookAdd from "./pages/admin/books/BookAdd";
import CategoryListAdmin from "./pages/admin/category/CategoryList";
import AuthorListAdmin from "./pages/admin/author/AuthorList";
import PublishingCompanyListAdmin from "./pages/admin/publishingCompany/publishingCompany";
import CheckoutAddress from "./pages/CheckoutAddress";
import { AppState } from "./context/AppProvider";
import ListUserAdmin from "./pages/admin/user/ListUserAdmin";
import CheckoutPayments from "./pages/CheckoutPayments";
import Dashboard from "./pages/admin";
import CheckoutFinal from "./pages/CheckoutFinal";
import ListOrderByUser from "./pages/ListOrderByUser";

const PrivateRouter = () => {
    const { userLogger } = AppState()
    if (!userLogger) {
        return <Navigate to={'/signin'} />
    }
    if (userLogger.role !== 'admin') {
        return <Navigate to={'/'} />
    }
    return <Outlet />
}

const routers = createBrowserRouter([
    {
        path: '', element: <LayoutWebsite />, children: [
            { index: true, element: <HomePage /> },
            { path: 'signin', element: <Signin /> },
            { path: 'categories/:id', element: <CategoryPage /> },
            { path: 'search/:search', element: <SearchPage /> },
            { path: 'books/:id', element: <BookDetail /> },
            { path: 'cart', element: <Cart /> },
            { path: 'signup', element: <Signup /> },
            { path: 'profile', element: <ProfilePage /> },
            { path: 'updatepassword', element: <UpdatePassword /> },
            { path: 'forgotPassword', element: <ForgotPassword /> },
            { path: 'resetPassword', element: <ResetPassword /> },
            { path: 'books', element: <BooksPage /> },
            { path: 'checkout/address', element: <CheckoutAddress /> },
            { path: 'checkout/payments', element: <CheckoutPayments /> },
            {path:'checkout/final',element:<CheckoutFinal/>},
            {path:'/myOrders',element:<ListOrderByUser/>}
        ]
    },
    {
        path: 'admin', element: <PrivateRouter />, children: [
            {
                element: <LayoutAdmin />, children: [
                    { index: true, element: <Navigate to={'/admin/dashboard'} /> },
                    { path: 'dashboard', element: <Dashboard /> },
                    { path: 'books', element: <BookListAdmin /> },
                    { path: 'books/add', element: <BookAdd /> },
                    { path: 'categories', element: <CategoryListAdmin /> },
                    { path: 'authors', element: <AuthorListAdmin /> },
                    { path: "publishingCompanys", element: <PublishingCompanyListAdmin /> },
                    { path: 'users', element: <ListUserAdmin /> }
                ]
            }
        ]
    }
])
export default routers