import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, userRole, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!isAuthenticated || !userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />; // Bloqueia acesso não autorizado
  }

  return children;
};

export default ProtectedRoute;