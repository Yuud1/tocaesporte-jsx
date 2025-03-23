import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importe o useNavigate

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Pegando a URL da API do .env

const CreateAdUser = () => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [redirectLink, setRedirectLink] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [placement, setPlacement] = useState("main");

  const navigate = useNavigate();

  const handleAdSubmit = async () => {
    // Validações específicas
    if (placement === "main" && (!title || !redirectLink || !company || !description)) {
      alert("Por favor, preencha todos os campos para a Propaganda Principal.");
      return;
    }

    if (placement === "sidebar" && !imageUrl) {
      alert("Por favor, insira o link da imagem para a Propaganda Lateral.");
      return;
    }

    // Dados para enviar à API
    const adData = {
      title: placement === "main" ? title : undefined, // Enviar title se for Propaganda Principal
      subtitle: placement === "main" ? description : undefined, // Usar description como subtitle
      urlimage: imageUrl, // urlimage é obrigatório para ambos os tipos
      enterprise: placement === "main" ? company : undefined, // enterprise (empresa) apenas na Propaganda Principal
      site: placement === "main" ? redirectLink : undefined, // site (link de redirecionamento) apenas na Propaganda Principal
    };

    // Definir a URL com base no tipo de propaganda
    const url =
      placement === "main"
        ? `${API_BASE_URL}/propagandatopo/criar`
        : `${API_BASE_URL}/propaganda/criar`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adData),
      });

      if (response.ok) {
        alert("Propaganda criada com sucesso!");
        navigate("/adsUser");
        // Limpar formulário após sucesso
        setTitle("");
        setImageUrl("");
        setRedirectLink("");
        setCompany("");
        setDescription("");
        setPlacement("main");
      } else {
        const errorData = await response.text();
        console.error("Erro da API:", errorData);
        alert(`Erro ao criar propaganda: ${errorData}`);
      }
    } catch (error) {
      alert("Ocorreu um erro ao conectar com a API.");
      console.error("Erro:", error);
    }
  };

  return (
    <div className="create-ad">
      <h1>Criação de Propaganda</h1>

      {/* Dropdown para selecionar o tipo de propaganda */}
      <div className="placement-dropdown">
        <select
          id="placement-select"
          value={placement}
          onChange={(e) => setPlacement(e.target.value)}
          className="input-select"
        >
          <option value="main">Propaganda Principal</option>
          <option value="sidebar">Propaganda Lateral</option>
        </select>
      </div>

      {/* Campo para o link da imagem */}
      <div className="image-url">
        <input
          id="image-url-input"
          className="input-imageUrl"
          type="text"
          placeholder="Digite o link da imagem..."
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>

      {/* Campos específicos para Propaganda Principal */}
      {placement === "main" && (
        <>
          <input
            type="text"
            className="input-title"
            placeholder="Digite o título da propaganda..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            className="input-link"
            placeholder="Digite o link de redirecionamento..."
            value={redirectLink}
            onChange={(e) => setRedirectLink(e.target.value)}
          />

          <input
            type="text"
            className="input-company"
            placeholder="Digite o nome da empresa..."
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          <textarea
            className="input-description"
            placeholder="Escreva uma breve descrição..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </>
      )}

      <button className="submit-button" onClick={handleAdSubmit}>
        Publicar Propaganda
      </button>
    </div>
  );
};

export default CreateAdUser;
