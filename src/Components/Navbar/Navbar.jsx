import React from "react";
import "./Navbar.css";

const Navbar = ({ onSearch }) => {
  const handleInputChange = (event) => {
    onSearch(event.target.value);
  };
  return (
    <div className="navbar">
      <input
        type="text"
        placeholder="Search photos by tags"
        onChange={handleInputChange}
        className="search"
      />
    </div>
  );
};

export default Navbar;
