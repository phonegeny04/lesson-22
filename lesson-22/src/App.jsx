import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import LoginForm from './components/LoginForm';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './components/AdminDashboard';
import AddProductForm from './components/AddProductForm';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Каталог Продуктів з фільтрацією та сортуванням (useSearchParams) */}
        <Route path="/products" element={<ProductList />} />
        
        {/* Деталі Продукту (динамічний роут з useParams) */}
        <Route path="/products/:sku" element={<ProductDetail />} />
        
        {/* Форма Логіну */}
        <Route path="/login" element={<LoginForm />} />

        {/* Захищені Маршрути для Адмін-панелі */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/add-product" 
          element={
            <ProtectedRoute>
              <AddProductForm />
            </ProtectedRoute>
          } 
        />
        
        {/* 404 Сторінка не знайдена */}
        <Route path="*" element={
          <div className="container">
            <h1>404</h1>
            <p>Сторінка не знайдена.</p>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;

