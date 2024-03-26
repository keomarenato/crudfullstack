import prismaClient from '../../prisma'


interface ApRequest {
    nome: string;
    fone: number;
    cpf: number
    cep: string
    logradouro: string,
    numero: string,
    bairro: string
    localidade: string,
    uf: string
}
 
class CreateHotel {
  
  async execute({ nome, fone,cpf, cep, logradouro,numero, bairro, localidade, uf}: ApRequest) {
     
    const novoHotel = await prismaClient.hotel.create({
        data: {
          nome: nome,
          fone: fone,
          cpf: cpf,
          cep: cep,
          logradouro: logradouro,
          numero: numero,
          bairro: bairro,
          localidade: localidade,
          uf: uf
        }
      })
 

     
      return novoHotel;

    }  
  }
 

 

export default CreateHotel;