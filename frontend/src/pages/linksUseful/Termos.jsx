import React from 'react';
import Header from '../../components/header';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer';
import './styles/termos.css';

const Termos = () => {
  return (
    <>
      <Header />
      <div className="termos-container">
        <div className="termos-content">
          <h1>Termos e Condições Gerais de Uso</h1>
          <p>
            Bem-vindo! A seguir, apresentamos a você (USUÁRIO) os Termos e Condições
            Gerais de Uso, documento que relaciona as principais regras a serem
            observadas por todos que acessam o nosso portal e utilizam ou adquirem
            conteúdo, serviços, licenças e/ou produtos oferecidos por nossa plataforma
            ou por uma das empresas do nosso grupo econômico. 
          </p>

          <p>
            Como condição para o acesso e uso das ofertas, o USUÁRIO deve ler
            atentamente as regras deste documento e da nossa{' '}
            <Link to="/privacidade">Política de Privacidade</Link>, e declarar estar plenamente ciente e de acordo com elas. 
            A aceitação dos termos pode ser realizada pelo simples uso do nosso portal
            ou qualquer um de nossos serviços.
          </p>

          <h2>1. Aceitação dos Termos</h2>
          <p>
            Ao utilizar este site, o USUÁRIO concorda em cumprir os termos estabelecidos
            neste documento. Caso o USUÁRIO não concorde com qualquer um dos termos
            descritos aqui, ele não deverá utilizar os serviços oferecidos.
          </p>

          <h2>2. Modificações dos Termos</h2>
          <p>
            Reservamo-nos o direito de alterar ou atualizar os Termos e Condições de Uso
            a qualquer momento, sem aviso prévio. A versão mais recente estará sempre
            disponível nesta página. O uso contínuo dos nossos serviços após tais
            modificações implica na aceitação dos novos termos.
          </p>

          <h2>3. Direitos e Responsabilidades</h2>
          <p>
            O USUÁRIO concorda em utilizar os serviços de forma responsável e em
            conformidade com as leis aplicáveis. O uso indevido dos serviços poderá
            resultar em suspensão ou cancelamento de acesso, conforme determinado por
            nossa equipe.
          </p>

          <h2>4. Propriedade Intelectual</h2>
          <p>
            Todos os direitos de propriedade intelectual, incluindo direitos autorais,
            marcas registradas e patentes, pertencem exclusivamente à nossa plataforma
            ou aos seus licenciantes. O conteúdo do site não poderá ser copiado,
            reproduzido, distribuído ou utilizado de qualquer forma sem a devida
            permissão.
          </p>

          <h2>5. Limitação de Responsabilidade</h2>
          <p>
            Não nos responsabilizamos por quaisquer danos diretos, indiretos, especiais ou
            consequenciais que possam ocorrer devido ao uso ou impossibilidade de uso
            do nosso site ou serviços, incluindo perda de dados ou lucros.
          </p>

          <h2>6. Política de Privacidade</h2>
          <p>
            A nossa Política de Privacidade rege como lidamos com os dados pessoais
            dos usuários. Para mais informações, consulte nossa{' '}
            <Link to="/privacidade">Política de Privacidade</Link>.
          </p>

          <h2>7. Uso de Cookies</h2>
          <p>
            Utilizamos cookies para melhorar a experiência do usuário em nosso site.
            Ao continuar navegando, você concorda com a nossa Política de Cookies.
          </p>

          <h2>8. Termos Adicionais</h2>
          <p>
            Para serviços específicos, podem ser aplicados termos adicionais. Estes
            termos estarão disponíveis no momento da utilização de cada serviço. A
            utilização desses serviços estará sujeita à aceitação dos termos adicionais.
          </p>

          <h2>9. Contato</h2>
          <p>
            Caso o USUÁRIO tenha dúvidas ou precise de mais informações sobre os
            Termos e Condições, entre em contato conosco através do nosso e-mail:
            <a href="mailto:tocaesporte7@gmail.com">tocaesporte7@gmail.com</a>.
          </p>

          <p>
            Ao acessar ou utilizar nossos serviços, o USUÁRIO confirma que leu, entendeu e
            concorda com todos os termos descritos neste documento.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Termos;