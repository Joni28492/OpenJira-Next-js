import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedData } from '../../database'
import { Entry } from '../../models'

type Data = {
    message: string
}

export default async function (req: NextApiRequest, res: NextApiResponse<Data>) {

    if(process.env.NODE_ENV === 'production') {
        return res.status(401).json({message: ' no tiene acceso a este servicio'})
    }

    await db.connect();
    //Entry de los modelos
    await Entry.deleteMany();//borra todo si no tiene condicion
    await Entry.insertMany(seedData.entries);
    await db.disconnect();

    res.status(200).json({ message: 'Proceso realizado correctamente' })
}