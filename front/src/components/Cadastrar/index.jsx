import './styles.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/apiClient';
 

const Cadastrar = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const [error, setError] = useState('');
  const [user, setUser] = useState([]);

  const navigate = useNavigate()

  async function handleCadastrar(e){
    e.preventDefault();

   try {

    if(name === '' || email === '' || password === '') {
      alert("Preencha os dados")
      return
    }
   
      const response = await api.post('/user', {
        name,
        email,
        password
      })
      
      if(response.status === 200){
          const {name, email, password} = response.data
        console.log("Cadastrado com sucesso")
          navigate('/')
      }else {
        console.error("Erro ao cadastrar ", response.statusText)
      }

    console.log(name)
   } catch (error) {
    console.log('Erro ao cadastrar')
   }
  }

  return (
    <div className="login-container">
      <h2>Cadastrar</h2>
      {error && <p>{error}</p>} 
      <form onSubmit={handleCadastrar}>
        <div className="form-group">
          <input
            className="input-field"
            placeholder="Digite seu nome de usuário"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <button className="submit-button" type="submit">Cadastrar</button>
        <Link to="/">Já possui Cadastro? Faça o login</Link>
      </form>
    </div>
  );
};

export default Cadastrar;
