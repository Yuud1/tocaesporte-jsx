import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/headerDashboard';
import '../../../styles/dashboard.css';

const DashboardUser = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se o usuário é "user" para acessar essa dashboard
    const acesso = localStorage.getItem('acesso');
    if (acesso !== 'user') {
      navigate('/login'); // Redireciona para login caso não seja user
    }

    // Adiciona a classe ao body
    document.body.classList.add('no-padding');
    // Remove a classe quando o componente for desmontado
    return () => {
      document.body.classList.remove('no-padding');
    };
  }, [navigate]);

  const handleRedirect = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('Tem certeza que deseja deslogar?');
    if (confirmLogout) {
      localStorage.removeItem('acesso');
      navigate('/login');
    }
  };

  return (
    <div className="dashboardUser">
      <Header />

      <div>
        <h1 className="dashboard-title">Bem-vindo ao Dashboard User</h1>
        <div className="dashboard-buttons">
          <button onClick={() => handleRedirect('/')}>Home</button>
          <button onClick={() => handleRedirect('/postsUser')}>Posts</button>
          <button onClick={() => handleRedirect('/adsUser')}>Propagandas</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;