import { ChangeEvent, FC, useContext, useEffect, useMemo, useState } from "react";
import { capitalize, IconButton, Card, CardHeader, Grid, TextField, CardContent, Button, CardActions, FormLabel, FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { Layout } from "../../components/layouts";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Entry, EntryStatus } from "../../interfaces";
import { GetServerSideProps } from 'next'

import { dbEntries } from "../../database";
import { EntriesContext } from "../../context/entries";
import { dateFunctions } from "../../utils";
import { useRouter } from "next/router";

//lo importamos de las interfaces
const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

interface Props {
    entry: Entry, //de las interfaces
}
export const EntryPage: FC<Props> = ({ entry }) => {


    const { updateEntry, deleteEntry } = useContext(EntriesContext)
    const router = useRouter();

    const [inputValue, setInputValue] = useState(entry.description)
    const [status, setStatus] = useState<EntryStatus>(entry.status)
    const [touched, setTouched] = useState(false)

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])


    const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value as EntryStatus)

    }

    const onSave = () => {
        if (inputValue.trim().length === 0) return

        const updatedEntry: Entry = {
            ...entry,
            status,
            description: inputValue
        }
        //viene del Provider
        updateEntry(updatedEntry, true)
    }

    const onDelete = () => {
        console.log('Borrando.....' + entry._id)
        deleteEntry(entry, true)
        router.push('/')
    }



    return (
        <Layout title={inputValue.substring(0, 20) + '...'}>
            <Grid
                container
                justifyContent='center'
                sx={{ margintop: 2 }}
            >
                <Grid item xs={2} sm={8} md={6}>
                    <Card>
                        <CardHeader
                            title={`Entrada:`}
                            subheader={`Creada ${dateFunctions.getFormatDistaceToNow(entry.createdAt)}`}
                        />
                        <CardContent>
                            <TextField
                                sx={{ marginTop: 2, marginBottom: 1 }}
                                fullWidth
                                placeholder="Nueva entrada"
                                autoFocus
                                multiline
                                label="Nueva Entrada"
                                value={inputValue}
                                onBlur={() => setTouched(true)}
                                onChange={onInputValueChanged}
                                helperText={isNotValid && 'Ingrese un valor'}
                                error={isNotValid}
                            />

                            {/* Radio buttons*/}
                            <FormControl>
                                <FormLabel>Estado:</FormLabel>
                                <RadioGroup
                                    row
                                    value={status}
                                    onChange={onStatusChanged}
                                >
                                    {
                                        validStatus.map(option => (
                                            <FormControlLabel
                                                key={option}
                                                value={option}
                                                control={<Radio />}
                                                label={capitalize(option)}
                                            />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                        <CardActions>
                            <Button startIcon={<SaveOutlinedIcon />}
                                variant="contained"
                                fullWidth
                                onClick={onSave}
                                disabled={inputValue.length <= 0}
                            >
                                Save
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

            <IconButton
                onClick={onDelete}
                sx={{
                    position: 'fixed',
                    bottom: 30,
                    right: 30,
                    backgroundColor: 'error.dark'
                }}>
                <DeleteOutlinedIcon />
            </IconButton>

        </Layout>
    )
}



// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { id } = params as { id: string };

    const entry = await dbEntries.getEntryById(id)

    if (!entry) {
        return {
            redirect: {
                destination: '/',
                permanent: false, //bots de google, no se genera mas si es true
            }
        }
    }

    return {
        props: {
            entry
        }
    }
}






export default EntryPage;