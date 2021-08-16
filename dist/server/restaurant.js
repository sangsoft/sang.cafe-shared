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
const data_1 = require("../helpers/data");
const view_level_1 = require("./view-level");
const constants_1 = require("../constants");
const times_1 = require("../helpers/times");
const admin = __importStar(require("firebase-admin"));
const sponsor_1 = require("./sponsor");
const algolia_1 = require("../helpers/algolia");
const content_1 = require("../helpers/content");
function restaurantFromSnap(doc, { keepSource, cleanContent, }) {
    const data = data_1.objFromSnap(doc);
    if (data.place) {
        data.place = {
            geometry: data.place.geometry,
            url: data.place.url,
        };
    }
    if (cleanContent && data.brokerage) {
        data.description = content_1.cleanPhoneNumber(data.description);
    }
    if (!keepSource) {
        // eslint-disable-next-line
        delete data.source;
    }
    return data;
}
exports.restaurantFromSnap = restaurantFromSnap;
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
            const restaurant = restaurantFromSnap(snap, { keepSource: false, cleanContent: true });
            if (!restaurant.show) {
                if (!user) {
                    return null;
                }
                if (restaurant.ownerId !== user.uid && !user.admin) {
                    return null;
                }
            }
            return view_level_1.removeLevelSpecificData({ user, restaurant });
        });
    });
}
exports.getRestaurant = getRestaurant;
function getRestaurantBySlug({ slug }, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = null;
        return firebase_1.firestore()
            .collection('RESTAURANTS')
            .where('slug', '==', slug)
            .limit(1)
            .get()
            .then((snap) => {
            if (snap.empty) {
                return null;
            }
            const restaurant = restaurantFromSnap(snap.docs[0], { keepSource: false, cleanContent: true });
            if (!restaurant.show) {
                if (!user) {
                    return null;
                }
                if (restaurant.ownerId !== user.uid && !user.admin) {
                    return null;
                }
            }
            return view_level_1.removeLevelSpecificData({ user, restaurant });
        });
    });
}
exports.getRestaurantBySlug = getRestaurantBySlug;
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
            return snap.docs.map(doc => {
                const restaurant = restaurantFromSnap(doc, { keepSource: false, cleanContent: true });
                return view_level_1.removeLevelSpecificData({ user, restaurant });
            });
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
        let results = yield Promise.all(data_1.divideIntoLessThan10(ids)
            .map((part) => {
            return firebase_1.firestore()
                .collection('RESTAURANTS')
                .where(admin.firestore.FieldPath.documentId(), 'in', part)
                .get()
                .then((snap) => {
                const data = snap.docs.map(doc => restaurantFromSnap(doc, { keepSource: false, cleanContent: true }));
                return part.map(id => data.find((restaurant) => restaurant.uid === id));
            });
        }));
        return results
            .reduce((result, part) => result.concat(part), []);
    });
}
exports.getRestaurantsInList = getRestaurantsInList;
function getRestaurantsByPage(options, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        return algolia_1.searchRestaurant({ page: options.page }, ctx);
    });
}
exports.getRestaurantsByPage = getRestaurantsByPage;
function getRestaurantsByCursor(options, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = firebase_1.firestore()
            .collection('RESTAURANTS')
            .where('show', '==', true)
            .orderBy('createdAt', 'desc');
        if (!options) {
            query = query.limit(constants_1.ITEM_PER_PAGE_FULL);
        }
        else if (options.after) {
            console.log('Getting restaurants after', new Date(options.after));
            query = query
                .startAfter(admin.firestore.Timestamp.fromDate(new Date(options.after)))
                .limit(constants_1.ITEM_PER_PAGE_FULL);
        }
        else if (options.before) {
            console.log('Getting restaurants before', new Date(options.before));
            query = query
                .endBefore(admin.firestore.Timestamp.fromDate(new Date(options.before)))
                .limitToLast(constants_1.ITEM_PER_PAGE_FULL);
        }
        else {
            query = query.limit(constants_1.ITEM_PER_PAGE_FULL);
        }
        return query
            .get()
            .then((snap) => {
            return snap.docs.map(doc => {
                const restaurant = restaurantFromSnap(doc, { keepSource: false, cleanContent: true });
                return view_level_1.removeLevelSpecificData({ user: null, restaurant });
            });
        });
    });
}
exports.getRestaurantsByCursor = getRestaurantsByCursor;
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
                return restaurantFromSnap(doc, { keepSource: false, cleanContent: true });
            });
        });
    });
}
exports.getAllRestaurants = getAllRestaurants;
function getLastestRestaurants({ limit }, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        return firebase_1.firestore()
            .collection('RESTAURANTS')
            .where('show', '==', true)
            .orderBy('createdAt', 'desc')
            .limit(limit)
            .get()
            .then((snap) => {
            return snap.docs.map((doc) => {
                return restaurantFromSnap(doc, { keepSource: false, cleanContent: true });
            });
        });
    });
}
exports.getLastestRestaurants = getLastestRestaurants;
//# sourceMappingURL=restaurant.js.map