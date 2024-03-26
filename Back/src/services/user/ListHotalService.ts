import prismaClient from "../../prisma";

class ListHotalService{
    async execute() {
    
        const listHotel = await prismaClient.hotel.findMany({
            select: {
                id: true,
                nome: true,
                fone: true,
                cpf: true,
                cep: true,
                logradouro: true,
                numero: true,
                bairro: true,
                localidade: true,
                uf:true
            }
        })

      
   
        return listHotel

    }
}

export default ListHotalService