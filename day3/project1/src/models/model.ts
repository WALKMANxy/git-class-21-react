export type Response<T> = {
  info: Info;
  results: T[];
};

export type Info = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type?: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
};

interface CharacterDetail extends Character {
  episodeInfo: Episode[];
}

export type Location = {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
};

export type GameCard = {
  id: string;
  name: string;
  image: string;
  flipped: boolean;
  matched: boolean;
};


export type GameState = {
  cards: GameCard[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}