import React, { useContext, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { DataContext } from '../components/DataContext';

function MapOverview() {
  const { safetyData } = useContext(DataContext); // Mengambil data dari context
  const [isLoading, setIsLoading] = useState(true); // State untuk loading status

  // Simulasi loading saat pertama kali render
  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 animate-pulse">Loading map...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="w-full mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Map Overview</h1>
        </div>

        {/* Map Container */}
        <MapContainer
          center={[-6.200000, 106.816666]} // Default center (Jakarta)
          zoom={6}
          className="w-full h-[500px] rounded-lg shadow-lg"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {safetyData.map((dataPoint) => (
            <Marker
              key={dataPoint.id}
              position={[dataPoint.latitude, dataPoint.longitude]}
            >
              <Popup>
                <p>
                  <strong>Car Type:</strong> {dataPoint.carType}
                </p>
                <p>
                  <strong>City:</strong> {dataPoint.cities}
                </p>
                <p>
                  <strong>Status:</strong>{' '}
                  <span
                    className={`font-semibold ${
                      dataPoint.isDeployed ? 'text-red-600' : 'text-green-600'
                    }`}
                  >
                    {dataPoint.isDeployed ? 'Accident' : 'Active'}
                  </span>
                </p>
                <a
                  href={`https://www.google.com/maps?q=${dataPoint.latitude},${dataPoint.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 underline"
                >
                  Open in Google Maps
                </a>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapOverview;
