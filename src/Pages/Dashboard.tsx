import React, { useContext } from 'react';
import { DataContext } from '../components/DataContext';
import { SafetyTable } from '../components/SafetyTable';
import { ArrowDownUp, Search } from 'lucide-react';

function Dashboard() {
  const {
    safetyData,
    searchQuery,
    sortedBy,
    selectedProvince,
    setSearchQuery,
    setSortedBy,
    setSelectedProvince,
  } = useContext(DataContext);

  const uniqueProvinces = Array.from(new Set(safetyData.map((item) => item.province)));

  const filteredData = safetyData
    .filter((item) =>
      (item.carType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.cities.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.province.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.isDeployed ? 'accident' : 'active').toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedProvince === '' || item.province === selectedProvince)
    )
    .sort((a, b) => {
      if (sortedBy === 'timestamp') {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      }
      if (sortedBy === 'status') {
        return Number(b.isDeployed) - Number(a.isDeployed);
      }
      if (sortedBy === 'location') {
        return a.cities.localeCompare(b.cities);
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Vehicle Safety Monitoring System</h1>
        <div className="bg-white p-4 rounded-2xl shadow-lg mb-8">
          <div className="flex items-center gap-4">
            <div className="relative pl-4 flex items-center bg-gray-100 p-2 rounded-3xl w-2/5 text-gray-500">
              <Search className="w-5 h-5 mr-2" />
              <input
                type="text"
                placeholder="Search by car type, city, province, or status"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none w-full"
              />
            </div>
            <div className="flex gap-2 pl-4">
              {['timestamp', 'location', 'status'].map((key) => (
                <button
                  key={key}
                  onClick={() => setSortedBy(key as 'timestamp' | 'location' | 'status')}
                  className={`flex gap-2 px-4 py-2 rounded-3xl font-medium items-center ${
                    sortedBy === key
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                  <ArrowDownUp className="w-5 h-5" />
                </button>
              ))}
            </div>
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="px-2 py-2 rounded-3xl bg-gray-200 text-gray-500"
            >
              <option value="">All Provinces</option>
              {uniqueProvinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Real-time Safety Data</h2>
          <SafetyTable data={filteredData} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
