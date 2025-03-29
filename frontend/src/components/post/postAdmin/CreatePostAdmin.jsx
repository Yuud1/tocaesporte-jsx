import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importe o useNavigate
import '../styles/createPost.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Substituído import.meta.env por process.env

const CreatePostAdmin = () => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [actor, setActor] = useState('');
  const [urlimage, setUrlImage] = useState('');
  const [description, setContent] = useState('');
  const [imageSource, setImageSource] = useState('');
  const [category, setSection] = useState('main');

  const navigate = useNavigate(); // Inicialize o hook useNavigate

  const handlePostSubmit = () => {
    if (!title || !subtitle || !actor || !description || !urlimage || !imageSource) {
      alert('Por favor, preencha todos os campos antes de enviar.');
      return;
    }

    const postData = {
      title,
      subtitle,
      actor,
      description,
      category,
      urlimage,
      imageSource,
    };

    axios
      .post(`${API_BASE_URL}/artigo/`, postData)
      .then((response) => {
        alert('Post criado com sucesso!');
        console.log('Post criado:', response.data);
        navigate('/postsAdmin'); // Redireciona para a rota /postsAdmin
      })
      .catch((error) => {
        console.error('Erro ao criar o post:', error);
        alert('Erro ao criar o post.');
      });
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'color',
    'background',
    'list',
    'bullet',
    'link',
    'image',
    'video',
  ];

  return (
    <div className="create-post">
      <h1>Criação de Post</h1>
      <input
        type="text"
        className="input-title"
        placeholder="Digite o título aqui..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        className="input-subtitle"
        placeholder="Digite o subtítulo aqui..."
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
      />
      <input
        type="text"
        className="input-author"
        placeholder="Digite o nome do autor..."
        value={actor}
        onChange={(e) => setActor(e.target.value)}
      />
      <div className="image-url">
        <label htmlFor="image-url-input"></label>
        <input
          id="image-url-input"
          type="text"
          className="input-url"
          placeholder="Insira a URL da imagem..."
          value={urlimage}
          onChange={(e) => setUrlImage(e.target.value)}
        />
        {urlimage && (
          <div className="image-preview">
            <img src={urlimage} alt="Prévia da imagem" style={{ maxWidth: '100%', marginTop: '10px' }} />
          </div>
        )}
      </div>
      <input
        type="text"
        className="input-imageSource"
        placeholder="Digite a autoria da imagem"
        value={imageSource}
        onChange={(e) => setImageSource(e.target.value)}
      />
      <div className="section-dropdown">
        <label htmlFor="section-select"></label>
        <select
          id="section-select"
          value={category}
          onChange={(e) => setSection(e.target.value)}
        >
          <option>Selecione uma categoria</option>
          <option value="futebol_internacional">Futebol Internacional</option>
          <option value="futebol_nacional">Futebol Nacional</option>
          <option value="futebol_regional">Futebol Regional</option>
          <option value="volei">Volei</option>
          <option value="tenis">Tenis</option>
          <option value="basquete">Basquete</option>
        </select>
      </div>
      <ReactQuill
        theme="snow"
        value={description}
        onChange={setContent}
        modules={modules}
        formats={formats}
        placeholder="Escreva o conteúdo da matéria aqui..."
      />
      <button className="submit-button" onClick={handlePostSubmit}>
        Publicar Post
      </button>
    </div>
  );
};

export default CreatePostAdmin;