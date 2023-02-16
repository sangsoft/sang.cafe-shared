import { Coordinate } from '../models/Geo';
export declare function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number;
export declare function calculateCoordinatesDistance(loc1: Coordinate, loc2: Coordinate): number;
export declare function calculateGMapZoom(mapSize: {
    width: number;
    height: number;
}, coverage: number, latitude: number, distance: number, minZoomLevel: number, maxZoomLevel: number): number;
export declare function calculateMiddlePoint(locations: Coordinate[]): Coordinate;
export declare function getCurrentPosition(): Promise<unknown>;
