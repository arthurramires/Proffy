import React from 'react';
import checkIcon from '../../assets/images/Feito.svg';
import './styles.css';
import { Link } from 'react-router-dom';

const SingnUpConcluded: React.FC = () => {
  return (
      <div id="container">
          <main>
              <img src={checkIcon} alt="Ícone de conclusão"/>
              <h1>Cadastro concluído</h1>
              <span>
                    Agora você faz parte da plataforma da Proffy.<br />
                    Tenha uma ótima experiência.
              </span>

              <Link to="/">
                  Fazer Login
              </Link>
          </main>
      </div>
  );
}

export default SingnUpConcluded;