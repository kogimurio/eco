import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import './App.css';

// Toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Static imports (smaller components)
import Layout from './pages/NavComponents/Layout';
import Home from './pages/HomeComponents/Home';
import NoPage from './pages/HomeComponents/NoPage';
import Login from './pages/NavComponents/Login';
import Register from './pages/NavComponents/Register';
import Profile from './pages/NavComponents/Profile';
import DetailProduct from './pages/ProductComponents/DetailProduct';

// Lazy-loaded Admin Components
const Dashboard = lazy(() => import('./pages/AdminComponents/Dashboard'));
const Overview = lazy(() => import('./pages/AdminComponents/Overview'));
const Order = lazy(() => import('./pages/AdminComponents/Order'));
const Users = lazy(() => import('./pages/AdminComponents/Users'));
const Settings = lazy(() => import('./pages/AdminComponents/Settings'));
const ProductList = lazy(() => import('./pages/AdminComponents/ProductList'));
const CreateProduct = lazy(() => import('./pages/AdminComponents/AddProduct'));
const Analytics = lazy(() => import('./pages/AdminComponents/Analytics'));
const ViewOrder = lazy(() => import('./pages/AdminComponents/OrderView'));
const Cart = lazy(() => import('./pages/OrderComponents/Cart'));
const Checkout = lazy(() => import('./pages/OrderComponents/Checkout'));
const OrderConfirmation = lazy(() => import('./pages/OrderComponents/ThankYou'));
const WishList = lazy(() => import('./pages/OrderComponents/WishList'));


export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="text-center text-white p-10">Loading...</div>}>
      <ToastContainer position="top-center" autoClose={3000} theme="dark" />
        <Routes>
          {/* Public routes with navbar and footer */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<NoPage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path="productdetail" element={<DetailProduct />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="order_confirmation" element={<OrderConfirmation />} />
            <Route path="wishlist" element={<WishList />} />
          </Route>

          {/* routes without navbar/footer */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Overview />} />
            <Route path="order" element={<Order />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="products" element={<ProductList />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="order_view" element={<ViewOrder />} />
            <Route path="add_product" element={<CreateProduct />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
