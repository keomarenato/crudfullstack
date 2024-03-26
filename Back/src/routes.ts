import {Router, Request, Response } from 'express'
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { CreateHotelController } from './controllers/user/CreateHotelController';
import { ListHotelController } from './controllers/user/ListHotelController';
import RemoveHotelList from './services/user/DelHotelService';
import { EditHotelController } from './controllers/user/EditarHotelController';

const router = Router();



router.post('/hotel', new CreateHotelController().handle )
router.get('/hotel', new ListHotelController().handle )

router.delete('/hotel/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const removeHotelList = new RemoveHotelList();
        await removeHotelList.execute(parseInt(id));
        return res.json({ message: 'Hotel excluído com sucesso' });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao excluir hotel' });
    }
});

router.put('/hotel/:id', new EditHotelController().handle);

router.post('/user', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)

export { router}