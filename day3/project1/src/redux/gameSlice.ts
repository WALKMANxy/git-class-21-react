// src/redux/gameSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { GameCard } from '../models/GameCard';
import { RootState } from './store';


const randomPage = () => Math.floor(Math.random() * 42) + 1;

export const fetchCharacters = createAsyncThunk<GameCard[], void, { state: RootState }>(
  'game/fetchCharacters', 
  async () => {
    const response = await axios.get('https://rickandmortyapi.com/api/character?page=' + randomPage());
    const characters = response.data.results;
    const shuffled = characters.sort(() => 0.5 - Math.random()).slice(0, 8); // Fetch 8 for 4 pairs
    const gameCards = [...shuffled, ...shuffled]
      .sort(() => 0.5 - Math.random())
      .map((char, index) => ({ 
        ...char, 
        id: `${char.id}-${index}`, 
        flipped: false, 
        matched: false 
      }));
    return gameCards;
  }
);

const initialState: { cards: GameCard[]; status: 'idle' | 'loading' | 'succeeded' | 'failed'; error: string | null; } = {
  cards: [],
  status: 'idle',
  error: null,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    flipCard: (state, action) => {
      const cardIndex = state.cards.findIndex(card => card.id === action.payload);
      if (cardIndex !== -1) {
        state.cards[cardIndex].flipped = !state.cards[cardIndex].flipped;
      }
    },
    resetFlips: (state) => {
      state.cards.forEach(card => {
        card.flipped = false;
      });
    },
    markAsMatched: (state, action) => {
      action.payload.forEach((id: string) => {
        const card = state.cards.find(card => card.id === id);
        if (card) card.matched = true;
      });
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cards = action.payload;
      })
      .addCase(fetchCharacters.rejected, (state : any, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { flipCard, resetFlips, markAsMatched } = gameSlice.actions;
export default gameSlice.reducer;
