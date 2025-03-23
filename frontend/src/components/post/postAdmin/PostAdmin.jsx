import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../headerDashboard'; // Importe o Header
import '../styles/post.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Substituído import.meta.env por process.env

const PostAdmin = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  // Buscar posts da API
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/artigo/listar`)
      .then((response) => {
        setPosts(response.data.reverse()); // Inverte a ordem dos posts
      })
      .catch((error) => {
        console.error('Erro ao buscar posts:', error);
      });
  }, []);

  const handleDelete = (id) => {
    const confirmation = window.confirm(
      'Tem certeza que deseja excluir este post? Essa ação não pode ser desfeita.'
    );

    if (!confirmation) {
      return; // Se o usuário cancelar, interrompe a exclusão
    }

    axios
      .delete(`${API_BASE_URL}/artigo/delete/${id}`)
      .then(() => {
        setPosts(posts.filter((post) => post.id !== id));
      })
      .catch((error) => {
        console.error('Erro ao excluir o post:', error);
      });
  };

  const handleEdit = (id) => {
    navigate(`/edit-post-admin/${id}`);
  };

  return (
    <div className="posts">
      <Header />
      <div className="postPrincipal">
        <h1>Posts</h1>
        <button onClick={() => navigate('/create-post-admin')} className="create-post-btn">
          Criar Novo Post
        </button>
        <div className="posts-grid">
          {posts.map((post) => (
            <div key={post.id} className="post-item">
              <img src={post.urlimage} alt={post.title} className="post-image" />
              <h2>{post.title}</h2>
              <h3 className="post-subtitle">{post.subtitle}</h3>
              <p>{post.content}</p>
              <div className="post-actions">
                <button onClick={() => handleEdit(post.id)}>Editar</button>
                <button onClick={() => handleDelete(post.id)}>Excluir</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostAdmin;