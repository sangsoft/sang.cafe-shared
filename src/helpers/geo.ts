import { Coordinate } from '../models/Geo';

export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const p = 0.017453292519943295; // Math.PI / 180
  const c = Math.cos;
  const a = 0.5 - c((lat2 - lat1) * p) / 2 + (c(lat1 * p) * c(lat2 * p) * (1 - c((lng2 - lng1) * p))) / 2;
  const distance = 12742 * Math.asin(Math.sqrt(a)) * 1000; // 2 * R; R = 6371 km
  return parseInt(distance.toFixed(2));
}

export function calculateCoordinatesDistance(loc1: Coordinate, loc2: Coordinate): number {
  return calculateDistance(loc1.lat, loc1.lng, loc2.lat, loc2.lng);
}

export function calculateGMapZoom(
  mapSize: {
    width: number;
    height: number;
  },
  coverage: number,
  latitude: number,
  distance: number,
  minZoomLevel: number,
  maxZoomLevel: number,
): number {
  const pixels = mapSize?.width >= mapSize?.height ? mapSize?.height : mapSize?.width;
  const k = pixels * 156543.03392 * Math.cos((latitude * Math.PI) / 180);
  const zoom = Math.round(Math.log((coverage * k) / (distance * 100)) / 0.6931471805599453) - 1;
  return zoom > maxZoomLevel ? maxZoomLevel : zoom < minZoomLevel ? minZoomLevel : zoom;
}

export function calculateMiddlePoint(locations: Coordinate[]): Coordinate {
  return {
    lat: locations.map(({ lat }) => lat).reduce((result, lat) => result + lat, 0) / locations.length,
    lng: locations.map(({ lng }) => lng).reduce((result, lng) => result + lng, 0) / locations.length,
  };
}

export async function getCurrentPosition(): Promise<unknown> {
  return new Promise(function (myResolve: (value: unknown) => void, myReject: (reason?: any) => void) {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          myResolve(position);
          console.log(position);
        },
        (error) => {
          myReject(error);
          console.log(error);
        },
      );
    }
  });
}
