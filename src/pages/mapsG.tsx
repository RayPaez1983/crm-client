import { Loader } from '@googlemaps/js-api-loader';
import React, { useEffect, useState } from 'react';

const MapsG = () => {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const initialPosition = { lat: 4.6386, lng: -74.1517 };
  const [markerPosition, setMarkerPosition] =
    useState<google.maps.LatLngLiteral>(initialPosition);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: 'weekly',
      });
      const { Map } = await loader.importLibrary('maps');
      const { AdvancedMarkerElement } = await loader.importLibrary('marker');

      const mapOption: google.maps.MapOptions = {
        center: markerPosition,
        zoom: 17,
        mapId: 'MY_NEXTJS_MAPID',
      };

      const map = new Map(mapRef.current as HTMLDivElement, mapOption);
      if (AdvancedMarkerElement) {
        const marker = new AdvancedMarkerElement({
          map: map,
          position: { lat: 37.7749, lng: -122.4194 },
          title: 'Ramon',
        });
      } else {
        console.error('AdvancedMarkerElement is not available.');
      }
    };
    initMap();
  }, [markerPosition]);
  return <div style={{ height: '600px' }} ref={mapRef}></div>;
};

export default MapsG;
