import {Request, Response} from 'express'
import ListHotalService from '../../services/user/ListHotalService'

class ListHotelController {
    async handle(req: Request, res:Response) {

      const listHotel = new ListHotalService()

      const listHostel = await listHotel.execute()

      return res.json(listHostel)
    }



}

export {ListHotelController}