import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import './styles/privacidade.css';

const Privacidade = () => {
  return (
    <>
      <Header />
      <div className="politica-container">
        <div className="politica-content">
          <h1>Política de Privacidade</h1>
          <p>
            A sua privacidade é importante para nós. Esta Política de Privacidade explica como coletamos, usamos e protegemos as suas informações pessoais quando você utiliza nossa plataforma e nossos serviços. Ao acessar ou utilizar nossos serviços, você concorda com as práticas descritas nesta política.
          </p>

          <h2>1. Informações Coletadas</h2>
          <p>
            Coletamos informações pessoais que você nos fornece diretamente, como nome, e-mail e outras informações necessárias para a utilização de nossos serviços. Também podemos coletar informações automaticamente, como dados de navegação e cookies, para melhorar a sua experiência.
          </p>

          <h2>2. Uso das Informações</h2>
          <p>
            Usamos as informações coletadas para fornecer e melhorar nossos serviços, personalizar sua experiência, e para comunicar com você sobre atualizações e promoções. Também utilizamos as informações para fins de segurança, como detectar fraudes e garantir a proteção de sua conta.
          </p>

          <h2>3. Compartilhamento de Informações</h2>
          <p>
            Não vendemos suas informações pessoais a terceiros. Podemos compartilhar suas informações com parceiros e prestadores de serviços que auxiliam na operação da nossa plataforma, mas sempre de acordo com os termos desta política. Também podemos divulgar suas informações quando exigido por lei.
          </p>

          <h2>4. Segurança das Informações</h2>
          <p>
            Implementamos medidas de segurança para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhum método de transmissão de dados pela Internet ou armazenamento eletrônico é 100% seguro, por isso, não podemos garantir total segurança.
          </p>

          <h2>5. Cookies</h2>
          <p>
            Utilizamos cookies para melhorar a sua experiência de navegação. Os cookies ajudam a lembrar suas preferências e a personalizar o conteúdo mostrado. Você pode optar por desabilitar os cookies nas configurações do seu navegador, mas isso pode afetar a funcionalidade de algumas partes do nosso site.
          </p>

          <h2>6. Seus Direitos</h2>
          <p>
            Você tem o direito de acessar, corrigir ou excluir suas informações pessoais que mantemos. Para exercer esses direitos, entre em contato conosco através do e-mail indicado abaixo.
          </p>

          <h2>7. Alterações na Política</h2>
          <p>
            Podemos atualizar esta Política de Privacidade periodicamente. Sempre que houver mudanças significativas, publicaremos a nova versão nesta página e atualizaremos a data da última modificação.
          </p>

          <h2>8. Contato</h2>
          <p>
            Se você tiver alguma dúvida ou preocupação sobre nossa Política de Privacidade, entre em contato conosco através do e-mail: 
            <a href="mailto:tocaesporte7@gmail.com"> tocaesporte7@gmail.com</a>.
          </p>

          <p>
            Ao utilizar nossos serviços, você concorda com a coleta e o uso das informações de acordo com esta Política de Privacidade.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Privacidade;