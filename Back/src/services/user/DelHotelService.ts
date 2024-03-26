import prismaClient from "../../prisma";

class RemoveHotelList {
  async execute(id: number) {
    // Exclua o hotel
    const deletedHotel = await prismaClient.hotel.delete({
        where: {
            id: id
        }
    });

    return deletedHotel;
  }
}

export default RemoveHotelList;