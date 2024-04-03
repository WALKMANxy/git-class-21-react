// Imports
import React, { useState } from "react";
import { useEpisodes } from "../../hooks/useGenericRMA"; // Ensure this is correctly imported
import { useSearch } from "../../contexts/SearchContext";
import PaginationControls from "../PaginationControls/PaginationControls";
import "./Episodes.scss"; // Make sure you have an SCSS file for Episodes

export const Episodes = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { searchQuery } = useSearch();
  const [episodes, loading, totalPages] = useEpisodes(currentPage, searchQuery);

  return (
    <div>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
      <div className="episodes-container">
        {episodes.map((episode) => (
          <div key={episode.id} className="episode-item">
            <div className="episode-info">
              <p className="episode-name">{episode.name}</p>
              <div className="episode-details">
                <p>Date: {episode.air_date}</p>
                <p>Episode: {episode.episode}</p>
                <p>Characters: {episode.characters.length}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Episodes;
