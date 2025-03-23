import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/headerDashboard'; // Importe o componente Header
import '../../../styles/dashboard.css';

const DashboardAdmin = () => {
  const navigate = useNavigate();

  // Verifica se o usuário é "admin" para acessar essa dashboard
  useEffect(() => {
    const acesso = localStorage.getItem('acesso');
    if (acesso !== 'admin') {
      navigate('/login'); // Redireciona para login caso não seja admin
    }
  }, [navigate]);

  const handleRedirect = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboardAdmin">
      {/* Header */}
      <Header />

      {/* Conteúdo principal */}
      <div>
        <h1 className="dashboard-title">Bem-vindo ao Dashboard Admin</h1>
        <div className="dashboard-buttons">
          <button onClick={() => handleRedirect('/')}>Home</button>
          <button onClick={() => handleRedirect('/users')}>Usuários</button>
          <button onClick={() => handleRedirect('/postsAdmin')}>Posts</button>
          <button onClick={() => handleRedirect('/adsAdmin')}>Propagandas</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;