import express from 'express';
import dotenv from 'dotenv';

import embalagemRoutes from './routes/embalagemRoutes.js'
import maquinaRoutes from './routes/maquinaRoutes.js'
import operadorRoutes from './routes/operadorRoutes.js'

dotenv.config();

const app = express();

app.use(express.json());

app.use('/embalagens', embalagemRoutes);
app.use('/maquinas', maquinaRoutes);
app.use('/operadores', operadorRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando na porta ${PORT}`)
}); 