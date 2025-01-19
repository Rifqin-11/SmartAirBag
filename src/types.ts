export interface SafetyData {
  id: string;
  airbagPressure: number;
  speed: number;
  isDeployed: boolean;
  timestamp: string;
  carType: string; // Tambahkan properti carType
  cities: string; // Tambahkan properti carType
  province: string; // Tambahkan properti carType
  latitude: number; // Tambahkan latitude
  longitude: number; // Tambahkan longitude
  licensePlate: string; // Tambahkan longitude
  postAccidentSpeed?: number | null;
}