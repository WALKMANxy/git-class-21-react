import React, { useState, useEffect, memo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import Link
import "./navbar.scss"; // Import your CSS file for styling
import { useSearch } from "../../contexts/SearchContext";

const Navbar = memo(() => {
  console.log("Navbar rendered");

  const [inputValue, setInputValue] = useState(""); // Local state to handle input value
  const { setSearchQuery } = useSearch();
  const routeLocation = useLocation();
  const navigate = useNavigate();

  // Debounce search query update
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(inputValue);
      if (inputValue.trim()) {
        // Update the URL without navigating away
        navigate(
          `${routeLocation.pathname}?search=${encodeURIComponent(inputValue)}`,
          { replace: true }
        );
      } else {
        // If the input is cleared, remove the query parameter
        navigate(`${routeLocation.pathname}`, { replace: true });
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [inputValue, setSearchQuery, navigate, routeLocation.pathname]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // Update local state immediately
  };

  return (
    <div className="navbar">
      <div className="navbar-title">RICK AND MORTY API _ test</div>
      {routeLocation.pathname !== "/" && ( // Conditionally render the search bar if not on the homepage
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Type here to search..."
            value={inputValue}
            onChange={handleSearchChange}
          />
        </div>
      )}
      {routeLocation.pathname !== "/" && ( // Conditionally render the home button if not on the homepage
        <div className="navbar-action">
          <Link to="/" className="home-link">
            Home
          </Link>
        </div>
      )}
    </div>
  );
});

export default Navbar;
