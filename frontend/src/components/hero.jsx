import React, { useEffect, useState, useRef } from 'react';
import Header from './header';
import '../styles/hero.css';
import 'swiper/swiper-bundle.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from './footer';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Substituído import.meta.env por process.env

const Hero = () => {
  const [heroData, setHeroData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [category] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);
  const [propagandaImages, setPropagandaImages] = useState([]);
  const [randomPropagandas, setRandomPropagandas] = useState([]);    
  
  const swiperRef = useRef(null);

  const fetchNews = async (category = '') => {
    try {
      setLoading(true);
      let url = `${API_BASE_URL}/artigo/`;
      if (category) {
        url = `${API_BASE_URL}/artigo/category/${category}`;
      }
      const response = await axios.get(url);      
      
      if (response.status === 200) {
        const latestNews = response.data.artigos.slice(-3);
        setNewsData(latestNews);
        const remainingNews = response.data.artigos.slice(0, -3).reverse();
        setHeroData(remainingNews);
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPropaganda = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/propaganda/listar`);
      if (response.status === 200) {
        setPropagandaImages(response.data.anuncios);
      }
    } catch (error) {
      console.error('Erro ao buscar propagandas:', error);
    }
  };

  const stripHtmlTags = (htmlString) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  useEffect(() => {
    fetchNews();
    fetchPropaganda();
  }, []);

  useEffect(() => {
    if (category) {
      fetchNews(category);
    }
  }, [category]);

  const handleShowMore = () => {
    setVisibleCount(visibleCount + 6);
  };

  // Define as propagandas randomicamente apenas uma vez, quando as propagandas são carregadas
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

    // Posiciona corretamente ao carregar a página
    positionImages();

    // Atualiza a posição conforme o scroll
    window.addEventListener('scroll', positionImages);

    return () => {
      window.removeEventListener('scroll', positionImages);
    };
  }, [randomPropagandas]);

  // Atualiza o Swiper quando os dados são carregados
  useEffect(() => {
    if (swiperRef.current && newsData.length > 0) {
      swiperRef.current.update();
    }
  }, [newsData]);

  return (
    <div className="main-container">
      <Header />

      {/* Imagens flutuantes */}      
      {randomPropagandas.length > 0 && (
        <>
          <div className="floating-image-container">
            <img src={randomPropagandas[0].urlimage} alt="Propaganda" className="floating-image" />
          </div>
          <div className="floating-image-container-right">
            <img src={randomPropagandas[0].urlimage} alt="Propaganda" className="floating-image-right" />
          </div>
        </>
      )}

      <div className="heroMain">
        <div className="container">
          {/* Renderiza o Swiper apenas se houver dados */}
          {newsData.length > 0 && (
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              loop={true}
            >
              {newsData.map((newsItem) => {
                const cleanDescription = stripHtmlTags(newsItem.description);

                // Limitar título a 55 caracteres
                const limitedTitle = newsItem.title.length > 55 ? newsItem.title.slice(0, 90) + '...' : newsItem.title;

                return (
                  <SwiperSlide key={newsItem.id}>
                    <Link to={`/news/${newsItem.id}`} state={{ post: newsItem }}>
                      <div className="swiper-slide-content">
                        <img src={newsItem.urlimage} alt={newsItem.title} className="heroImage" />
                        <div className="blur-overlay"></div>
                        <div className="slide-title">
                          <h2>{limitedTitle}</h2>
                          <p className="slide-description">
                            {cleanDescription.length > 100
                              ? `${cleanDescription.substring(0, 100)}...`
                              : cleanDescription}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </div>
      </div>

      <div className="container news-grid-container">
        {loading ? (
          <p>Carregando...</p>
        ) : (
          heroData.slice(0, visibleCount).map((news) => (
            <div key={news.id} className="news-item">
              <Link to={`/news/${news.id}`} state={{ post: news }}>
                <img src={news.urlimage} alt={news.title} />
                <h3>{news.title}</h3>
              </Link>
            </div>
          ))
        )}
      </div>

      {heroData.length > visibleCount && (
        <div className="show-more-container">
          <button onClick={handleShowMore} className="show-more-btn">
            Mostrar Mais
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Hero;