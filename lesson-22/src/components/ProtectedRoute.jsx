import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Auth } from './data';

function ProtectedRoute({ children }) {
  const isAuth = Auth.isAuthenticated(); 
  const location = useLocation(); 

  if (isAuth) {
    return children;
  }
  
  // Якщо не авторизований, редірект на сторінку логіну
  // Передаємо поточний шлях в state, щоб після логіну повернутись сюди
  return (
    <Navigate 
      to="/login" 
      replace 
      state={{ from: location }} 
    />
  );
}

export default ProtectedRoute;





