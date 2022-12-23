import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Card from "./Card";
import "./CardDeck.css";

function CardDeck() {
  const [drawing, setDrawing] = useState(false);
  const [deck, setDeck] = useState([]);
  const [deckEnd, setDeckEnd] = useState(false);

  const deckId = useRef();

  useEffect(() => {
    let id = null;
    if (drawing) {
      drawCard();
      id = setInterval(() => {
        drawCard();
      }, 1000);
    }
    return () => clearInterval(id);
  }, [drawing]);

  useEffect(() => {
    const getDeckId = async () => {
      const res = await axios.get(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
      );
      deckId.current = res.data.deck_id;
    };
    getDeckId();
  }, []);

  const drawCard = async () => {
    const res = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deckId.current}/draw/?count=1`
    );

    if (res.data.remaining === 0) {
      setDeckEnd(true);
      return;
    }
    setDeck((deck) => [...deck, res.data.cards[0]]);
  };

  const toggleDrawing = () => {
    setDrawing((drawing) => !drawing);
  };

  return (
    <div>
      {deckEnd ? (
        "End of deck"
      ) : (
        <button onClick={toggleDrawing}>
          {drawing ? "Stop drawing" : "Start drawing"}
        </button>
      )}

      <div>
        {deck.map((card, idx) => (
          <Card key={idx} card={card} />
        ))}
      </div>
    </div>
  );
}

export default CardDeck;
