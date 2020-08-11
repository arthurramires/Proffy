import { Request, Response } from 'express'
import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class ProfilesController {
    public async create(request: Request, response: Response) {
        const { avatar, whatsapp, bio, subject, cost, schedule } = request.body;
        
        try {
            const trx = await db.transaction();
    
        
            const profileId = await trx('profile').insert({
                avatar,
                whatsapp,
                bio,
                user_id: request.user.id
            });

            const user_id = profileId[0];

            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id,
            });
        
            const class_id = insertedClassesIds[0];
        
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),
                }
            });
        
            await trx('class_schedule').insert(classSchedule);
        
            await trx.commit();
        
            return response.status(201).send();
        }catch (err){
            console.log(err);
            return response.status(400).json({
                message: 'Unexpected error while creating new profile'
            });
        }
    }

    public async update(request: Request, response: Response) {
        const { avatar, whatsapp, bio, subject, cost, schedule } = request.body;
        
        try {
            const trx = await db.transaction();
            const user_id = request.user.id;
            //const existingUser = await trx('profile').where('id', request.user.id);
            await trx('profile').update({
                avatar,
                whatsapp,
                bio,
                user_id,
            }).where('id', user_id);

            const insertedClassesIds = await trx('classes').update({
                subject,
                cost,
                user_id,
            }).where('user_id', user_id);
        
            const class_id = insertedClassesIds;
        
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),
                }
            });

           await trx('class_schedule').where('class_id', class_id).delete();

            await trx('class_schedule').insert(classSchedule);
            

            await trx.commit();            
        
            return response.status(201).send();
        }catch (err){
            console.log(err);
            return response.status(400).json({
                message: 'Unexpected error while creating new profile'
            });
        }
    }
}