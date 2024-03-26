import {Request, Response} from 'express'
import CreateHoteServicel from '../../services/user/CreateHoteServicel'

class CreateHotelController{
  async handle(req: Request, res: Response){
    const { nome, fone, cpf, cep, logradouro,numero, bairro, localidade, uf} = req.body;
    
    const createHotel = new CreateHoteServicel()

    const user = await createHotel.execute({
        nome,
        fone,
        cpf,
        cep,
        logradouro,
        numero,
        bairro,
        localidade,
        uf

    });

    return res.json(user)
  }
}

export {CreateHotelController}