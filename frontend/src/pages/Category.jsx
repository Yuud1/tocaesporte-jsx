import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '../components/header';
import AdMain from '../components/adMain';
import '../styles/category.css';
import Footer from '../components/footer';

function Category() {
  const location = useLocation();
  const { posts } = location.state || { posts: [] }; // Removida a tipagem  
  const [loading, setLoading] = useState(false);
  const [visibleCount] = useState(6); // Exibir 6 posts por vez

  useEffect(() => {
    setLoading(true);
    // Simula o carregamento
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [posts]);

  return (
    <div>
      <Header />
      <AdMain />
      <div className="container news-grid-container">
        {loading ? (
          <p>Carregando...</p>
        ) : (
          posts.length > 0 ? (
            posts.slice(0, visibleCount).map((post) => (
              <div key={post._id} className="news-item">
                <Link to={`/news/${post._id}`} state={{ post }}>
                  <img src={post.urlimage} alt={post.title} />
                  <h3>{post.title}</h3>
                </Link>
              </div>
            ))
          ) : (
            <div>Nenhum post encontrado.</div>
          )
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Category;