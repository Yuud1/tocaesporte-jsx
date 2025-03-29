import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Substituído import.meta.env por process.env

const CreateUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '', // Alterado para "email" (corresponde ao campo no backend)
    user: '', // Alterado para "user" (corresponde ao campo no backend)
    access: 'user', // Alterado para "access" (corresponde ao campo no backend)
    password: '', // Alterado para "password" (corresponde ao campo no backend)
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação dos campos
    const { email, user, access, password } = formData;
    if (!email || !user || !access || !password) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    // Configuração do payload
    const userData = {
      email, // Alterado para "email"
      user, // Alterado para "user"
      access, // Alterado para "access"
      password, // Alterado para "password"
    };

    console.log('Dados enviados:', userData); // Verifique os dados no console

    // Envio da requisição
    axios
      .post(`${API_BASE_URL}/user/`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        alert('Usuário criado com sucesso!');
        navigate('/users');
      })
      .catch((error) => {
        console.error('Erro ao criar usuário:', error);
        if (error.response) {
          alert(`Erro do servidor: ${error.response.data.message}`);
        } else if (error.request) {
          alert('Erro de rede. Verifique a conexão ou a configuração do servidor.');
        } else {
          alert('Erro ao criar o usuário. Tente novamente.');
        }
      });
  };

  return (
    <div className="create-user">
      <h1>Criar Novo Usuário</h1>
      <form onSubmit={handleSubmit}>
        <select
          name="access" // Alterado para "access"
          value={formData.access}
          onChange={handleChange}
          required
          className="input-acess-users"
        >
          <option value="user">Usuário</option>
          <option value="admin">Administrador</option>
        </select>

        <input
          type="text"
          name="user" // Alterado para "user"
          value={formData.user}
          onChange={handleChange}
          required
          className="input-user-users"
          placeholder="Usuário:"
        />

        <input
          type="email"
          name="email" // Alterado para "email"
          value={formData.email}
          onChange={handleChange}
          required
          className="input-email-users"
          placeholder="Email:"
        />

        <input
          type="password"
          name="password" // Alterado para "password"
          value={formData.password}
          onChange={handleChange}
          required
          className="input-password-users"
          placeholder="Senha:"
        />
        <button type="submit" className="submit-button-user">Criar</button>
      </form>
    </div>
  );
};

export default CreateUser;