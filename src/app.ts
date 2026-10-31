import express from 'express';
import 'dotenv/config.js';
import { finanzasRoute } from './routes/finanzas.routes.js';

const app = express();
const port = Number(process.env.PORT || 54321);

app.use(express.json());

app.use('/finanzas', finanzasRoute);

function main(): void {
    try {
        app.listen(port, "0.0.0.0", () => {
            console.log(`App Finanzas is listen on http://localhost:${port}`);
        });
    } catch (err) {
        console.log('Error al Iniciar la applicación', err);
        process.exit(1);
    }
}

main();