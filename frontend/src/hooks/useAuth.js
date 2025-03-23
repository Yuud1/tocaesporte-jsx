import { useState, useEffect } from 'react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // Estado para armazenar o tipo de usuário
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const acesso = localStorage.getItem('acesso');

    if (acesso === 'admin' || acesso === 'user') {
      setIsAuthenticated(true);
      setUserRole(acesso); // Define o tipo de usuário
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
    }

    setLoading(false);
  }, []);

  return { isAuthenticated, userRole, loading }; // Retorna o papel do usuário
};

export default useAuth;