import {useEffect, useState } from 'react'
import './Deck.css'
import { useParams } from 'react-router-dom';
import { TDeck } from './api/getDecks';
import { createCard } from './api/creatCard';
import { getDeck } from './api/getDeck';
import { deleteCard } from './api/deleteCard';


export default function Deck(){
    const [deck, setDeck] = useState<TDeck | undefined>();
    const [cards, setCards] = useState<string[]>([]);
    const [text, setText] = useState("");
    const {deckId} = useParams();
    async function handleCreateDeck(e: React.FormEvent){
        e.preventDefault();
        const { cards: serverCards } = await createCard(deckId!, text);
        setCards(serverCards)
        setText("");
    }

    async function handleDeleteCard(index: number) {
        if (!deckId) return;
        const deck = await deleteCard(deckId, index);
        setCards(deck.cards)
    }

    useEffect(()=>{
        if (!deckId) return;
        (async ()=>{
            const newDeck = await getDeck(deckId);
            setDeck(newDeck);
            setCards(newDeck.cards)
        })();
        
    }, [deckId])

    return (
        <div className="Deck">
            <h1>{deck?.title}</h1>
            <ul className='cards'>
                {
                cards.map((card, index)=>(
                <li key={index}>   
                    <button onClick={()=>handleDeleteCard(index)}>X</button>                       
                    {card}
                </li>
                ))
        }
            </ul>
            <form onSubmit={handleCreateDeck}>
                <label htmlFor='deck-title'>Card text</label>
                <input 
                    id='card-text'
                    value={text}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                {
                    setText(e.target.value);
                }
                }
                />
                <button>Create Card</button>
            </form>
    </div>
)
}