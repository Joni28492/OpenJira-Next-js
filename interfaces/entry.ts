

export interface Entry {
     _id: string;
     description: string;
     createdAt: number;
     status: EntryStatus; //A,b,C,D pending, in-progress - finished
}

export type EntryStatus = 'pending' | 'in-progress' | 'finished' 