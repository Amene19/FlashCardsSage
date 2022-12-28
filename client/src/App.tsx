import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Link } from 'react-router-dom';
import { getDecks, TDeck } from './api/getDecks';
import { createdDeck } from './api/createDeck';
import { deleteDeck } from './api/deleteDeck';





export default function App(): JSX.Element {
  const [decks, setDecks] = useState<TDeck[]>([]);
  const [title, setTitle] = useState("");
  async function handleCreateDeck(e: React.FormEvent){
    e.preventDefault();
    const deck = await createdDeck(title);
    setDecks([...decks,deck]);
    setTitle("");
  }

  async function handleDeleteDeck(deckId: string) {
    await deleteDeck(deckId);
    setDecks(decks.filter((deck) => deck._id !== deckId));
  }

  useEffect(()=>{
    (async ()=>{
      const newDecks = await getDecks();
      setDecks(newDecks);
    })();
    
  }, [])
  return (
    <div className="App">
      <ul className='decks'>
        {
          decks.map((deck)=>(
            <li key={deck._id}>
            <button onClick={()=>handleDeleteDeck(deck._id)}>X</button>
            
            <Link to={`decks/${deck._id}`}>{deck.title}</Link>
            </li>
          ))
        }
      </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor='deck-title'>Deck Title</label>
        <input 
          id='deck-title'
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            {
              setTitle(e.target.value);
            }
          }
        />
        <button>Create Deck</button>
      </form>
    </div>
  )
}


