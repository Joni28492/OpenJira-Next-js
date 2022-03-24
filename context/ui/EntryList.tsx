import { List, Paper } from '@mui/material'
import React, { DragEvent, FC, useContext, useMemo } from 'react'
import { EntryStatus } from '../../interfaces'
import { EntryCard } from './'
import { EntriesContext } from '../entries';
import { UIContext } from './UIContext';
import styles from './EntryList.module.css'


interface Props {
    status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {

    const { entries, updateEntry } = useContext(EntriesContext)


    const { isDragging, endDragging } = useContext(UIContext)

    const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries])



    const allowDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
        const id = event.dataTransfer.getData('text')
        // console.log({ id });
        const entry = entries.find(e => e._id === id)!;
        entry.status = status;
        updateEntry(entry)
        endDragging();
    }


    return (
        //TODO: Aqui haremos Drop
        <div
            onDrop={onDropEntry}
            onDragOver={allowDrop}
            className={isDragging ? styles.dragging : ''}
        >
            <Paper sx={{ height: 'calc(100vh - 180px)', overflow: 'hidden', backgroundColor: 'transparent', padding: '1px 5px' }}>

                <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
                    {
                        entriesByStatus.map(entry => (
                            <EntryCard key={entry._id} entry={entry} />
                        ))
                    }

                </List>
            </Paper>

        </div>
    )
}
