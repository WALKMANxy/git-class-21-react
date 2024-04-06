// src/components/MemoryGame/MemoryGame.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCharacters,
  flipCard,
  resetFlips,
  markAsMatched,
} from "../../redux/gameSlice";
import { AppDispatch, RootState } from "../../redux/store";
import "./MemoryGame.scss"; // Adjust path as necessary

export const MemoryGame = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cards, status, error } = useSelector(
    (state: RootState) => state.game
  );
  const flippedCards = cards.filter((card) => card.flipped);
  const [gameStarted, setGameStarted] = useState(false);


  useEffect(() => {
    if (gameStarted) {
      dispatch(fetchCharacters());
      // After cards are fetched, show them for 6 seconds
      setTimeout(() => {
        dispatch(resetFlips()); // Assuming this action flips all cards back
      }, 6000);
    }
  }, [gameStarted, dispatch]);

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  if (!gameStarted) {
    return (
      <div className="start-button-container">
        <button onClick={() => setGameStarted(true)}>Play!</button>
        <p>The cards will be shown for 6 seconds, then flipped on the back. Memorize the place of each pair to win!</p>
      </div>
    );
  }

  

  const handleCardClick = (id: string) => {
    // Prevent more than two cards from being flipped at the same time
    if (flippedCards.length < 2) {
      dispatch(flipCard(id));

      // If two cards are flipped, check for a match
      if (flippedCards.length === 1) {
        const firstCardId = flippedCards[0].id;
        const secondCardId = id;

        // Check if the two flipped cards match
        if (firstCardId.slice(0, -2) === secondCardId.slice(0, -2)) {
          setTimeout(() => {
            dispatch(markAsMatched([firstCardId, secondCardId]));
            dispatch(resetFlips());
          }, 1000);
        } else {
          // If they don't match, flip them back over after a short delay
          setTimeout(() => {
            dispatch(resetFlips());
          }, 1000);
        }
      }
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Game logic and UI rendering

  return (
    <div className="memory-game">
      {cards.map((card) => (
        <div
          key={card.id}
          className={`card ${card.flipped ? "flipped" : ""} ${
            card.matched ? "matched" : ""
          }`}
          onClick={() => handleCardClick(card.id)}
        >
          <img src={card.image} alt={card.name} className="card-front" />
          <div className="card-back"></div>
        </div>
      ))}
    </div>
  );
};

export default MemoryGame;
