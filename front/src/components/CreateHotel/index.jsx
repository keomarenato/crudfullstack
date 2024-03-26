import { useEffect, useState } from 'react'

import './styles.css'
import axios from 'axios';
import MostrarHotel from '../MostraHotel';
import { Link } from 'react-router-dom';


const CadastroHotel = () => {
    
    const [hotel, setHotel] = useState([]);

    const [nome, setNome] = useState('');
    const [fone, setFone] = useState('');
    const [cpf, setCpf] = useState('');
    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [localidade, setLocalidade] = useState('');
    const [uf, setUf] = useState('');


    const [hotelEditando, setHotelEditando] = useState(null);

    const [usuarioSelecionadoId, setUsuarioSelecionadoId] = useState(null);



    const [isOpen, setIsOpen] = useState(false)


    // Abrir modal
    const openModal = () => {
        setIsOpen(true)
        handleSubmit()
    }

    // Fechar modal
    const closeModal = () => {
        setIsOpen(false)
        setHotelEditando(false)

    }


    //Listar os usuarios cadastrados
    useEffect(() => {
        const fetchHotels = async () => {
            const responseHotels = await axios.get("http://192.168.1.101:3333/hotel");
            const hotelsData = responseHotels.data;
            setHotel(hotelsData);

        };

        fetchHotels();

    }, []);


    //Cadastrar usuario
    const handleSubmit = async () => {
        try {
            const novoHotel = {
                nome,
                fone: parseFloat(fone),
                cpf: parseFloat(cpf),
                cep,
                logradouro,
                numero,
                bairro,
                localidade,
                uf,
            };

            const responseHotel = await axios.post('http://192.168.1.101:3333/hotel', novoHotel);
            const novoHotelData = responseHotel.data;

            // Atualize a lista de hotéis usando o estado `hotel` e o `useState`
            setHotel([...hotel, novoHotelData]);

            // Limpe os campos do formulário
            setNome("");
            setFone("");
            setCpf("");
            setLogradouro("");
            setNumero('')
            setBairro("");
            setLocalidade("");
            setUf("");

            console.log(hotel);
            closeModal();


        } catch (error) {
            console.log(error);
        }
    };

    const handleCepChange = async (e) => {
        const novoCep = e.target.value;
        setCep(novoCep);

        try {
            const responseCep = await axios.get(`https://viacep.com.br/ws/${novoCep}/json/`);
            const enderecoCep = responseCep.data

            setLogradouro(enderecoCep.logradouro)
            setBairro(enderecoCep.bairro)
            setLocalidade(enderecoCep.localidade)
            setUf(enderecoCep.uf)


        } catch (error) {
            console.log("Erro ao cadastrar cep", error)
        }

    }


    const handleEdit = async () => {
        if (usuarioSelecionadoId) {
            try {
                const hotelAtualizado = {
                    nome: nome,
                    fone: parseFloat(fone),
                    cpf: parseFloat(cpf),
                    cep: cep,
                    logradouro: logradouro,
                    numero: numero,
                    bairro: bairro,
                    localidade: localidade,
                    uf: uf
                };
    
                const response = await axios.put(`http://192.168.1.101:3333/hotel/${usuarioSelecionadoId}`, hotelAtualizado);
                
                // Verifique se a atualização foi bem-sucedida
                if (response.status === 200) {
                    // Atualize o estado do hotel com os dados atualizados
                    const hotelAtualizado = response.data;
                    const novosHoteis = hotel.map(h => h.id === usuarioSelecionadoId ? hotelAtualizado : h);
                    setHotel(novosHoteis);
                    
                    // Limpe os campos do formulário e feche o modal
                    setNome('');
                    setFone('');
                    setCpf('');
                    setCep('');
                    setLogradouro('');
                    setNumero('')
                    setBairro('');
                    setLocalidade('');
                    setUf('');
                    setUsuarioSelecionadoId(null);
                    closeModal();
                } else {
                    console.error('Erro ao editar hotel:', response.data.error);
                }
            } catch (error) {
                console.error('Erro ao editar hotel:', error);
            }
        } else {
            console.error('Nenhum hotel selecionado para edição.');
        }
    };
    
    const handleEditClick = (hotel) => {
        setUsuarioSelecionadoId(hotel.id);
        setNome(hotel.nome || '');
        setFone(hotel.fone ? hotel.fone.toString() : '');
        setCpf(hotel.cpf ? hotel.cpf.toString() : '');
        setCep(hotel.cep || '');
        setLogradouro(hotel.logradouro || '');
        setNumero(hotel.numero || '');
        setBairro(hotel.bairro || '');
        setLocalidade(hotel.localidade || '');
        setUf(hotel.uf || '');
        setHotelEditando(true); // Define que estamos editando um hotel
        openModal();
    };


    return (
        <div>
            <Link to='/'>Logout</Link>
        <div className='cadastro-apartamento-container'>
            
            <button className='buttonModal' onClick={openModal}>Cadastro de Usuario</button>

            {isOpen && (
                <div className='modal-overlay'>
                    <div className='formularioContainer'>
                        <span className="close" onClick={closeModal}>&times;</span>
                        <div className='modal'></div>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div>
                                <label>Nome</label>
                                <input
                                    type='text'
                                    id='numero'
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                />
                            </div>

                            <div>
                                <label>Telefone</label>
                                <input
                                    type='number'
                                    id='numero'
                                    value={fone}
                                    onChange={(e) => setFone(e.target.value)}
                                />
                            </div>

                            <div>
                                <label>CPF</label>
                                <input
                                    type='number'
                                    id='numero'
                                    value={cpf}
                                    onChange={(e) => setCpf(e.target.value)}
                                />
                            </div>

                            <div>
                                <label>CEP</label>
                                <input
                                    type='text'
                                    id='numero'
                                    value={cep}
                                    onChange={handleCepChange}
                                />
                            </div>

                            <div>
                                <label>Rua</label>
                                <input
                                    type='text'
                                    id='numero'
                                    value={logradouro}
                                    onChange={(e) => setLogradouro(e.target.value)}
                                />
                            </div>
                            
                            <div>
                                <label>Numero</label>
                                <input
                                    type='text'
                                    id='numero'
                                    value={numero}
                                    onChange={(e) => setNumero(e.target.value)}
                                />
                            </div>

                            <div>
                                <label>Bairro</label>
                                <input
                                    type='text'
                                    id='numero'
                                    value={bairro}
                                    onChange={(e) => setBairro(e.target.value)}
                                />
                            </div>

                            <div>
                                <label>Cidade</label>
                                <input
                                    type='text'
                                    id='numero'
                                    value={localidade}
                                    onChange={(e) => setLocalidade(e.target.value)}
                                />
                            </div>

                            <div>
                                <label>UF</label>
                                <input
                                    type='text'
                                    id='numero'
                                    value={uf}
                                    onChange={(e) => setUf(e.target.value)}
                                />
                            </div>

                            <button type='submit'>Cadastrar Hotel</button>
                        </form>

                    </div>
                </div>
            )}

            <MostrarHotel
                hotel={hotel}
                onEditClick={handleEditClick}
 
            />

            {hotelEditando && (
                <div className='modal-overlay'>
                    <div className='formularioContainer'>
                        <div className='modal'></div>
                        <span className="close" onClick={closeModal}>X</span>
                        <form onSubmit={handleEdit}>
                            <div>
                                <label>Nome</label>
                                <input
                                    type='text'
                                    id='numero'
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Telefone</label>
                                <input
                                    type='number'
                                    id='numero'
                                    value={fone}
                                    onChange={(e) => setFone(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>CPF</label>
                                <input
                                    type='number'
                                    id='numero'
                                    value={cpf}
                                    onChange={(e) => setCpf(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>CEP</label>
                                <input
                                    type='text'
                                    id='numero'
                                    value={cep}
                                    onChange={handleCepChange}
                                />
                            </div>

                            <div>
                                <label>Rua</label>
                                <input
                                    type='text'
                                    id='numero'
                                    value={logradouro}
                                    onChange={(e) => setLogradouro(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Numero</label>
                                <input
                                    type='text'
                                    id='numero'
                                    value={numero}
                                    onChange={(e) => setNumero(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Bairro</label>
                                <input
                                    type='text'
                                    id='numero'
                                    value={bairro}
                                    onChange={(e) => setBairro(e.target.value)}
                                />
                            </div>

                            <div>
                                <label>Cidade</label>
                                <input
                                    type='text'
                                    id='numero'
                                    value={localidade}
                                    onChange={(e) => setLocalidade(e.target.value)}
                                />
                            </div>

                            <div>
                                <label>UF</label>
                                <input
                                    type='text'
                                    id='numero'
                                    value={uf}
                                    onChange={(e) => setUf(e.target.value)}
                                />
                            </div>
                            <button type='submit'>Salvar Edição</button>
                        </form>
                    </div>
                </div>
            )}
          </div>  
        </div>
    );
};

export default CadastroHotel