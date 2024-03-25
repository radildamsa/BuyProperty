import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './PropertyDetail.css';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const PropertyDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [property, setProperty] = useState(null);

    useEffect(() => {
        fetch('/properties.json')
            .then(response => response.json())
            .then(data => {
                const detail = data.properties.find(p => p.id === id);
                setProperty(detail);
            });
    }, [id]);

    if (!property) {
        return <div>Loading...</div>;
    }

    const images = property.pictures.map(pic => ({
        original: pic,
        thumbnail: pic 
    }));

   
    const containerStyle = {
        width: '100%',
        height: '400px'
    };

    const center = {
        lat: property.latitude,
        lng: property.longitude
    };

    const formatDate = (added) => {
        return `${added.month} ${added.day}, ${added.year}`;
    };

    const handleBack = () => {
        navigate('/'); 
    };

    return (
        <div className="property-detail-container">
            <h2>{property.type}</h2>
            <ImageGallery items={images} />
            <div className="property-info">
            </div>
            <LoadScript googleMapsApiKey="GOOGLE_MAPS_API_KEY">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={15}
                >
                    <Marker position={center} />
                </GoogleMap>
            </LoadScript>
            <div>
                <p><strong>Type:</strong> {property.type}</p>
                <p><strong>Price:</strong> ${property.price.toLocaleString()}</p>
                <p><strong>Location:</strong> {property.location}</p>
                <p><strong>Added Date:</strong> {formatDate(property.added)}</p>
                <Tabs>
                <TabList>
                    <Tab>Description</Tab>
                    <Tab>Floor Plan</Tab>
                </TabList>

                <TabPanel>
                    <p>{property.description}</p>
                </TabPanel>
                <TabPanel>
                    <img src={property.floorPlan} alt="Floor Plan" />
                </TabPanel>
            </Tabs>
            </div>
            <center><button className="back-button" onClick={handleBack}>Back to Home</button></center>
        </div>
    );
};

export default PropertyDetail;
