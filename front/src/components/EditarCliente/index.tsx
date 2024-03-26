import React, { useState } from 'react';
import axios from 'axios';

const EditarHotel = ({ hotel, onEdit }) => {
  const [nome, setNome] = useState(hotel.nome);
  const [endereco, setEndereco] = useState(hotel.endereco);
  const [fone, setFone] = useState(hotel.fone);
  const [cpf, setCpf] = useState(hotel.cpf);

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    
    try {
      const dadosAtualizados = { nome, endereco, fone, cpf };
      await axios.put(`http://192.168.1.101:3333/hotel/${hotel.id}`, dadosAtualizados);
      onEdit(hotel.id, dadosAtualizados);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome</label>
        <input
          type='text'
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>
      <div>
        <label>Endereço</label>
        <input
          type='text'
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
        />
      </div>
      <div>
        <label>Fone</label>
        <input
          type='text'
          value={fone}
          onChange={(e) => setFone(e.target.value)}
        />
      </div>
      <div>
        <label>CPF</label>
        <input
          type='text'
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />
      </div>
      <button type='submit'>Salvar</button>
    </form>
  );
};

export default EditarHotel;
