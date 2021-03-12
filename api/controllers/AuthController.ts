import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';

const prisma = new PrismaClient()

export default class AuthController {
    static async register(req: Request, res: Response) {

        const fields: string[] = ['email', 'password', 'firstname', 'lastname', 'birthdate', 'gender'];
        const missingValues = fields.filter(key => !(key in req.body));
        
        
        if (missingValues.length === 0) {
            const { email, password, firstname, lastname, birthdate, gender } = req.body;
            const findByMail = await prisma.user.findMany({
                where: {
                  email: email,
                },
            })
              
            if (findByMail.length > 0) return res.status(409).send('Email already register, try another')
              
            try {
                
                const user = await prisma.user.create({
                    data: {
                      email,
                      encrypedPassword: password,
                      firstname,
                      lastname,
                      birthdate, 
                      gender
                    },
                  })
                console.log(user);
                
                return res.status(200).send('User register');

            } catch (error) {
                return res.status(409).send(error);
            }
        } else {
            return res.status(400).send(`${missingValues.join(', ')} are missing`);
        }
    }

    static async login(req: Request, res: Response) {
        const fields: string[] = ['email', 'password'];
        const missingValues = fields.filter(key => !(key in req.body));

        if (missingValues.length === 0) {
            const { email, password } = req.body;
            const findByMail = await prisma.user.findUnique({
                where: {
                  email: email,
                },
            })
            console.log(findByMail, email);
            

            if (typeof findByMail == null) {
                console.log(findByMail);
                
            } else {
                return res.status(400).send(`No mail ${email} in database `);
            }
        } else {
            return res.status(400).send(`${missingValues.join(', ')} are missing`);
        }
        
    }

    static async getById(req: Request, res: Response) {
        const { id } = req.body;

        try {
            const user = await prisma.user.findUnique({
                where: {
                  id: id,
                },
            });
            return res.status(200).send(user);

        } catch (error) {
            return res.status(400).send(error);
        }
    }
}