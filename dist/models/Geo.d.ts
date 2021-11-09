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
