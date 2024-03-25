import React from 'react';
import './Header.css';
import logo from './common-images/logo.png';
import favorite from './common-images/favorite.png';

const Header = ({ onBasicSearch, toggleAdvancedSearch }) => {
    return (
        <header className="site-header">
            <div className="logo">
                <img src={logo} alt="Buy Prop Logo" />
                <h1>Buy Property</h1>
            </div>
            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by type..."
                    onChange={e => onBasicSearch(e.target.value)}
                />
                <button className="search-button">
                    <i className="fas fa-search"></i> 
                </button>
            </div>
            <div className="favorites">
                <button>
                    <img src={favorite} alt="Favorites" />
                </button>
            </div>
            <div className="advanced-search">
                <button className='advanced-button' onClick={toggleAdvancedSearch}>Advanced Search</button>
            </div>
        </header>
    );
}

export default Header;
