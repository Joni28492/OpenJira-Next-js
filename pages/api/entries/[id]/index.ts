import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database';
import { Entry ,IEntry} from '../../../../models';


type Data = 
| {message: string}
| IEntry;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    // const { id } = req.query

    // if(!mongoose.isValidObjectId(id)) {//esta validacion no iria aqui
    //     return res.status(400).json({message: 'El id no es valido ' + id})
    // }

    switch (req.method) {
        case 'PUT':
            return updateEntry(req,res);
        case 'GET':
            return getEntry(req,res);
        case 'DELETE':
            return deleteEntry(req,res);
    
        default:
            return res.status(400).json({message: 'Metodo no existe'})
    }


}



const updateEntry =async(req:NextApiRequest, res:NextApiResponse<Data>)=>{
 
    const {id} = req.query; 
    await db.connect();
  
    const entryToUpdate = await Entry.findById(id);
    if (!entryToUpdate){
        await db.disconnect();
        return res.status(400).json({message: 'No hay entrada con ese ID: ' + id})
    }
 
    const {
        description = entryToUpdate.description, 
        status = entryToUpdate.status
    } = req.body;
 
    try {
        const updatedEntry = await Entry.findByIdAndUpdate(id, { description,status }, {runValidators: true, new:true})
        res.status(200).json(updatedEntry!)
        
    } catch (error: any) {
        console.log({error})
        await db.disconnect();
        res.status(400).json({message: error.error.status.message})
    }

    // entryToUpdate.description = description;
    // entryToUpdate.status = status;
    // await entryToUpdate.save()//se podria hacer en estas 3 lineas

}


const  getEntry = async(req: NextApiRequest, res: NextApiResponse) =>{
    const  {id} = req.query;
    await db.connect();
    const entryInDB = await Entry.findById(id);
    await db.disconnect(); //desconectamos aqui porque no necesitamos mas

    if (!entryInDB){
        return res.status(400).json({message: 'No hay entrada con ese ID: ' + id})
    }
    return res.status(200).json(entryInDB)
}


const deleteEntry = async(req:NextApiRequest, res:NextApiResponse)=>{

    const {id} = req.query;
    await db.connect();
    const entryInDB = await Entry.findByIdAndDelete(id);

    if (!entryInDB){
        return res.status(400).json({message: 'No hay entrada con ese ID: ' + id})
    }
    return res.status(200).json({entryInDB, message: `Entrada con el id: ${id} borrada correctamente`})

}