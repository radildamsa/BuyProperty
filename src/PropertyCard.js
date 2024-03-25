import React from 'react';
import './PropertyCard.css';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property, onDragStart, onFavorite }) => {
    return (
        <div className="property-card" draggable 
        onDragStart={(e) => onDragStart(e, property)}
        >
            <img src={property.image} alt={property.type} className="property-image"/>
            <div className="property-info">
                <h2 className="property-title">{property.type} - {property.bedrooms} Bedrooms</h2>
                <p className="property-description">{property.description}</p>
                <p className="property-price">Price: {property.price}</p><br/>
                <Link to={`/property/${property.id}`} className="view-details-button advanced-button">View Details</Link>
                <br/>
                <button className="view-details-button advanced-button" onClick={() => onFavorite(property)}>Favorite</button>
            </div>
        </div>
    );
}

export default PropertyCard;
