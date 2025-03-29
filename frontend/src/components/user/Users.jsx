import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../headerDashboard';
import './styles/user.css';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Substituído import.meta.env por process.env

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  // Buscar usuários da API
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/user/`)
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error('Erro ao buscar usuários:', error);
      });
  }, []);

  // Deletar usuário com confirmação
  const handleDelete = (id) => {
    const confirmation = window.confirm(
      'Tem certeza que deseja excluir este usuário? Essa ação não pode ser desfeita.'
    );

    if (!confirmation) {
      return; // Se o usuário cancelar, interrompe a exclusão
    }    
    
    axios
      .delete(`${API_BASE_URL}/user/${id}`)
      .then(() => {
        // Atualizar o estado removendo o usuário deletado
        alert("Usuário excluido com sucesso")
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        window.location.href = "/users"
      })
      .catch((error) => {
        console.error('Erro ao excluir o usuário:', error);
      });
  };

  return (
    <div className="users">
      <Header />
      <div className="usersPrincipal">
        <h1>Usuários</h1>
        <button onClick={() => navigate('/create-user')} className="create-user-btn">
          Criar Novo Usuário
        </button>
        <ul className="users-grid">
          {users.map((user) => (
            <li key={user.id} className="user-item">
              <h2>
                {user.user} ({user.access})
              </h2>
              <p>Email: {user.email}</p>
              <div className="user-actions">
                <button onClick={() => handleDelete(user._id)}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Users;