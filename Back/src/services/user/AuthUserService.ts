import prismaClient from "../../prisma";
import { compare} from 'bcrypt'
import {SignOptions, sign} from 'jsonwebtoken'

interface AuthRequest{
  email: string
  password: string   
}

class AuthUserService{
  async execute({email, password}: AuthRequest){

    const user = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    })

    if(!user) {
      throw new Error("User/password incorrect")
    }

  const passwordMath = await compare(password, user.password)

      if(!passwordMath){
        throw new Error("User/password incorrect")
      }

      const token = sign(
        {
          name: user.name,
          email: user.email 
        },
        process.env.JWT_SECRET as string,
        {
          subject: user.id.toString(),
          expiresIn: '30d'
        } as SignOptions // Adicione esta parte para indicar ao TypeScript o tipo correto das opções
      );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token
    }
  }  
}

export {AuthUserService}