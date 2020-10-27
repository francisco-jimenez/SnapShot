import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="main-nav">
      <ul>
        <li><NavLink id= 'mountainButton' to="/mountain">Mountain</NavLink></li>
        <li><NavLink id= 'beachButton' to="/beach">Beaches</NavLink></li>
        <li><NavLink to="/bird">Birds</NavLink></li>
        <li><NavLink to="/food">Food</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navigation;
