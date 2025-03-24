import React from 'react';
import { FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__about">
          <h2>Sobre Nós</h2>
          <p>
            Somos dedicados a oferecer as melhores informações e serviços aos
            nossos usuários. Sua satisfação é nossa prioridade!
          </p>
        </div>
        <div className="footer__links">
          <h2>Links Úteis</h2>
          <ul>
            <li>
              <Link to="/sobre">Sobre</Link>
            </li>
            <li>
              <Link to="/termos">Termos de Uso</Link>
            </li>
            <li>
              <Link to="/privacidade">Política de Privacidade</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>

        <div className="footer__social">
          <h2>Redes Sociais</h2>
          <div className="social-icons">
            <a
              href="https://www.instagram.com/tocaesporte/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>
      <div className="divider-line-footer"></div>
      <div className="footer__bottom">
        <div className="enderecoFooter">
          <p>
            <span>endereço:</span> Quadra ACSE 11 Rua Se 7, Sn Conj 02 Lote 29, 77020022 - Palmas -TO
          </p>
        </div>
        <div>
          <p>
            layout e desenvolvimento{' '}
            <a href="https://www.instagram.com/hatcorp/" target="_blank" rel="noopener noreferrer">
              <span>Hatcorp</span>
            </a>
            <br /> tocaesporte 2025 | todos os direitos reservados.
          </p>
        </div>
        <div className="razaoSocialFooter">
          <p>
            <span>razão social:</span> Agência de publicidade Jotasete LTDA.
            <br />
            cnpj: 20.161.775/0001-56
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;