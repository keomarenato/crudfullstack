import prismaClient from "../../prisma";

interface HotelUpdateData {
 
    nome?: string;
    fone?: number;
    cpf?: number;
    cep?: string;
    logradouro?: string
    numero?: string
    bairro?: string
    localidade?: string
    uf?: string

  }

class EditarHotelService{
    async execute(id: number, newData: HotelUpdateData) {
        const updatedHotel = await prismaClient.hotel.update({
          where: {
            id: id
          },
          data: newData
        });
    
        return updatedHotel;
      }
    }
    
    export default EditarHotelService;
 