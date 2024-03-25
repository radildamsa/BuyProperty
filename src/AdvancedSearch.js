import React from 'react';
import './AdvancedSearch.css'; 

const AdvancedSearch = ({ onSearchChange, onSearch }) => {
    return (
        <div className="advanced-search-container">
            <h2 className="advanced-search-heading">Advanced Search</h2>
            <div className="advanced-search-form">
                <input type="text" placeholder="Type" onChange={e => onSearchChange('type', e.target.value)} />
                <input type="number" placeholder="Bedrooms" onChange={e => onSearchChange('bedrooms', e.target.value)} />
                <input type="number" placeholder="Max Price" onChange={e => onSearchChange('price', e.target.value)} />
                <input type="date" placeholder="Date Added" onChange={e => onSearchChange('added', e.target.value)} />
                <input type="text" placeholder="Postcode Area" onChange={e => onSearchChange('location', e.target.value)} />
                <button onClick={onSearch} className="search-button">Search</button>
            </div>
        </div>
    );
};

export default AdvancedSearch;
