import { config } from 'dotenv';
config();

import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import Deck from "./models/Deck"

const PORT = 5020;

const app = express();

app.use(cors());
app.use(express.json());


app.get('/decks', async (req: Request, res: Response) => {
    const decks = await Deck.find();
    res.json(decks);
})

app.post('/decks', async (req: Request, res: Response)=>{
    const newDeck = new Deck({
        title: req.body.title,
    });
    const createdDeck = await newDeck.save();
    res.json(createdDeck);
    
})

app.delete('/decks/:deckId', async (req: Request,res: Response) => {
    const deckId = req.params.deckId;
    await Deck.findByIdAndDelete(deckId);
    res.json();

});



mongoose
    .connect(
        process.env.MONGO_url!)
    .then(()=>{
        console.log(`listening on port ${PORT}`);
        app.listen(PORT);
})

