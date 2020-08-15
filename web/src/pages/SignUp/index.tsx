import React, { useState, useEffect, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'
import './styles.css'
import Input from '../../components/Input';
import api from '../../services/api';

function SignUp() {
    const history = useHistory();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e: FormEvent){
        e.preventDefault();
        try {
            api.post('/users', {
                name,
                email,
                password,
            });
            history.push('/concluded');
        } catch (err){
            console.log(err);
            alert('Ocorreu um erro ao fazer o cadastro, revise suas informações!');
        }
    }
  return (
    <div id="page-signup">
        <div className="side-content">
          {/* <img src={logoIMG} alt="Proffy" /> */}
        </div>
        <div className="form-content">
            <div className="title-container">
                <h1 className="title">Cadastro</h1>
                <p className="form-content-description">Preencha os dados abaixo <br />para começar.</p>
            </div>
            <form onSubmit={handleSubmit}>
                <Input name="name" label="Nome" value={name} onChange={(e) => {setName(e.target.value)}}/>
                <Input name="email" label="E-mail" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                <Input name="password" label="Senha" type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                <button type="submit">
                    Concluir cadastro
                </button>

                <footer>
                    <div className="footer-button-container">
                        <p className="signup-button-text">Já tem conta?</p>
                        <Link to="/" className="signup-button-text">Faça seu login</Link>
                    </div>

                    <span>
                        É de graça
                        <img src={purpleHeartIcon} alt=""/>
                    </span>
                </footer>
            </form>

            
        </div>
    </div>
  );
}

export default SignUp;