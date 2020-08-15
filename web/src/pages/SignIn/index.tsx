import React, { useState, useEffect, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'
import './styles.css'
import Input from '../../components/Input';
import { useAuth } from '../../hooks/auth';

function SignIn() {
    const { signIn } = useAuth();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e: FormEvent){
        e.preventDefault();
        try {
            await signIn({
                email,
                password,
            });
            history.push('/landing');
        } catch (err){
            console.log(err);
            alert('Ocorreu um erro ao fazer o login, revise suas informações!');
        }
    }
  return (
    <div id="page-singin">
        <div className="side-content">
          {/* <img src={logoIMG} alt="Proffy" /> */}
        </div>
        <div className="form-content">
            <h1 className="title">Fazer Login</h1>
            <form onSubmit={handleSubmit}>
            <Input name="email" label="E-mail" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                <Input name="password" label="Senha" type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                <button type="submit">
                    Entrar
                </button>

                <footer>
                    <div className="footer-button-container">
                        <p className="signup-button-text">Não tem conta?</p>
                        <Link to="/signup" className="signup-button-text">Cadastre-se</Link>
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

export default SignIn;