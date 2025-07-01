import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import './App.css';

// Static imports (smaller components)
import Layout from './pages/NavComponents/Layout';
import Home from './pages/HomeComponents/Home';
import NoPage from './pages/HomeComponents/NoPage';
import Login from './pages/NavComponents/Login';
import DetailProduct from './pages/ProductComponents/DetailProduct';

// Lazy-loaded Admin Components
const Dashboard = lazy(() => import('./pages/AdminComponents/Dashboard'));
const Overview = lazy(() => import('./pages/AdminComponents/Overview'));
const Order = lazy(() => import('./pages/AdminComponents/Order'));
const Users = lazy(() => import('./pages/AdminComponents/Users'));
const Settings = lazy(() => import('./pages/AdminComponents/Settings'));
const ProductList = lazy(() => import('./pages/AdminComponents/ProductList'));
const Analytics = lazy(() => import('./pages/AdminComponents/Analytics'));
const ViewOrder = lazy(() => import('./pages/AdminComponents/OrderView'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="text-center text-white p-10">Loading...</div>}>
        <Routes>
          {/* Public routes with navbar and footer */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<NoPage />} />
            <Route path="login" element={<Login />} />
            <Route path="productdetail" element={<DetailProduct />} />
          </Route>

          {/* Admin dashboard routes without navbar/footer */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Overview />} />
            <Route path="order" element={<Order />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="products" element={<ProductList />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="order_view" element={<ViewOrder />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
