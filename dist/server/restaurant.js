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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = require("./firebase");
const data_1 = require("./data");
const view_level_1 = require("./view-level");
const constants_1 = require("../constants");
const times_1 = require("../helpers/times");
const admin = __importStar(require("firebase-admin"));
const Restaurant_1 = require("../models/Restaurant");
const sponsor_1 = require("./sponsor");
function restaurantFromSnap(doc) {
    let data = data_1.objFromSnap(doc);
    if (data && data.place) {
        data.place = {
            geometry: data.place.geometry,
            url: data.place.url
        };
    }
    return new Restaurant_1.Restaurant(data);
}
function mergeWithSponsor({ sponsors, restaurants, user }, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!restaurants || restaurants.length === 0) {
            return restaurants;
        }
        const ownerId = user ? user.uid : null;
        let sponsoredRestaurants = sponsors.map((sponsor) => view_level_1.removeLevelSpecificData({
            user,
            restaurant: sponsor.restaurant
        }));
        if (ownerId) {
            sponsoredRestaurants = yield provideSavedStatus({
                ownerId,
                restaurants: sponsoredRestaurants
            }, ctx);
        }
        const newRestaurants = restaurants
            .reduce((result, restaurant, index) => {
            const c = [restaurant];
            if (index % 5 == 0) {
                const sponsoredRestaurant = sponsoredRestaurants[index / 5];
                if (sponsoredRestaurant) {
                    c.push(Object.assign(Object.assign({}, sponsoredRestaurant), { ad: true }));
                }
            }
            return result.concat(c);
        }, [])
            .filter((_) => !!_);
        return newRestaurants;
    });
}
exports.mergeWithSponsor = mergeWithSponsor;
function getRestaurant({ id }, ctx) {
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
function provideSavedStatus({ ownerId, restaurants }, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!restaurants || restaurants.length == 0) {
            return restaurants;
        }
        const ids = restaurants.map((restaurant) => restaurant.uid);
        return firebase_1.firestore()
            .collection('USERS')
            .doc(ownerId)
            .collection('SAVED_RESTAURANTS')
            .where('restaurantId', 'in', ids)
            .where('status', '==', true)
            .get()
            .then((snap) => {
            const saved = snap.docs.map(doc => doc.data().restaurantId);
            return restaurants.map((restaurant) => {
                return Object.assign(Object.assign({}, restaurant), { saved: saved.includes(restaurant.uid) });
            });
        });
    });
}
exports.provideSavedStatus = provideSavedStatus;
function getListing({ options, user }, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const ownerId = user ? user.uid : null;
        let query = firebase_1.firestore()
            .collection('RESTAURANTS')
            .where('show', '==', true)
            .orderBy('createdAt', 'desc')
            .limit(constants_1.ITEM_PER_PAGE);
        if (options && options.startAfter) {
            const startAfter = options.startAfter;
            query = query.startAfter(times_1.timestampFromObj(startAfter));
        }
        return query
            .get()
            .then((snap) => {
            return snap.docs.map(doc => restaurantFromSnap(doc));
        })
            .then((restaurants) => ownerId ? provideSavedStatus({ ownerId, restaurants }, ctx) : restaurants);
    });
}
exports.getListing = getListing;
function getRestaurantsInList({ ids }, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!ids || ids.length === 0) {
            return [];
        }
        return firebase_1.firestore()
            .collection('RESTAURANTS')
            .where(admin.firestore.FieldPath.documentId(), 'in', ids)
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
function getRestaurants(options, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user } = ctx;
        const [sponsors, restaurants] = yield Promise.all([
            sponsor_1.getRightColSponsors(null, ctx),
            getListing({ options, user }, ctx)
        ]);
        return mergeWithSponsor({ sponsors, restaurants, user }, ctx);
    });
}
exports.getRestaurants = getRestaurants;
function getAllRestaurants(options, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        return firebase_1.firestore()
            .collection('RESTAURANTS')
            .get()
            .then((snap) => {
            return snap.docs.map((doc) => {
                return restaurantFromSnap(doc);
            });
        });
    });
}
exports.getAllRestaurants = getAllRestaurants;
//# sourceMappingURL=restaurant.js.map