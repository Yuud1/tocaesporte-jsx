import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/editPost.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Substituído import.meta.env por process.env

const EditPostUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    id: 0,
    title: '',
    subtitle: '',
    actor: '',
    description: '',
    urlimage: '',
    imageSource: '',
    category: '',
  });
  const [loading, setLoading] = useState(true);

  // Lista de categorias com valores reais e nomes amigáveis
  const categories = [
    { value: '', label: '-' },
    { value: 'futebol_internacional', label: 'Futebol Internacional' },
    { value: 'futebol_nacional', label: 'Futebol Nacional' },
    { value: 'futebol_regional', label: 'Futebol Regional' },
    { value: 'volei', label: 'Vôlei' },
    { value: 'tenis', label: 'Tênis' },
    { value: 'basquete', label: 'Basquete' },
  ];

  // Carregar os dados do post atual
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/artigo/${id}`)
      .then((response) => {
        setPost(response.data.artigo);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        alert('Erro ao carregar o post.');
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => (prevPost ? { ...prevPost, [name]: value } : prevPost));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => (prevPost ? { ...prevPost, [name]: value } : prevPost));
  };

  const handleQuillChange = (value) => {
    setPost((prevPost) => (prevPost ? { ...prevPost, description: value } : prevPost));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !post.description ||
      !post.title ||
      !post.subtitle ||
      !post.actor ||
      !post.urlimage ||
      !post.category ||
      !post.imageSource
    ) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    if (!post) return;

    axios
      .put(`${API_BASE_URL}/artigo/update/${id}`, {
        title: post.title,
        subtitle: post.subtitle,
        actor: post.actor,
        description: post.description,
        urlimage: post.urlimage,
        imageSource: post.imageSource,
        category: post.category, // Valor real (com underscores)
      })
      .then(() => {
        alert('Post atualizado com sucesso!');
        navigate('/postsUser');
      })
      .catch(() => {
        alert('Erro ao atualizar o post.');
      });
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!post) {
    return <p>Post não encontrado.</p>;
  }

  return (
    <div className="edit-post">
      <h1>Editar Post</h1>
      <form onSubmit={handleSubmit} className="edit-post-form">
        <div className="form-group">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            name="title"
            value={post.title || ''}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="subtitle">Subtítulo</label>
          <input
            type="text"
            id="subtitle"
            name="subtitle"
            value={post.subtitle || ''}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="actor">Autor</label>
          <input
            type="text"
            id="actor"
            name="actor"
            value={post.actor || ''}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descrição</label>
          <ReactQuill
            value={post.description || ''}
            onChange={handleQuillChange}
            theme="snow"
          />
        </div>
        <div className="form-group">
          <label htmlFor="urlimage">URL da Imagem</label>
          <input
            type="text"
            id="urlimage"
            name="urlimage"
            value={post.urlimage || ''}
            onChange={handleInputChange}
            required
          />
          <div>
            {post.urlimage && (
              <img src={post.urlimage} alt="Imagem preview" style={{ maxWidth: '100%', marginTop: '10px' }} />
            )}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="imageSource">Fonte da Imagem</label>
          <input
            type="text"
            id="imageSource"
            name="imageSource"
            value={post.imageSource || ''}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Categoria</label>
          <select
            id="category"
            name="category"
            value={post.category || ''}
            onChange={handleSelectChange}
            required
          >
            {categories.map((category, index) => (
              <option key={index} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="edit-btn">
          Salvar
        </button>
        <button
          type="button"
          onClick={() => navigate('/postsUser')}
          className="edit-btn"
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default EditPostUser;