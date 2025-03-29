import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../headerDashboard'; // Importe o Header
import '../styles/ads.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Substituído import.meta.env por process.env

const CreateAdUser = () => {
  const navigate = useNavigate();
  const [mainAds, setMainAds] = useState([]); // Inicializando como array vazio
  const [sidebarAds, setSidebarAds] = useState([]); // Inicializando como array vazio
  const [isLoading, setIsLoading] = useState(true); // Para controlar o carregamento
  const [error, setError] = useState(null); // Para armazenar erros

  // Buscar anúncios principais e laterais da API
  useEffect(() => {
    const fetchAds = async () => {
      try {
        setIsLoading(true);

        // Buscar anúncios principais
        const mainAdsResponse = await axios.get(`${API_BASE_URL}/propaganda/topo/listar`);
        if (Array.isArray(mainAdsResponse.data.anuncios)) {
          setMainAds(mainAdsResponse.data.anuncios);
        } else {
          console.error('A resposta das propagandas principais não é um array:', mainAdsResponse.data.message);
        }

        // Buscar anúncios laterais
        const sidebarAdsResponse = await axios.get(`${API_BASE_URL}/propaganda/listar`);
        if (Array.isArray(sidebarAdsResponse.data.anuncios)) {
          setSidebarAds(sidebarAdsResponse.data.anuncios);
        } else {
          console.error('A resposta das propagandas laterais não é um array:', sidebarAdsResponse.data.message);
        }
      } catch (err) {
        console.error('Erro ao buscar propagandas:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAds();
  }, []);

  // Deletar um anúncio com confirmação
  const handleDeleteAd = (id, isMainAd) => {
    const confirmation = window.confirm(
      'Tem certeza que deseja excluir esta propaganda? Essa ação não pode ser desfeita.'
    );

    if (!confirmation) {
      return; // Se o usuário cancelar, interrompe a exclusão
    }

    const endpoint = isMainAd
      ? `${API_BASE_URL}/propagandatopo/delete/${id}`
      : `${API_BASE_URL}/propaganda/delete/${id}`;

    axios
      .delete(endpoint)
      .then(() => {
        // Atualizar o estado removendo o anúncio deletado
        if (isMainAd) {
          setMainAds((prev) => prev.filter((ad) => ad._id !== id));
        } else {
          setSidebarAds((prev) => prev.filter((ad) => ad._id !== id));
        }
      })
      .catch((error) => {
        console.error('Erro ao excluir propaganda:', error);
        setError('Erro ao excluir a propaganda.');
      });
  };

  return (
    <div className="ads">
      <Header />
      <div className="adsPrincipal">
        <h1>Propagandas</h1>
        <button onClick={() => navigate('/create-ad-user')} className="create-ad-btn">
          Criar Nova Propaganda
        </button>

        {isLoading && <p>Carregando propagandas...</p>}
        {error && <p className="error">{error}</p>}

        <div className="main-ads">
          <h2>Propagandas Principais</h2>
          <ul className="ads-list">
            {mainAds.length > 0 ? (
              mainAds.map((ad) => (
                <li key={ad._id} className="ad-item">
                  <h3>{ad.title}</h3>
                  <p>{ad.description}</p>
                  {/* Exibindo a imagem */}
                  {ad.urlimage && <img src={ad.urlimage} alt={ad.title} className="ad-image" />}
                  <div className="ad-actions">
                    <button onClick={() => handleDeleteAd(ad._id, true)}>Excluir</button>
                  </div>
                </li>
              ))
            ) : (
              <p>Sem propagandas principais para mostrar</p>
            )}
          </ul>
        </div>

        <div className="sidebar-ads">
          <h2>Propagandas Laterais</h2>
          <ul className="ads-list">
            {sidebarAds.length > 0 ? (
              sidebarAds.map((ad) => (
                <li key={ad._id} className="ad-item">
                  <h3>{ad.title}</h3>
                  <p>{ad.description}</p>
                  {/* Exibindo a imagem */}
                  {ad.urlimage && <img src={ad.urlimage} alt={ad.title} className="ad-image" />}
                  <div className="ad-actions">
                    <button onClick={() => handleDeleteAd(ad._id, false)}>Excluir</button>
                  </div>
                </li>
              ))
            ) : (
              <p>Sem propagandas laterais para mostrar</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateAdUser;