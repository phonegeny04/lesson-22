import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Auth } from '../data';

function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // [ЗАВДАННЯ 4.4]: Отримайте бажаний шлях 'from' зі state
  // Якщо state відсутній, використовуйте дефолтний шлях '/admin'
  const from = location.state?.from?.pathname || '/admin'; // ЗАЛИШИТИ АБО ПЕРЕПИСАТИ

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
        setError("Будь ласка, введіть логін та пароль.");
        return;
    }

    const isAuthenticated = Auth.login(username, password);

    if (isAuthenticated) {
        // [ЗАВДАННЯ 4.5]: Виконайте навігацію на змінну 'from', використовуючи replace: true
        navigate(from, { replace: true });
    } else {
        setError("Неправильний логін або пароль. Спробуйте 'admin'/'password'.");
    }
  };

  return (
    <div className="container">
      <h1>Вхід до Адмін-панелі</h1>
      <div className="admin-login-info">
        <p>Для демонстрації, будь-який логін з паролем: <strong>password</strong></p>
      </div>
      {error && <div className="message error">{error}</div>}
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
            <label htmlFor="username">Логін:</label>
            <input 
                type="text" 
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Введіть логін"
            />
        </div>
        <div className="form-group">
            <label htmlFor="password">Пароль:</label>
            <input 
                type="password" 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введіть пароль"
            />
        </div>
        <button type="submit" className="btn-primary">Увійти</button>
      </form>
    </div>
  );
}
export default LoginForm;