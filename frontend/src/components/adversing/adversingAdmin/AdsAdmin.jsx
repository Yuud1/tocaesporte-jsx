import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../headerDashboard'; // Componente do cabeçalho
import '../styles/ads.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Substituído import.meta.env por process.env

const AdsAdmin = () => {
  const navigate = useNavigate();
  const [mainAds, setMainAds] = useState([]);
  const [sidebarAds, setSidebarAds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Buscar anúncios principais e laterais
  useEffect(() => {
    const fetchAds = async () => {
      try {
        setIsLoading(true);

        const [mainAdsResponse, sidebarAdsResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/propagandatopo/listar`),
          axios.get(`${API_BASE_URL}/propaganda/listar`),
        ]);

        setMainAds(Array.isArray(mainAdsResponse.data) ? mainAdsResponse.data : []);
        setSidebarAds(Array.isArray(sidebarAdsResponse.data) ? sidebarAdsResponse.data : []);
      } catch (err) {
        console.error('Erro ao buscar propagandas:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAds();
  }, []);

  // Função para deletar um anúncio
  const handleDeleteAd = async (id, isMainAd) => {
    if (!window.confirm('Tem certeza que deseja excluir esta propaganda?')) {
      return;
    }

    try {
      const endpoint = isMainAd
        ? `${API_BASE_URL}/propagandatopo/delete/${id}`
        : `${API_BASE_URL}/propaganda/delete/${id}`;

      await axios.delete(endpoint);

      // Atualiza a lista removendo o item excluído
      if (isMainAd) {
        setMainAds((prev) => prev.filter((ad) => ad.id !== id));
      } else {
        setSidebarAds((prev) => prev.filter((ad) => ad.id !== id));
      }
    } catch (error) {
      setError('Erro ao excluir a propaganda.');
      console.error('Erro ao excluir propaganda:', error);
    }
  };

  return (
    <div className="ads">
      <Header />

      <div className="adsPrincipal">
        <h1>Propagandas</h1>
        <button onClick={() => navigate('/create-ad-admin')} className="create-ad-btn">
          Criar Nova Propaganda
        </button>

        {isLoading && <p>Carregando propagandas...</p>}
        {error && <p className="error">{error}</p>}

        <div className="main-ads">
          <h2>Propagandas Principais</h2>
          <ul className="ads-list">
            <div className='ad-grid'>
            {mainAds.length > 0 ? (
              mainAds.map((ad) => (
                <li key={ad.id} className="ad-item">
                  <h3>{ad.title}</h3>
                  <p>{ad.description}</p>
                  {ad.urlimage && <img src={ad.urlimage} alt={ad.title} className="ad-image" />}
                  <div className="ad-actions">
                    <button onClick={() => handleDeleteAd(ad.id, true)}>Excluir</button>
                  </div>
                </li>
              ))
            ) : (
              <p>Sem propagandas principais para mostrar</p>
            )}
            </div>
          </ul>
        </div>

        <div className="sidebar-ads">
          <h2>Propagandas Laterais</h2>
          <ul className="ads-list">
            <div className='ad-grid'>
            {sidebarAds.length > 0 ? (
              sidebarAds.map((ad) => (
                <li key={ad.id} className="ad-item">
                  <h3>{ad.title}</h3>
                  <p>{ad.description}</p>
                  {ad.urlimage && <img src={ad.urlimage} alt={ad.title} className="ad-image" />}
                  <div className='ad-actions'>
                  <button onClick={() => handleDeleteAd(ad.id, false)}>Excluir</button>
                  </div>
                </li>
              ))
              
            ) : (
              <p>Sem propagandas laterais para mostrar</p>
            )}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdsAdmin;