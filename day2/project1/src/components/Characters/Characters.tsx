import React, { useEffect, useState } from "react";
import Axios from "axios";
import Character from "../../models/Character";

export const Characters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    (async () => {
      const response = await Axios.get(
        "https://rickandmortyapi.com/api/character"
      );

      setCharacters(response.data.results);
    })();
  }, []);

  return (
    <div>
      <ul>
        {characters.map((char, index) => (
          <li key={char.id}>
            <img src={char.image} alt={char.name} />
            {char.name}__ 
            {char.gender}__ 
            {char.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Characters;
