import { Request, Response } from 'express';
import  RemoveHotelList  from '../../services/user/DelHotelService';  

class DelHotelController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const listRemoveHotel = new RemoveHotelList();

    try {
        await listRemoveHotel.execute(parseInt(id));
        return res.json({ message: 'Hotel excluído com sucesso' });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao excluir hotel' });
    }
}
}

export { DelHotelController };