import React from 'react';
import whatsIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

const TeacherItem: React.FC = () => {
  return (
    <article className="teacher-item">
        <header>
            <img src="https://avatars3.githubusercontent.com/u/52502727?s=460&u=20d8fd7c0856631cbd5ba7c2876bb726a49cce02&v=4" alt="Arthur"/>
            <div>
                <strong>Arthur Ramires</strong>
                <span>Ciência de Dados</span>
            </div>
        </header>

        <p>
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        <br /><br />
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        </p>

        <footer>
        <p>
            Preço/hora
            <strong>R$ 80,00</strong>
        </p>
        <button type="button">
            <img src={whatsIcon} alt="Whatsapp"/>
            Entrar em contato
        </button>
        </footer>
    </article>
  );
}

export default TeacherItem;