import React from 'react';
import { Link } from 'react-router-dom';
import { Auth } from './data';

function AdminDashboard() {
  const currentUser = Auth.getUser();

  return (
    <div className="container">
      <h1>Адмін-панель</h1>
      <p>Вітаємо, {currentUser}! Ви маєте доступ до адміністрування продуктів.</p>

      <div className="admin-dashboard-widgets">
        <div className="widget-card">
          <h3>Керування продуктами</h3>
          <p>Додавайте, редагуйте або видаляйте продукти.</p>
          <Link to="/admin/add-product" className="btn-success" style={{ textDecoration: 'none', display: 'inline-block' }}>
            Додати новий продукт
          </Link>
        </div>
        <div className="widget-card">
          <h3>Статистика (Демо)</h3>
          <p>Загальна кількість продуктів: <strong>{Auth.isAuthenticated() ? '8+' : '-'}</strong></p>
          <p>Нових за тиждень: <strong>{Auth.isAuthenticated() ? '2' : '-'}</strong></p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;