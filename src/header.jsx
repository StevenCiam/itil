import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav className="container">
        {/* Logo */}
        <div className="logo">
          PT. ARCOMIX
        </div>
        
        {/* Navigasi Menu */}
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/formulir">Input Rekapan</NavLink>
          </li>
          <li>
            <NavLink to="/laporan">Manajemen Rekapan</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;