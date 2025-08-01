import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import './App.css';
import { CartProvider } from './context/CartContext'
import { AdminProvider } from './context/AdminContext';

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
import MenCategory from './pages/CategoryComponents/MenCategory';

// Lazy-loaded Admin Components
const Dashboard = lazy(() => import('./pages/AdminComponents/Dashboard'));
const Overview = lazy(() => import('./pages/AdminComponents/Overview'));
const Order = lazy(() => import('./pages/AdminComponents/Order'));
const Users = lazy(() => import('./pages/AdminComponents/Users'));
const Settings = lazy(() => import('./pages/AdminComponents/Settings'));
const ProductList = lazy(() => import('./pages/AdminComponents/ProductList'));
const CreateProduct = lazy(() => import('./pages/AdminComponents/AddProduct'));
const CreateCategory = lazy(() => import('./pages/AdminComponents/AddCategory'));
const UpdateProduct = lazy(() => import('./pages/AdminComponents/EditProduct'))
const Analytics = lazy(() => import('./pages/AdminComponents/Analytics'));
const ViewOrder = lazy(() => import('./pages/AdminComponents/OrderView'));
const Transaction = lazy(() => import('./pages/AdminComponents/Transaction'));
const Cart = lazy(() => import('./pages/OrderComponents/Cart'));
const Checkout = lazy(() => import('./pages/OrderComponents/Checkout'));
const Payments = lazy(() => import('./pages/OrderComponents/Payments'));
const OrderConfirmation = lazy(() => import('./pages/OrderComponents/ThankYou'));
const WishList = lazy(() => import('./pages/OrderComponents/WishList'));
const ClientOrders = lazy(() => import('./pages/ClientComponents/ClientOrder'));
const ClientOrderView = lazy(() => import('./pages/ClientComponents/ClientOrderView'));


export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AdminProvider>
          <ToastContainer position="top-center" autoClose={3000} theme="dark" />

          <Routes>
            {/* Public routes with navbar and footer */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="*" element={<NoPage />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="profile" element={<Profile />} />
              <Route path="productdetail/:slug" element={<DetailProduct />} />
              <Route path="category/:slug" element={<MenCategory />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="payments" element={<Payments />} />
              <Route path="order_confirmation" element={<OrderConfirmation />} />
              <Route path="wishlist" element={<WishList />} />
              <Route path="client_order" element={<ClientOrders />} />
              <Route path="client_order_view/:id" element={<ClientOrderView />} />
            </Route>

            {/* Admin Routes in Suspense */}
            <Route
              path="/dashboard"
              element={
                <Suspense fallback={<div className="text-center text-white p-10">Loading...</div>}>
                  <Dashboard />
                </Suspense>
              }
            >
              <Route
                index
                element={
                  <Suspense fallback={<div className="text-center text-white p-10">Loading...</div>}>
                    <Overview />
                  </Suspense>
                }
              />
              <Route path="order" element={<Suspense fallback={<div>Loading...</div>}><Order /></Suspense>} />
              <Route path="users" element={<Suspense fallback={<div>Loading...</div>}><Users /></Suspense>} />
              <Route path="settings" element={<Suspense fallback={<div>Loading...</div>}><Settings /></Suspense>} />
              <Route path="products" element={<Suspense fallback={<div>Loading...</div>}><ProductList /></Suspense>} />
              <Route path="analytics" element={<Suspense fallback={<div>Loading...</div>}><Analytics /></Suspense>} />
              <Route path="order_view/:id" element={<Suspense fallback={<div>Loading...</div>}><ViewOrder /></Suspense>} />
              <Route path="add_product" element={<Suspense fallback={<div>Loading...</div>}><CreateProduct /></Suspense>} />
              <Route path="add_category" element={<Suspense fallback={<div>Loading...</div>}><CreateCategory /></Suspense>} />
              <Route path="edit_product/:slug" element={<Suspense fallback={<div>Loading...</div>}><UpdateProduct /></Suspense>} />
              <Route path="transactions" element={<Suspense fallback={<div>Loading...</div>}><Transaction /></Suspense>} />
              
            </Route>
          </Routes>
        </AdminProvider>
      </CartProvider>
    </BrowserRouter>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
