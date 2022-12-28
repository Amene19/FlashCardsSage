import { config } from 'dotenv';
config();
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { getDecksController } from './controllers/getDecksController';
import { createDeckController } from './controllers/createDeckController';
import { deleteDeckController } from './controllers/deleteDeckController';

const PORT = 5020;

const app = express();

app.use(cors());
app.use(express.json());


app.get('/decks', getDecksController);

app.post('/decks', createDeckController)

app.delete('/decks/:deckId',deleteDeckController);



mongoose
    .connect(
        process.env.MONGO_url!)
    .then(()=>{
        console.log(`listening on port ${PORT}`);
        app.listen(PORT);
})

