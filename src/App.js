import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import AdvancedSearch from './AdvancedSearch'; 
import PropertyCard from './PropertyCard'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PropertyDetail from './PropertyDetail'; 
import FavoriteCart from './FavoriteCart';

const App = () => {
    const [properties, setProperties] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [advancedSearchCriteria, setAdvancedSearchCriteria] = useState({});
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
    const [favorites, setFavorites] = useState([]);

    // Using the use effect option to get all the propeties from properties.json file. 
    useEffect(() => {
        fetch('/properties.json')
            .then(response => response.json())
            .then(data => setProperties(data.properties));
    }, []);

    // Handling the Basic Search 
    const handleBasicSearch = (term) => {
        setSearchTerm(term);
        setShowAdvancedSearch(false); 
    };

    // Handling the advanced Search Change 
    const handleAdvancedSearchChange = (criteria, value) => {
        setAdvancedSearchCriteria(prev => ({ ...prev, [criteria]: value }));
    };

    // Handling the search preview
    const toggleAdvancedSearch = () => {
      setShowAdvancedSearch(prevShow => !prevShow);
    };

    // Handling the drag
    const handleDragStart = (e, property) => {
      e.dataTransfer.setData("property", JSON.stringify(property));
  };

    // Drop property in Favorite
    const handleDrop = (e) => {
      e.preventDefault();
      const property = JSON.parse(e.dataTransfer.getData("property"));
      handleFavorite(property);
  };

  // Handling the favorite items
    const handleFavorite = (property) => {
      if (!favorites.some(fav => fav.id === property.id)) {
          setFavorites(prevFavorites => [...prevFavorites, property]);
      }
  };

  // Remove favorite Items
  const handleRemoveFavorite = (id) => {
    setFavorites(favorites.filter(property => property.id !== id));
  };

  // Drag and Handle the favorite items
  const handleDragStartFavorite = (e, property) => {
    e.dataTransfer.setData("favorite", property.id);
  };

  // Drop the favorite items from the favorite tab
  const handleDropOutsideFavorites = (e) => {
    e.preventDefault();
    const favoriteId = e.dataTransfer.getData("favorite");
    if (favoriteId) {
      handleRemoveFavorite(favoriteId);
    }
  };

  // Remove all the favorite items
  const handleRemoveAllFavorites = () => {
    setFavorites([]);
  };

    // Filtering in advanced search 
    const filteredProperties = properties.filter(property => {
        const matchesBasicSearch = property.type.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesAdvancedSearch = Object.keys(advancedSearchCriteria).every(key => {
            if (!property[key]) return true; 
            return property[key].toString().toLowerCase().includes(advancedSearchCriteria[key].toLowerCase());
        });

        return showAdvancedSearch ? matchesAdvancedSearch : matchesBasicSearch;
    });

    return (
      <Router>
          <Routes>
              <Route path="/" element={
                  <div className="App">
                    <Header onBasicSearch={handleBasicSearch} toggleAdvancedSearch={toggleAdvancedSearch} />
                    <div className="app-container" onDrop={handleDropOutsideFavorites} onDragOver={(e) => e.preventDefault()}>
                      <div className="current-view">
                        {showAdvancedSearch && <AdvancedSearch onSearchChange={handleAdvancedSearchChange} />}
                        <div className="property-list">
                            {filteredProperties.map(property => (
                                <PropertyCard key={property.id} property={property} onDragStart={handleDragStart} onFavorite={handleFavorite} />
                            ))}
                        </div>
                      </div>
                      <div className="favorite-cart">
                        <FavoriteCart onDrop={handleDrop} favorites={favorites} onRemove={handleRemoveFavorite} onDragStartFavorite={handleDragStartFavorite} onRemoveAll={handleRemoveAllFavorites}/>
                      </div>
                    </div>
                  </div>
              } />
              <Route path="/property/:id" element={<PropertyDetail />} />
          </Routes>
      </Router>
  );
};

export default App;
