import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/alsoItem.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const AlsoItem = ({ currentCategory, currentNewsId }) => {
  const [relatedNews, setRelatedNews] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/artigo/`)
      .then((response) => {
        const filteredNews = response.data.artigos
          .filter(
            (news) =>
              news.category === currentCategory && news.id !== currentNewsId
          )
          .slice(0, 3); // Limita a 3 notícias
        setRelatedNews(filteredNews);
      })
      .catch((error) => {
        console.error('Erro ao buscar notícias relacionadas:', error);
      });
  }, [currentCategory, currentNewsId]);

  return (
    <div className="container also-container">
      <h2 className="related-news-title">Notícias Relacionadas</h2>
      <div className="also-grid-container">
        {relatedNews.map((news) => (
          <div key={news._id} className="also-item">
            <Link to={`/news/${news._id}`} state={{ post: news }}>
              <img src={news.urlimage} alt={news.title} />
              <h3>{news.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlsoItem;