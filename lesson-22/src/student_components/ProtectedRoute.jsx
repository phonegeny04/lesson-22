import React from 'react';
// [ЗАВДАННЯ 4.1]: Імпортуйте Navigate та useLocation
import { Auth } from '../data';

function ProtectedRoute({ children }) {
  const isAuth = Auth.isAuthenticated(); 
  // [ЗАВДАННЯ 4.2]: Ініціалізуйте useLocation
  const location = null; // ЗАМІНИТИ

  if (isAuth) {
    return children;
  }
  
  // [ЗАВДАННЯ 4.3]: Повернути компонент <Navigate> з параметрами
  return (
    0 // видаліть цей рядок
  );
}

export default ProtectedRoute;