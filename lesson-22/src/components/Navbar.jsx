import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // NavLink для active класу
import { Auth } from './data';

function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = Auth.isAuthenticated();
  const currentUser = Auth.getUser();

  const handleLogout = () => {
    Auth.logout();
    navigate('/login', { replace: true }); // Переходимо на логін після виходу
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <NavLink to="/" end>Головна</NavLink> {/* `end` для точного співпадіння */}
        <NavLink to="/products">Каталог</NavLink>
        <NavLink to="/admin">Адмін-панель</NavLink>
        
        {isAuthenticated ? (
          <>
            <span style={{color: 'white', marginLeft: 'auto', marginRight: '10px'}}>Привіт, {currentUser}!</span>
            <button onClick={handleLogout}>Вийти</button>
          </>
        ) : (
          <NavLink to="/login" style={{marginLeft: 'auto'}}>Увійти</NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;