import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card.jsx';
import shuffle from './utilities/shuffle.js';

function App() {
    const [cards, setCards] = useState(shuffle);
    const [pickOne, setPickOne] = useState(null);
    const [pickTwo, setPickTwo] = useState(null);
    const [wins, setWins] = useState(0);
    const [disabled, setDisabled] = useState(false);

    const handleClick = (card) => {
        if (!disabled) {
            pickOne ? setPickTwo(card) : setPickOne(card);
        }
    };

    const reset = () => {
        setPickOne(null);
        setPickTwo(null);
        setDisabled(false);
    };

    //handle matching
    useEffect(() => {
        if (pickOne && pickTwo) {
            if (pickOne.image === pickTwo.image) {
                setCards((prevCards) => {
                    return prevCards.map((card) => {
                        if (card.image === pickOne.image) {
                            return { ...card, matched: true };
                        } else {
                            return card;
                        }
                    });
                });
            } else {
                setDisabled(true)
                setTimeout(() => {
                    reset();
                }, 1000);
            }
        }
        return;
    }, [cards, pickOne, pickTwo]);

    //handle end of game
    useEffect(() => {
        const checkWin = cards.filter((card) => !card.matched);
        if (checkWin.length < 1) {
          setTimeout( () => {
            setWins(wins + 1);
            reset();
            setCards(shuffle);
          }, 1000)
        }
    }, [cards, wins]);
    
    return (
        <>
            <div className="grid">
                {cards.map((card) => {
                    const { image, id, matched } = card;

                    return (
                        <Card
                            key={id}
                            image={image}
                            selected={
                                card === pickOne || card === pickTwo || matched
                            }
                            onClick={() => handleClick(card)}
                        />
                    );
                })}
            </div>
        </>
    );
}

export default App;
