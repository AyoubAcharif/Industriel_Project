import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Récupérez les données de "sysup" et "air" depuis la base de données
        const sysupData = await prisma.tag.findMany({
            where: { topic: 'sysup' },


        });

        const airData = await prisma.tag.findMany({
            where: { topic: 'air' },
        });

        // Combinez les données de "sysup" et "air"
        const sysupAndAirData = [...sysupData, ...airData];

        res.status(200).json(sysupAndAirData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des données de "sysup" et "air".' });
    } finally {
        await prisma.$disconnect();
    }
}
