import React, { useEffect, useState } from "react";
import { useCharacters } from '../../hooks/useGenericRMA'; // Adjust the path as necessary
import PaginationControls from '../PaginationControls/PaginationControls';
import './Characters.scss';
import Axios from 'axios';

export const Characters = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [characters, loading, totalPages] = useCharacters(currentPage);
  const [firstEpisodes, setFirstEpisodes] = useState<string[]>([]);

  useEffect(() => {
    const fetchFirstEpisodes = async () => {
      const episodeNames = await Promise.all(
        characters.map(async (char) => {
          try {
            const response = await Axios.get(char.episode[0]);
            return response.data.name;
          } catch (error) {
            console.error("Error fetching first episode:", error);
            return "Unknown";
          }
        })
      );
      setFirstEpisodes(episodeNames);
    };

    if (characters.length > 0) {
      fetchFirstEpisodes();
    }
  }, [characters]);

  if (loading) {
    return <div>Loading characters...</div>;
  }

  return (
    <div>
      <PaginationControls 
          currentPage={currentPage} 
          totalPages={totalPages} 
          setCurrentPage={setCurrentPage}
        />
      <div className="characters-container">
        {characters.map((char, index) => (
          <div key={char.id} className="character-item">
            <div className="character-image">
              <img src={char.image} alt={char.name} />
            </div>
            <div className="character-info">
              <p className="character-name">{char.name}</p>
              <div className="character-details">
                <p><span className="label">Gender:</span> {char.gender}</p>
                <p><span className="label">Status:</span> {char.status}</p>
                <p><span className="label">Last known location:</span> {char.location.name}</p>
                <p><span className="label">First seen in:</span> {firstEpisodes[index] || "Unknown"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Characters;
