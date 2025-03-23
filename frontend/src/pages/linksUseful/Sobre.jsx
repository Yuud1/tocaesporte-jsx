import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import './styles/sobre.css';

const Sobre = () => {
  return (
    <>
      <Header />
      <div className="sobre-container">
        <div className="sobre-content">
          <h1>Sobre Nós</h1>
          <p>
            Bem-vindo à nossa plataforma! Somos uma equipe dedicada a oferecer soluções inovadoras e de qualidade.
            Nossa missão é melhorar a experiência do usuário e entregar serviços e produtos que atendam às suas
            necessidades com eficiência e cuidado.
          </p>

          <h2>1. Nossa História</h2>
          <p>
            A nossa jornada começou há alguns anos, com o objetivo de criar uma plataforma que pudesse conectar
            pessoas e oferecer soluções de forma simples e eficaz. Desde então, crescemos e ampliamos nossos
            serviços, sempre com o foco no usuário e na inovação.
          </p>

          <h2>2. Nossa Missão</h2>
          <p>
            Nossa missão é oferecer produtos e serviços que resolvam problemas reais de nossos clientes, com
            um atendimento excepcional e o compromisso com a qualidade.
          </p>

          <h2>3. Nossa Visão</h2>
          <p>
            Buscamos ser líderes em nosso setor, reconhecidos pela excelência no que fazemos e pela maneira
            como impactamos positivamente a vida das pessoas.
          </p>

          <h2>4. Nossos Valores</h2>
          <ul>
            <li>Inovação constante</li>
            <li>Qualidade acima de tudo</li>
            <li>Responsabilidade e transparência</li>
            <li>Foco no cliente</li>
          </ul>

          <h2>5. Equipe</h2>
          <p>
            Nossa equipe é composta por profissionais apaixonados pelo que fazem, sempre dispostos a aprender,
            crescer e entregar o melhor aos nossos clientes.
          </p>

          <h2>6. Entre em Contato</h2>
          <p>
            Se você tiver alguma dúvida ou quiser saber mais sobre nossa empresa, entre em contato conosco:
            <a href="mailto:tocaesporte7@gmail.com"> tocaesporte7@gmail.com</a>.
          </p>

          <p>
            Agradecemos pela sua visita e esperamos poder atender às suas expectativas!
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Sobre;