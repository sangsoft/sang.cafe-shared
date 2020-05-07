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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = require("./firebase");
const data_1 = require("./data");
const view_level_1 = require("./view-level");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
function restaurantFromSnap(doc) {
    let data = data_1.objFromSnap(doc);
    if (data && data.place) {
        data.place = {
            geometry: data.place.geometry,
            url: data.place.url
        };
    }
    return data;
}
function getRestaurant({ id }) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = null;
        return firebase_1.firestore()
            .collection('RESTAURANTS')
            .doc(id)
            .get()
            .then((snap) => {
            const restaurant = restaurantFromSnap(snap);
            if (!restaurant) {
                return null;
            }
            if (!restaurant.show && (!user || restaurant.ownerId !== user.uid)) {
                return null;
            }
            return view_level_1.removeLevelSpecificData({ user, restaurant });
        });
    });
}
exports.getRestaurant = getRestaurant;
function getRestaurantsInList({ ids }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!ids || ids.length === 0) {
            return [];
        }
        return firebase_1.firestore()
            .collection('RESTAURANTS')
            .where(firebase_admin_1.default.firestore.FieldPath.documentId(), 'in', ids)
            .get()
            .then((snap) => {
            let restaurants = [];
            snap.forEach((doc) => {
                restaurants.push(restaurantFromSnap(doc));
            });
            return restaurants;
        });
    });
}
exports.getRestaurantsInList = getRestaurantsInList;
//# sourceMappingURL=restaurant.js.map