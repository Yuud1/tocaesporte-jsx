import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/header';
import AdvertisingMain from '../components/adMain';
import Footer from '../components/footer';
import AlsoItem from '../components/alsoItem';
import DOMPurify from 'dompurify';
import '../styles/news.css';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Substituído import.meta.env por process.env

// Função para formatar a data no formato amigável
const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

// Função para gerar slugs a partir do título
const generateSlug = (title) => {
  return title
    .toLowerCase() // Converte para minúsculas
    .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/--+/g, '-'); // Remove hífens duplicados
};

const News = () => {
  const { id } = useParams(); // Recebe o ID da URL
  const { state } = useLocation(); // Estado da navegação (se houver)
  const navigate = useNavigate(); // Hook para navegação programática
  const [selectedItem, setSelectedItem] = useState(null);
  const [propagandaImages, setPropagandaImages] = useState([]);
  const [randomPropagandas, setRandomPropagandas] = useState([]);

  // Busca os detalhes da notícia
  useEffect(() => {
    if (state?.post) {
      setSelectedItem(state.post);
      // Atualiza a URL com o slug do título
      const slug = generateSlug(state.post.title);
      navigate(`/news/${state.post.id}/${slug}`, { replace: true });
    } else {
      axios
        .get(`${API_BASE_URL}/artigo/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          setSelectedItem(response.data);
          // Atualiza a URL com o slug do título
          const slug = generateSlug(response.data.title);
          navigate(`/news/${id}/${slug}`, { replace: true });
        })
        .catch((error) => {
          console.error('Erro ao buscar dados da notícia:', error);
        });
    }
  }, [id, state, navigate]);

  // Busca as propagandas
  const fetchPropaganda = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/propaganda/listar`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        setPropagandaImages(response.data);
      }
    } catch (error) {
      console.error('Erro ao buscar propagandas:', error);
    }
  };

  useEffect(() => {
    fetchPropaganda();
  }, []);

  // Define as propagandas randomicamente apenas uma vez
  useEffect(() => {
    if (propagandaImages.length > 0) {
      if (propagandaImages.length === 1) {
        setRandomPropagandas([propagandaImages[0], propagandaImages[0]]);
      } else {
        const randomIndexLeft = Math.floor(Math.random() * propagandaImages.length);
        let randomIndexRight = Math.floor(Math.random() * propagandaImages.length);

        while (randomIndexRight === randomIndexLeft) {
          randomIndexRight = Math.floor(Math.random() * propagandaImages.length);
        }

        setRandomPropagandas([propagandaImages[randomIndexLeft], propagandaImages[randomIndexRight]]);
      }
    }
  }, [propagandaImages]);

  // Efeito para a animação das propagandas ao rolar a página
  useEffect(() => {
    const positionImages = () => {
      const imageLeft = document.querySelector('.floating-image');
      const imageRight = document.querySelector('.floating-image-right');

      if (imageLeft) {
        const scrollTop = window.scrollY;
        imageLeft.style.transform = `translate(-50%, ${scrollTop * 0.5}px)`;
      }
      if (imageRight) {
        const scrollTop = window.scrollY;
        imageRight.style.transform = `translate(50%, ${scrollTop * 0.5}px)`;
      }
    };

    positionImages();
    window.addEventListener('scroll', positionImages);

    return () => {
      window.removeEventListener('scroll', positionImages);
    };
  }, [randomPropagandas]);

  if (!selectedItem) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <Header />
      <AdvertisingMain />

      {/* Imagens flutuantes */}
      {randomPropagandas.length > 0 && (
        <>
          <div className="floating-image-news">
            <img src={randomPropagandas[0]?.urlimage} alt="Propaganda" className="floating-image" />
          </div>
          <div className="floating-image-container-right-news">
            <img src={randomPropagandas[1]?.urlimage} alt="Propaganda" className="floating-image-right" />
          </div>
        </>
      )}

      <div className="detail-page">
        <h1>{selectedItem.title}</h1>
        <h4 className="subtitle">{selectedItem.subtitle}</h4>
        <h5 className="author">Por: {selectedItem.actor}</h5>
        <h5 className="posted-at">
          Publicado em: {formatDate(selectedItem.dateCreatetion)}
        </h5>
        <div className="divider-line"></div>
        <img
          className="detail-image"
          src={selectedItem.urlimage}
          alt={selectedItem.title}
        />
        <h5 className="imageSource">Por: {selectedItem.imageSource}</h5>
        <div
          className="descricao"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(selectedItem.description),
          }}
        />
      </div>

      <AlsoItem
        currentCategory={selectedItem.category}
        currentNewsId={selectedItem.id}
      />

      <Footer />
    </>
  );
};

export default News;