import './styles.css';
import React, { useState, useContext } from 'react';
import {setCookie} from 'nookies'
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/apiClient';
 
 

const Login = () => {
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [user, setUser] = useState([]);
  const [error, setError] = useState('');

 

  const navigate = useNavigate()

 async function handleLogin(e){
  e.preventDefault();

  try {
      
  if(email === '' || password === '') {
    alert("Preencha os dados")
    return
  }

    const response = await api.post('/session', {
      email,
      password
    })

    const {id, name, token} = response.data
      
    setCookie(undefined, '@nextauth.token', token, {
      maxAge: 60 * 60 * 24 * 30,
      path: '/'
    })
    
    setUser({id, name, email})

    api.defaults.headers['Authorization'] = `Bearer ${token}`

    if (token) {
      navigate('/cadastro-hotel');
    } else {
      console.error('Token não foi armazenado corretamente.');
    }

    } catch (err) {
      console.log('erro ao acessar', err)
      setError("Erro se fizer o login")
    }
 }

  return (
    <div className="login-container">
      <h2>Logar</h2>
      {error && <p>{error}</p>} 
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <input
            className="input-field"
            placeholder="Digite seu email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
          />
        </div>
        <div className="form-group">
          <input
            className="input-field"
            placeholder="Digite sua senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            
          />
        </div>
        <button className="submit-button" type="submit">Login</button>
        <Link to="/cadastro-user">Não tem cadastro? Cadastra-se</Link>
      </form>
    </div>
  );
};

export default Login;
