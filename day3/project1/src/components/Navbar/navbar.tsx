// components/Navbar/navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './navbar.scss'; // Import your CSS file for styling

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-title">RICK AND MORTY CHARACTERS _ test</div>
      <div className="navbar-action">
        <Link to="/" className="home-link">Home</Link> {/* Add Link to Home */}
      </div>
    </div>
  );
};

export default Navbar;
