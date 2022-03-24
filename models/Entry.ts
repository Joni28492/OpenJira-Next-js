import mongoose, {Model, Schema} from 'mongoose'
import { Entry } from '../interfaces';




const entrySchema = new Schema({
    description: {type:String, required: true},
    createdAt: {type: Number },
    status: {
        type:String,
        enum: {
            values: ['pending', 'in-progress', 'finished'],
            message: '{VALUE} no es un estado permitido'
        },
        default: 'pending'
    }
});

export interface IEntry extends Entry{}//El Entry esta en interfaces

const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry',entrySchema)
export default EntryModel