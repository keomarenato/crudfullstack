
import { useEffect, useState } from 'react';
import './styles.css'
 
import { FaTrash } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import axios from 'axios';


const MostrarHotel = ({onEditClick}) => {
   
  const [hoteis, setHoteis] = useState([]);

  useEffect(() => {
    const fetchHoteis = async () => {
      try {
         const response = await axios.get('http://192.168.1.101:3333/hotel');

         setHoteis(response.data)        

      } catch (error) {
          console.error('Erro ao buscar hotéis:', error);
      }
    }
    fetchHoteis()
  }, [])

  const handleDelete = async (hotelId) => {
    try {
      await axios.delete(`http://192.168.1.101:3333/hotel/${hotelId}`);
      const deletedUser = hoteis.filter(hotel => hotel.id !== hotelId)
      // setHoteis(prevHoteis => prevHoteis.filter(hotel => hotel.id !== hotelId));
      setHoteis(deletedUser)
    } catch (error) {
      console.error('Erro ao excluir hotel:', error);
    }
  };

  return (
    <div className="lista-hoteis">
      <h2>Lista dos Usuários</h2>
      <div className="row">
        <div className="col-md-2">
          <h5>Nome:</h5>
        </div>
        <div className="col-md-2">
          <h5>CPF:</h5>
        </div>
        <div className="col-md-2">
          <h5>Telefone:</h5>
        </div>
        <div className="col-md-2">
          <h5>CEP:</h5>
        </div>
        <div className="col-md-2">
          <h5>Rua:</h5>
        </div>
        <div className="col-md-2">
          <h5>Numero:</h5>
        </div>
        <div className="col-md-2">
          <h5>Bairro:</h5>
        </div>
        <div className="col-md-1">
          <h5>Cidade:</h5>
        </div>
        <div className="col-md-1">
          <h5>UF:</h5>
        </div>
      </div>

      {hoteis.map((usuario) => (
        
        <div  key={`usuario-${usuario.id}`}className="hotel-item">

          <div className="row">
            <div className="col-md-2">
              <p>{usuario.nome}</p>
              
            </div>
            <div className="col-md-2">
              <p>{usuario.cpf}</p>
            </div>
            <div className="col-md-2">
              <p>{usuario.fone}</p>
            </div>
            <div className="col-md-2">
              <p>{usuario.cep}</p>
            </div>
            <div className="col-md-2">
              <p>{usuario.logradouro}</p>
            </div>
            <div className="col-md-2">
              <p>{usuario.numero}</p>
            </div>
            <div className="col-md-2">
              <p>{usuario.bairro}</p>
            </div>
            <div className="col-md-1">
              <p>{usuario.localidade}</p>
            </div>
            <div className="col-md-1">
              <p>{usuario.uf}</p>
            </div>
          </div>
          <button className='buttonEditar' onClick={() => onEditClick(usuario)}> <FaEdit /></button>
          <button className='buttonExcluir' onClick={() => handleDelete(usuario.id)}><FaTrash /></button>

        </div>
        
      ))}
     
    </div>

  )

}
export default MostrarHotel