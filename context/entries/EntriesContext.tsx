import { createContext } from 'react'
import { Entry } from '../../interfaces';


interface ContextProps {
    entries: Entry[];
    //methods
    addNewEntry: (description: string) => void;
    updateEntry: (entry: Entry, showSnackbar?: boolean) => void;
    deleteEntry: (entry: Entry, showSnackbar?: boolean) => Promise<void>;
    refreshEntries: () => Promise<void>

}


export const EntriesContext = createContext({} as ContextProps)