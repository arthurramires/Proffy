import { Request, Response } from 'express';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import db from '../database/connection';

export default class SessionsController {

    public async create(request: Request, response: Response) {
        const { email, password } = request.body;
    
    
        const trx = await db.transaction();
    
        try {
            const existingUser = await trx('users').where('email', email);

            if(!existingUser){
                throw Error('Not existing user with this email')
            }

            const passwordMatched = await compare(
                password,
                existingUser[0].password,
            );

            if(!passwordMatched){
                throw Error('Incorrect email/password combination.')
            }

            const { jwt } = authConfig;

            const token = sign({}, jwt.secret, {
              subject: String(existingUser[0].id),
              expiresIn: jwt.expiresIn,
            });
        
            return response.json({ token: token });
        
        }catch (err){
            console.log(err)
            return response.status(400).json({
                message: 'Unexpected error while authentication'
            });
        }
    }
}