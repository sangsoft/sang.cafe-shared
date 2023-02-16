"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentPosition = exports.calculateMiddlePoint = exports.calculateGMapZoom = exports.calculateCoordinatesDistance = exports.calculateDistance = void 0;
function calculateDistance(lat1, lng1, lat2, lng2) {
    const p = 0.017453292519943295; // Math.PI / 180
    const c = Math.cos;
    const a = 0.5 - c((lat2 - lat1) * p) / 2 + (c(lat1 * p) * c(lat2 * p) * (1 - c((lng2 - lng1) * p))) / 2;
    const distance = 12742 * Math.asin(Math.sqrt(a)) * 1000; // 2 * R; R = 6371 km
    return parseInt(distance.toFixed(2));
}
exports.calculateDistance = calculateDistance;
function calculateCoordinatesDistance(loc1, loc2) {
    return calculateDistance(loc1.lat, loc1.lng, loc2.lat, loc2.lng);
}
exports.calculateCoordinatesDistance = calculateCoordinatesDistance;
function calculateGMapZoom(mapSize, coverage, latitude, distance, minZoomLevel, maxZoomLevel) {
    const pixels = (mapSize === null || mapSize === void 0 ? void 0 : mapSize.width) >= (mapSize === null || mapSize === void 0 ? void 0 : mapSize.height) ? mapSize === null || mapSize === void 0 ? void 0 : mapSize.height : mapSize === null || mapSize === void 0 ? void 0 : mapSize.width;
    const k = pixels * 156543.03392 * Math.cos((latitude * Math.PI) / 180);
    const zoom = Math.round(Math.log((coverage * k) / (distance * 100)) / 0.6931471805599453) - 1;
    return zoom > maxZoomLevel ? maxZoomLevel : zoom < minZoomLevel ? minZoomLevel : zoom;
}
exports.calculateGMapZoom = calculateGMapZoom;
function calculateMiddlePoint(locations) {
    return {
        lat: locations.map(({ lat }) => lat).reduce((result, lat) => result + lat, 0) / locations.length,
        lng: locations.map(({ lng }) => lng).reduce((result, lng) => result + lng, 0) / locations.length,
    };
}
exports.calculateMiddlePoint = calculateMiddlePoint;
function getCurrentPosition() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(function (myResolve, myReject) {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition((position) => {
                    myResolve(position);
                    console.log(position);
                }, (error) => {
                    myReject(error);
                    console.log(error);
                });
            }
        });
    });
}
exports.getCurrentPosition = getCurrentPosition;
//# sourceMappingURL=geo.js.map