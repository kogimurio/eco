import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/HomeComponents/Home';
import Layout from './pages/NavComponents/Layout';
import NoPage from './pages/HomeComponents/NoPage';
import Login from './pages/NavComponents/Login'
import './App.css';
import DetailProduct from './pages/ProductComponents/DetailProduct';
import Dashboard from './pages/AdminComponents/Dashboard';
import Order from './pages/AdminComponents/Order';
import Overview from './pages/AdminComponents/Overview';
import Users from './pages/AdminComponents/Users';
import Settings from './pages/AdminComponents/Settings';
import ProductList from './pages/AdminComponents/ProductList';
import Analytics from './pages/AdminComponents/Analytics';


export default function App() {
  return (
    <BrowserRouter>
    {/* Routes with navbar and footer */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="*" element={<NoPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/productdetail" element={<DetailProduct />} />
        </Route>
        {/* Routes without navbar and footer */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Overview />} /> {/* Optional if you want default cards */}
          <Route path="order" element={<Order />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
          <Route path="products" element={<ProductList />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

