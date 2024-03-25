import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FavoriteCart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const FavoriteCart = ({ onDrop, favorites, onRemove, onDragStartFavorite, onRemoveAll }) => {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredFavorites = favorites.filter(property => 
        property.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.price.toString().includes(searchTerm)
    );


  return (
    <div className="favorites" onDrop={onDrop} onDragOver={(e) => e.preventDefault()}>
      <h2>My Favorites</h2>
      <input 
        type="text" 
        placeholder="Search by price or type..." 
        onChange={handleSearchChange} 
        value={searchTerm}
      /><br/>
      <div>
        <button onClick={onRemoveAll} className="delete-all-button">
        <FontAwesomeIcon icon={faTrash} />
            <i className="fas fa-trash"></i> Delete All 
        </button>
      </div>
      
      {filteredFavorites.map(property => (
        <div 
          key={property.id} 
          className="favorite-property" 
          draggable
          onDragStart={(e) => onDragStartFavorite(e, property)}
        ><br/>
          <img src={property.image} alt={property.type} className="property-image"/>
          <div className="property-info">
            <h2 className="property-title">{property.type} - {property.bedrooms} Bedrooms</h2>
            <p className="property-description-fav">{property.description}</p>
            <p className="property-price">Price: {property.price}</p>
            <Link to={`/property/${property.id}`} className="view-details-button advanced-button">View Details</Link>
            <br/>
            <button 
              className="view-details-button remove-button"
              onClick={() => onRemove(property.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoriteCart;
