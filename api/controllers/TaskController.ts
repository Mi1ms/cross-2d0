import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';
const prisma = new PrismaClient()


export default class TaskController {
    static async save(req: Request, res: Response)  {
        const fields: string[] = ['content', 'isComplete', 'userId'];
        const missingValues = fields.filter(key => !(key in req.body));
         
        if (missingValues.length === 0) {
            const { content, userId} = req.body;
            try {
                const task = await prisma.task.create({
                    data: {
                      content,
                      isComplete: false,
                      userId,
                    },
                  })
                return res.status(200).send('Task saved')
            } catch (error) {
                return res.status(400).send(error);
            }
        } else {
            return res.status(400).send(`${missingValues.join(', ')} are missing`);
        }
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.body;
        const taskExist = await prisma.task.findUnique({where: { id },});

        if (typeof taskExist == null ) {
            try {
                const deleteTask = await prisma.task.delete({
                    where: {
                      id,
                    },
                  })
                return res.status(200).send('Task deleted');
            } catch (error) {
                return res.status(400).send(error);
            }
        } else {
            
        }
    }

    static async update(req: Request, res: Response) {
        const {id} = req.body;
        
        try {
            const updateUser = await prisma.task.update({
                where: {
                    id: id,
                },
                data: req.body,
            })
            return res.status(200).send('Task updated')
        } catch (error) {
            return res.status(400).send(error);
        }      
    }
    
    static async getAllById(req: Request, res: Response) {
        const {userId} = req.body;
        
        if (!userId == null || userId > 0) {
            try {
                const findTasks = await prisma.task.findMany({
                    where: {
                        userId : userId
                    }
                })
                return res.status(200).send(findTasks);
            } catch (error) {
                return res.status(400).send(error);
            }
        } else {
            
        }
    }
}