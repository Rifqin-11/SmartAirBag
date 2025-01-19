import React, { createContext, useState, useEffect, ReactNode } from 'react';
import type { SafetyData } from '../types';

export const DataContext = createContext<{
  safetyData: SafetyData[];
  searchQuery: string;
  sortedBy: 'timestamp' | 'status' | 'location';
  selectedProvince: string;
  setSearchQuery: (query: string) => void;
  setSortedBy: (sort: 'timestamp' | 'status' | 'location') => void;
  setSelectedProvince: (province: string) => void;
}>({
  safetyData: [],
  searchQuery: '',
  sortedBy: 'timestamp',
  selectedProvince: '',
  setSearchQuery: () => {},
  setSortedBy: () => {},
  setSelectedProvince: () => {},
});

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [safetyData, setSafetyData] = useState<SafetyData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortedBy, setSortedBy] = useState<'timestamp' | 'status' | 'location'>('timestamp');
  const [selectedProvince, setSelectedProvince] = useState('');

  useEffect(() => {
    const initialData = Array.from({ length: 5 }, generateMockData);
    setSafetyData(initialData);

    const interval = setInterval(() => {
      setSafetyData((prevData) => {
        const newData = [...prevData, generateMockData()];
        return newData.slice(-50); // Keep only the last 50 records
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const contextValue = {
    safetyData,
    searchQuery,
    sortedBy,
    selectedProvince,
    setSearchQuery,
    setSortedBy,
    setSelectedProvince,
  };

  return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};

// Mock data generator function (dari kode Anda)
function generateMockData(): SafetyData {
    const carTypes = ['BYD Seal', 'Porsche 911', 'Fortuner', 'Civic Hatchback', 'Avanza', 'Wuling Air EV', 'Ioniq 5', 'Pajero', 'Jimmy', 'Jeep Wrangler'];
    const cities = [
        { name: 'Jakarta', latitude: -6.2088 + (Math.random() - 0.5) * 0.01, longitude: 106.8456 + (Math.random() - 0.5) * 0.01 },
        { name: 'Surabaya', latitude: -7.2504 + (Math.random() - 0.5) * 0.01, longitude: 112.7688 + (Math.random() - 0.5) * 0.01 },
        { name: 'Bandung', latitude: -6.9175 + (Math.random() - 0.5) * 0.01, longitude: 107.6191 + (Math.random() - 0.5) * 0.01 },
        { name: 'Yogyakarta', latitude: -7.7956 + (Math.random() - 0.5) * 0.01, longitude: 110.3695 + (Math.random() - 0.5) * 0.01 },
        { name: 'Medan', latitude: 3.5957 + (Math.random() - 0.5) * 0.01, longitude: 98.6722 + (Math.random() - 0.5) * 0.01 },
        { name: 'Semarang', latitude: -6.9663 + (Math.random() - 0.5) * 0.01, longitude: 110.4195 + (Math.random() - 0.5) * 0.01 },
        { name: 'Banjarnegara', latitude: -7.399737 + (Math.random() - 0.5) * 0.01, longitude: 109.616318 + (Math.random() - 0.5) * 0.01 },
        { name: 'Makassar', latitude: -5.1478 + (Math.random() - 0.5) * 0.01, longitude: 119.4328 + (Math.random() - 0.5) * 0.01 },
        { name: 'Denpasar', latitude: -8.4095 + (Math.random() - 0.5) * 0.01, longitude: 115.1889 + (Math.random() - 0.5) * 0.01 },
        { name: 'Palembang', latitude: -2.9978 + (Math.random() - 0.5) * 0.01, longitude: 104.7752 + (Math.random() - 0.5) * 0.01 },
        { name: 'Malang', latitude: -8.0958 + (Math.random() - 0.5) * 0.01, longitude: 112.6326 + (Math.random() - 0.5) * 0.01 },
        { name: 'Samarinda', latitude: -0.494823 + (Math.random() - 0.5) * 0.01, longitude: 117.143616 + (Math.random() - 0.5) * 0.01 },
      ];
      
  
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const provinceMap: { [key: string]: string } = {
      Jakarta: 'DKI Jakarta',
      Surabaya: 'Jawa Timur',
      Bandung: 'Jawa Barat',
      Yogyakarta: 'DI Yogyakarta',
      Medan: 'Sumatera Utara',
      Semarang: 'Jawa Tengah',
      Banjarnegara: 'Jawa Tengah',
      Makassar: 'Sulawesi Selatan',
      Denpasar: 'Bali',
      Palembang: 'Sumatera Selatan',
      Malang: 'Jawa Timur',
      Samarinda: 'Kalimantan Timur',
    };
  
    const generateLicensePlate = (): string => {
      const prefixes = ['B', 'D', 'L', 'AB', 'F', 'Z', 'N', 'AG', 'K', 'H'];
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const number = Math.floor(Math.random() * 9000) + 100; // 100-9999
      const suffix = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + // First letter
                     (Math.random() < 0.5 ? String.fromCharCode(65 + Math.floor(Math.random() * 26)) : '') + // Optional second letter
                     (Math.random() < 0.3 ? String.fromCharCode(65 + Math.floor(Math.random() * 26)) : ''); // Optional third letter
      return `${prefix} ${number} ${suffix}`.trim();
    };
  
    const isDeployed = Math.random() < 0.1; // 10% chance of deployment
    const speed = Math.random() * 120; // 0-120 km/h
  
    return {
      id: crypto.randomUUID(),
      airbagPressure: Math.random() * (800 - 700) + 700, // 700-800 kPa
      speed,
      isDeployed,
      postAccidentSpeed: isDeployed ? Math.max(0, speed - Math.random() * 50) : null, // Speed after accident
      timestamp: new Date().toISOString(),
      carType: carTypes[Math.floor(Math.random() * carTypes.length)], // Random car type
      cities: randomCity.name, // City name
      province: provinceMap[randomCity.name], // Map province based on city
      latitude: randomCity.latitude, // Latitude based on city
      longitude: randomCity.longitude, // Longitude based on city
      licensePlate: generateLicensePlate(), // Add license plate here
    };
  }
  
