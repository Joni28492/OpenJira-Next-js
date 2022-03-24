import { FC, useEffect, useReducer } from 'react';
import { entriesApi } from '../../apis';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';

export interface EntriesState {
    entries: Entry[];
}


const Entries_INITIAL_STATE: EntriesState = {
    entries: []
}


export const EntriesProvider: FC = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter()
    // console.log(router.route)
    // const newEntry: Entry = {
    //     _id: uuidv4(),
    //     description,
    //     createdAt: Date.now(),
    //     status: 'pending'
    // }esto iria dentro de addNewEntry
    const addNewEntry = async (description: string) => {
        const { data } = await entriesApi.post<Entry>('entries', { description })
        dispatch({ type: '[Entry] Add-Entry', payload: data })
    }


    const updateEntry = async ({ _id, description, status }: Entry, showSnackbar = false) => {

        try {
            const { data } = await entriesApi.put<Entry>(`entries/${_id}`, { description, status })
            dispatch({ type: '[Entry] Entry-Updated', payload: data })
            //TODO: mostrar snackbar
            if (showSnackbar) {
                enqueueSnackbar('Entrada actualizada', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                })
            }
        } catch (error) {
            console.log({ error })
        }
    }

    const deleteEntry = async ({ _id }: Entry, showSnackbar = false) => {

        try {
            const { data } = await entriesApi.delete<Entry>(`entries/${_id}`)
            dispatch({ type: '[Entry] Delete-Entry', payload: data })

            if (showSnackbar) {
                enqueueSnackbar('Entrada borrada', {
                    variant: 'error',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                })
            }

        } catch (error) {
            console.log({ error })
        }

    }





    const refreshEntries = async () => {//Entry de interfaces
        const { data } = await entriesApi.get<Entry[]>('/entries');
        dispatch({ type: '[Entry] Refresh-Data', payload: data })
    }

    useEffect(() => {
        refreshEntries();
    }, [router.route])


    return (
        < EntriesContext.Provider value={{
            ...state,
            //methods
            addNewEntry,
            updateEntry,
            deleteEntry,
            refreshEntries,
        }}>
            {children}
        </ EntriesContext.Provider>
    )
}