
interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number
}


export const seedData:SeedData = {
    entries: [
        {
            description: 'Pendiente: Esto es un texto de las tareas pendientes',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            description: 'En Progreso: Esto es un texto de las cosas que estamos haciendo ahora',
            status: 'in-progress',
            createdAt: Date.now() - 100000,
        },
        {
            description: 'Finalizada: Ya hemos acabado todo esto',
            status: 'finished',
            createdAt: Date.now() - 100000,
        },
    ]
}