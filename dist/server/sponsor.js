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
const data_1 = require("./data");
const firebase_1 = require("./firebase");
const admin = __importStar(require("firebase-admin"));
const constants_1 = require("../constants");
const restaurant_1 = require("./restaurant");
function provideSponsorsWithRestaurantData({ sponsors }) {
    return __awaiter(this, void 0, void 0, function* () {
        let restaurantIds = sponsors.map((sponsor) => sponsor.restaurantId);
        let restaurants = yield restaurant_1.getRestaurantsInList({ ids: restaurantIds });
        // console.log(sponsors.length, restaurants.length, restaurantIds);
        return (sponsors || []).map((sponsor, index) => (Object.assign(Object.assign({}, sponsor), { restaurant: restaurants[index] })));
    });
}
exports.provideSponsorsWithRestaurantData = provideSponsorsWithRestaurantData;
function getSponsors({ plans, limit }) {
    return __awaiter(this, void 0, void 0, function* () {
        const random = require('random');
        const increment = admin.firestore.FieldValue.increment(1);
        let sponsors = yield firebase_1.firestore()
            .collection('SPONSORS')
            .where('expiredAt', '>', admin.firestore.Timestamp.now())
            .where('planId', 'in', plans)
            .orderBy('expiredAt', 'desc')
            .get()
            .then((snap) => {
            let newSponsors = [];
            snap.forEach((doc) => {
                // And get its value
                newSponsors.push(doc);
            });
            return newSponsors;
        });
        // console.log(sponsors.map(s => s.get('restaurantId')));
        sponsors = sponsors.reduce((result, sponsor) => {
            if (result.find(s => s.get('restaurantId') === sponsor.get('restaurantId'))) {
                return result;
            }
            return result.concat(sponsor);
        }, []);
        let results = [];
        do {
            let index = random.int(0, sponsors.length - 1);
            results.push(sponsors[index]);
            sponsors.splice(index, 1);
        } while (results.length < limit && sponsors.length > 0);
        return results
            .filter(_ => !!_)
            .map((doc) => {
            // Update the pickCount
            doc.ref.update({ pickCount: increment });
            return data_1.objFromSnap(doc);
        });
    });
}
exports.getSponsors = getSponsors;
function getBannerSponsors() {
    return __awaiter(this, void 0, void 0, function* () {
        let sponsors = yield getSponsors({
            plans: ['sponsor_top_banner', 'sponsor_advance'],
            limit: constants_1.ITEM_PER_PAGE
        });
        return provideSponsorsWithRestaurantData({ sponsors });
    });
}
exports.getBannerSponsors = getBannerSponsors;
//# sourceMappingURL=sponsor.js.map