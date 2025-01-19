import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { ArrowLeft } from 'lucide-react';

function HistoryData() {
  const location = useLocation();
  const data = location.state; // Data diterima dari link navigasi

  const [coordinates, setCoordinates] = useState({ lat: -6.200000, lng: 106.816666 }); // Default koordinat Jakarta
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data?.cities) {
      const fetchCoordinates = async () => {
        try {
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
              data.cities
            )}&key=0dcc0b9b6b8144649753fdf0ac1c48a4`
          );
          const result = await response.json();
          if (result?.results?.length > 0) {
            const { lat, lng } = result.results[0].geometry;
            setCoordinates({ lat, lng });
          }
        } catch (error) {
          console.error('Geocoding error:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchCoordinates();
    } else {
      setIsLoading(false);
    }
  }, [data?.cities]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">No Data Available</h1>
          <p className="text-gray-600 mt-2">
            Please go back to the dashboard and select a valid entry.
          </p>
          <Link
            to="/"
            className="inline-flex items-center mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            <ArrowLeft className="mr-2" /> Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">History Details</h1>
          <Link
            to="/"
            className="flex items-center px-4 py-2 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            <ArrowLeft className="mr-2" /> Back to Dashboard
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Data Detail */}
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-medium text-gray-700">Car Type:</h2>
              <p className="text-gray-600">{data.carType}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-lg font-medium text-gray-700">Timestamp:</h2>
              <p className="text-gray-600">{new Date(data.timestamp).toLocaleString()}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-lg font-medium text-gray-700">License Plate:</h2>
              <p className="text-gray-600">{data.licensePlate}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-lg font-medium text-gray-700">Airbag Pressure (kPa):</h2>
              <p className="text-gray-600">{data.airbagPressure.toFixed(2)}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-lg font-medium text-gray-700">Speed (km/h):</h2>
              <p className="text-gray-600">{data.speed.toFixed(1)}</p>
            </div>
            {data.isDeployed && (
              <>
                <div className="mb-4">
                  <h2 className="text-lg font-medium text-gray-700">Speed After Accident (km/h):</h2>
                  <p className="text-gray-600">{data.postAccidentSpeed?.toFixed(1) || 'N/A'}</p>
                </div>
              </>
            )}
            <div className="mb-4">
              <h2 className="text-lg font-medium text-gray-700">Location:</h2>
              <p className="text-gray-600">{data.cities}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-lg font-medium text-gray-700">Status:</h2>
              <p
                className={`text-sm font-medium ${
                  data.isDeployed ? 'text-red-600' : 'text-green-600'
                }`}
              >
                {data.isDeployed ? 'Accident' : 'Active'}
              </p>
            </div>
          </div>
          {/* Map */}
          <div className="w-full h-64">
            {isLoading ? (
              <p className="text-center text-gray-600">Loading map...</p>
            ) : (
              <MapContainer
                center={[coordinates.lat, coordinates.lng]}
                zoom={13}
                className="w-full h-full rounded-lg shadow-lg"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[coordinates.lat, coordinates.lng]}>
                  <Popup>
                    <p>
                      Location: {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
                    </p>
                    <a
                      href={`https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 underline"
                    >
                      Open in Google Maps
                    </a>
                  </Popup>
                </Marker>
              </MapContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryData;
