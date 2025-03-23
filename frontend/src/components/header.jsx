import React, { useState, useEffect } from 'react';
import '../styles/header.css';
import logo from '../assets/images/logo.png';
import palmas from '../assets/images/palmas.png';
import brasil from '../assets/images/brasil.jpg';
import hamburguer from '../assets/icons/hamburguer.png';
import basqueteIcon from '../assets/icons/variante-de-bola-de-basquete.png';
import listrasIcon from '../assets/images/listras.png';
import voleiIcon from '../assets/icons/volei.png';
import tenisIcon from '../assets/icons/raquete-de-tenis.png';
import regionalIcon from '../assets/icons/pontos.png';
import internacionalIcon from '../assets/icons/marketing-global.png';
import nacionalIcon from '../assets/icons/brasil.png';
import { FiChevronDown, FiSearch } from 'react-icons/fi';
import { FaInstagram } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import axios from 'axios';

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
};

const sanitizeHtml = (html) => {
  return DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
};

// Dropdown Component
const Dropdown = ({ title, isOpen, toggle, items, handleCategory }) => {
  const handleItemClick = (category) => {
    handleCategory(category);
  };

  return (
    <div className="dropdown">
      <button
        className="dropdown-button"
        onClick={(e) => {
          e.stopPropagation();
          toggle();
        }}
      >
        {title} <FiChevronDown size={14} />
      </button>
      <div
        className={`dropdown-menu ${isOpen ? 'open' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => handleItemClick(item.category)}
            className="btn-primary dropdown-item"
          >
            <img src={item.icon} alt={`${item.label} icon`} className="dropdown-icon" />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// Hook de debounce
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchResultsVisible, setIsSearchResultsVisible] = useState(false); // Estado para controlar a visibilidade dos resultados
  const navigate = useNavigate();

  const debouncedSearchTerm = useDebounce(searchTerm, 300); // Debounce de 300ms

  // Função que alterna a abertura do dropdown
  const handleToggleDropdown = (dropdownName) => {
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  // Função para buscar artigos por categoria
  const handleCategory = async (category) => {
    try {
      const response = await axios.get(`http://localhost:8080/artigo/category/${category}`);
      navigate('/Category', { state: { posts: response.data } });
    } catch (error) {
      console.error(`Erro ao buscar posts da categoria ${category}`, error);
      setError('Erro ao carregar posts da categoria. Tente novamente.');
    }
  };

  // Função para buscar artigos por termo de pesquisa
  const handleSearch = async (term) => {
    if (term) {
      try {
        const response = await axios.get(`http://localhost:8080/artigo/buscar?description=${term}`);
        setSearchResults(response.data);
        setIsSearchResultsVisible(true); // Mostrar os resultados da pesquisa
      } catch (error) {
        console.error('Erro ao buscar artigos:', error);
        setError('Erro ao buscar artigos. Tente novamente.');
      }
    } else {
      setSearchResults([]); // Limpa os resultados se o termo estiver vazio
      setIsSearchResultsVisible(false); // Esconder os resultados da pesquisa
    }
  };

  // Função para fechar os resultados da pesquisa
  const closeSearchResults = () => {
    setIsSearchResultsVisible(false);
  };

  // Efeito para buscar artigos quando o termo de pesquisa debounced muda
  useEffect(() => {
    handleSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  // Fechar dropdowns e resultados da pesquisa ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target;
      if (!target.closest('.dropdown-menu') && !target.closest('.dropdown-button')) {
        setOpenDropdown(null);
      }
      if (!target.closest('.search-bar') && !target.closest('.search-results')) {
        closeSearchResults();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const esportesItems = [
    { label: 'Basquete', icon: basqueteIcon, category: 'basquete' },
    { label: 'Vôlei', icon: voleiIcon, category: 'volei' },
    { label: 'Tênis', icon: tenisIcon, category: 'tenis' },
  ];

  const futebolItems = [
    { label: 'Internacional', icon: internacionalIcon, category: 'futebol_internacional' },
    { label: 'Nacional', icon: nacionalIcon, category: 'futebol_nacional' },
    { label: 'Regional', icon: regionalIcon, category: 'futebol_regional' },
  ];

  return (
    <>
      <header className="header">
        <div className="header__left">
          <Link to="/">
            <img src={logo} alt="Logo do site" className="logo" />
          </Link>
        </div>
        <div className="header__center">
          <Dropdown
            title="Esportes"
            isOpen={openDropdown === 'esportes'}
            toggle={() => handleToggleDropdown('esportes')}
            items={esportesItems}
            handleCategory={handleCategory}
          />
          <Dropdown
            title="Futebol"
            isOpen={openDropdown === 'futebol'}
            toggle={() => handleToggleDropdown('futebol')}
            items={futebolItems}
            handleCategory={handleCategory}
          />
          <div className="search-bar">
            <FiSearch size={20} color="white" />
            <input
              type="text"
              placeholder="Buscar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={() => {
                if (searchTerm) {
                  setIsSearchResultsVisible(true); // Reabre os resultados se houver um termo de pesquisa
                }
              }}
            />
            
            {isSearchResultsVisible && searchResults.length > 0 && (
              <div className="search-results">
                {searchResults.map((result) => (
                  <div key={result.id} className="search-result-item">
                    <Link
                      to={`/news/${result.id}`}
                      state={{ post: result }}
                      className="search-result-link"
                      onClick={closeSearchResults} // Fechar os resultados ao clicar em uma notícia
                    >
                      <img 
                        src={result.urlimage} 
                        alt={result.title} 
                        className="search-result-image" 
                      />
                      <div className="search-result-content">
                        <h3>{result.title}</h3>
                        <p>{truncateText(sanitizeHtml(result.description), 150)}</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="header__right">
          <div className="icons-social">
            <a
              href="https://www.instagram.com/tocaesporte/"
              target="_blank"
              aria-label="Instagram"
            >
              <FaInstagram size={24} color="white" />
            </a>
          </div>
          <div className="icons-bandeiras">
            <img src={palmas} alt="Bandeira de Palmas" className="bandeiras" />
            <img src={brasil} alt="Bandeira do Brasil" className="bandeiras" />
          </div>
        </div>
        <img
          src={hamburguer}
          alt="Ícone de hambúrguer"
          className="hamburger-icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        <img src={listrasIcon} alt="Ícone de listras" className="corner-image" />
        <img src={listrasIcon} alt="Ícone de listras" className="corner-image-two" />
      </header>

      <div
        className={`menu-overlay ${isMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      ></div>

      <nav className={`menu-hamburger ${isMenuOpen ? 'open' : ''}`}>
        <Dropdown
          title="Esportes"
          isOpen={openDropdown === 'esportes'}
          toggle={() => handleToggleDropdown('esportes')}
          items={esportesItems}
          handleCategory={handleCategory}
        />
        <Dropdown
          title="Futebol"
          isOpen={openDropdown === 'futebol'}
          toggle={() => handleToggleDropdown('futebol')}
          items={futebolItems}
          handleCategory={handleCategory}
        />
      </nav>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
    </>
  );
};

export default Header;