import React, { useEffect, useState } from 'react';
import '../styles/adMain.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Substituído import.meta.env por process.env

const AdMain = () => {
  const [adData, setAdData] = useState(null);

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/propagandatopo/listar`);

        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Dados recebidos da API:', data);

        if (data.length > 0) {
          const randomAd = data[Math.floor(Math.random() * data.length)];
          setAdData(randomAd);
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchAdvertisements();
  }, []);

  if (!adData) {
    return null; // Não renderiza nada se não houver anúncios
  }

  return (
    <div className="container-advertising">
      <div className="advertising-item">
        <div className="image-container">
          <img
            src={adData.urlimage}
            alt={adData.title}
            className="advertising-image"
          />
        </div>

        <div className="info-container">
          <h2 className="advertising-title">{adData.title}</h2>
          <p className="advertising-description">{adData.subtitle}</p>
          <div className="divider-line"></div>
          <div className="redirecionamento">
            <h3 className="advertising-enterprise">{adData.enterprise}</h3>
            <a
              href={adData.site}
              target="_blank"
              rel="noopener noreferrer"
              className="advertising-link"
            >
              Saiba Mais &gt;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdMain;