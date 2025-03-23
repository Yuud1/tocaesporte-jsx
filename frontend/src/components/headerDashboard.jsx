import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/images/logo3.png'; // Ajuste o caminho conforme necessário
import '../styles/dashboard.css'; // Ajuste o caminho conforme necessário

const Header = ({ onLogout }) => {
  const navigate = useNavigate();

  // Adiciona a classe ao body quando o componente é montado
  useEffect(() => {
    document.body.classList.add('no-padding');

    // Remove a classe quando o componente é desmontado
    return () => {
      document.body.classList.remove('no-padding');
    };
  }, []);

  // Função padrão para logout
  const handleLogout = () => {
    const confirmLogout = window.confirm('Tem certeza que deseja deslogar?');
    if (confirmLogout) {
      localStorage.removeItem('acesso'); // Remove o acesso do localStorage
      navigate('/login'); // Redireciona para a página de login
    }
  };

  // Função para redirecionar com base no tipo de acesso
  const handleLogoClick = () => {
    const acesso = localStorage.getItem('acesso'); // Obtém o tipo de acesso
    if (acesso === 'admin') {
      navigate('/dashboardAdmin'); // Redireciona para o dashboardAdmin
    } else if (acesso === 'user') {
      navigate('/dashboardUser'); // Redireciona para o dashboardUser
    } else {
      navigate('/login'); // Se não houver acesso, redireciona para o login
    }
  };

  return (
    <header className="dashboard-header">
      {/* Link para redirecionar com base no tipo de acesso */}
      <div onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        <img src={Logo} alt="Logo" />
      </div>
      <button onClick={onLogout || handleLogout}>Deslogar</button>
    </header>
  );
};

export default Header;