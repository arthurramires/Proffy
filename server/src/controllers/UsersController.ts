import { Request, Response } from 'express';
import { hash } from 'bcrypt';

import db from '../database/connection';

export default class UsersController {

    public async create(request: Request, response: Response) {
        const { name, email, password } = request.body;
    
    
        const trx = await db.transaction();
    
        try {
            const hashedPassword = await hash(password, 8);
            await trx('users').insert({
                name,
                email,
                password: hashedPassword,
            });
        
            await trx.commit();
        
            return response.status(201).send();
        }catch (err){
            await trx.rollback();
            console.log(err)
            return response.status(400).json({
                message: 'Unexpected error while creating new user'
            });
        }
    }
}