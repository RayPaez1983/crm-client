/* eslint-disable react-hooks/exhaustive-deps */
import { Loader } from '@googlemaps/js-api-loader';
import React, { useEffect } from 'react';

const MapsG = () => {
  const mapRef = React.useRef<HTMLDivElement>(null);

  // Initial map center position
  const initialPosition = { lat: 4.580165063727831, lng: -74.09684380395284 };

  // Array of marker positions
  const markerPositions = [
    { lat: 4.580165063727831, lng: -74.09684380395284, title: 'Central Park' },
    { lat: 4.580670613379905, lng: -74.10034653181589, title: 'Sergios Place' },
    { lat: 4.578482676919283, lng: -74.0978843828595, title: 'Raymonds Place' },
    {
      lat: 4.578225606141765,
      lng: -74.094,
      title: 'Maitos Place',
    },
  ];

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: 'weekly',
      });

      // Load the required libraries
      const { Map } = await loader.importLibrary('maps');
      const { AdvancedMarkerElement } = await loader.importLibrary('marker');

      // Map options
      const mapOption: google.maps.MapOptions = {
        center: initialPosition,
        zoom: 17,
        mapId: 'MY_NEXTJS_MAPID',
      };

      // Initialize the map
      const map = new Map(mapRef.current as HTMLDivElement, mapOption);

      // Check if AdvancedMarkerElement is available
      if (AdvancedMarkerElement) {
        // Loop through the marker positions and create markers
        markerPositions.forEach((position) => {
          // Create a div element for the marker content
          const content = document.createElement('div');
          content.textContent = position.title; // Set the title as text
          content.style.color = 'white'; // Customize text color
          content.style.backgroundColor = 'black'; // Customize background color
          content.style.padding = '5px'; // Add padding
          content.style.borderRadius = '5px'; // Add rounded corners
          content.style.fontSize = '12px'; // Adjust font size

          // Create the marker with the custom content
          new AdvancedMarkerElement({
            map: map,
            position: position,
            content: content,
          });
        });
      } else {
        console.error('AdvancedMarkerElement is not available.');
      }
    };

    initMap();
  }, [initialPosition, markerPositions]); // Empty dependency array ensures this runs only once

  return <div style={{ height: '600px' }} ref={mapRef}></div>;
};

export default MapsG;
