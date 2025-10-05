import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container">
      <h1>Ласкаво просимо до Симулятора Каталогу Продуктів!</h1>
      <p>Це демонстраційний додаток, який показує роботу з маршрутизацією в React Router v6.</p>
      <p>Ви можете:</p>
      <ul>
        <li>Переглядати продукти в <Link to="/products">Каталозі</Link> з фільтрацією та сортуванням.</li>
        <li>Переходити на <Link to="/products/LAP001">Деталі продукту</Link> за SKU.</li>
        <li>Спробувати доступ до <Link to="/admin">Адмін-панелі</Link>, яка захищена.</li>
        <li>Додавати нові продукти після <Link to="/login">логіну</Link>.</li>
      </ul>
      <p>Для логіну використовуйте будь-який логін та пароль 'password'.</p>
    </div>
  );
}

export default Home;