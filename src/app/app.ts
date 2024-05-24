import express from 'express';
import 'dotenv/config';

import router from './rest/router';


const apiBasePath = process.env.API_BASE_PATH;
const port = process.env.PORT ?? 5000;
const host = process.env.HOST;

const app = express();

app.use(`${apiBasePath}/consulta`, router)

app.listen(port, () =>
    console.log(`Servidor ouvindo em ${host}:${port}`)
);