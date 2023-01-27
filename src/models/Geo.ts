export interface Coordinate {
  lat: number;
  lng: number;
}

export interface ILocationInput {
  name: string;
  city: string;
  district: string;
  coor: Coordinate;
  size: number;
  type: string;
  note: string;
  geohash: string;
}

export interface NearByResult {
  location: ILocationInput;
  distance: number;
  distanceManhattan: number;
}

export interface PlaceInfo {
  place_id: string;
  geometry: {
    location: Coordinate;
  };
  address: string;
  formatted_address: string;
  // placeID: string;
  compound: {
    commune: string;
    district: string;
    province: string;
  };
}
