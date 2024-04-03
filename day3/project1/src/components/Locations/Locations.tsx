// imports
import React, { useState, useEffect } from "react";
import { useLocation } from "../../hooks/useGenericRMA"; // Adjust the path as necessary
import { useSearch } from "../../contexts/SearchContext";
import PaginationControls from "../PaginationControls/PaginationControls";
import "./Locations.scss"; // Ensure you have a CSS/SCSS file for Locations

export const Locations = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { searchQuery } = useSearch();
  const [locations, loading, totalPages] = useLocation(
    currentPage,
    searchQuery
  );

  // Since we don't have to fetch additional details like the first episode for locations,
  // we can directly render the locations data without an additional useEffect.

  return (
    <div>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
      <div className="locations-container">
        {locations.map((location) => (
          <div key={location.id} className="location-item">
            <div className="location-info">
              <p className="location-name">{location.name}</p>
              <div className="location-details">
                <p>Type: {location.type}</p>
                <p>Dimension: {location.dimension}</p>
                <p>Residents: {location.residents.length}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Locations;
