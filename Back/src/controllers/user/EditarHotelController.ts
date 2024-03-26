import { Request, Response } from 'express';
import EditarHotelService from '../../services/user/EditarHotelService';

class EditHotelController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, fone, cpf, cep,logradouro,numero, bairro, localidade, uf} = req.body;

    const editHotelService = new EditarHotelService();

    try {
      const updatedHotel = await editHotelService.execute(parseInt(id), { nome, fone, cpf,cep, logradouro,numero, bairro, localidade, uf });
      return res.json({ message: 'Hotel atualizado com sucesso', data: updatedHotel });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar hotel' });
    }
  }
}

export { EditHotelController };

 