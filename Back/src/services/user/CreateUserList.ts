import { Request, Response } from 'express';
 import prismaClient from '../../prisma'
 import bcrypt from 'bcrypt';
 import jwt from 'jsonwebtoken';
 

 interface ApRequest {
    name: string;
    email: string
     password: string
 }
 
 class CreateUserListService {
     async execute({ name, email, password,}: ApRequest) {

     const hashedPassword = await bcrypt.hash(password, 8)

        if(!email){
          console.log("Email incorrect")
          return;
        }
      
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email:email
            }
        })

        if(userAlreadyExists) {
            console.log("User already exists")
        }

         const novoUser = await prismaClient.user.create({
             data: {
                name: name,
                email: email,
               password: hashedPassword,  
             },
             select:{
               id: true,
               name: true,
               email: true     
             }
           })
  
       return novoUser;
     }
   }
 

 

 export default CreateUserListService;