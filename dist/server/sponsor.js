"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getRightColSponsors = exports.getBannerSponsors = exports.getSponsors = exports.provideSponsorsWithRestaurantData = void 0;
const data_1 = require("../helpers/data");
const firebase_1 = require("./firebase");
const admin = __importStar(require("firebase-admin"));
const constants_1 = require("../constants");
const restaurant_1 = require("./restaurant");
const shuffle_array_1 = __importDefault(require("shuffle-array"));
function provideSponsorsWithRestaurantData({ sponsors }, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        let restaurantIds = sponsors.map((sponsor) => sponsor.restaurantId);
        let restaurants = yield (0, restaurant_1.getRestaurantsInList)({ ids: restaurantIds }, ctx);
        return (0, shuffle_array_1.default)((sponsors || []).map((sponsor, index) => (Object.assign(Object.assign({}, sponsor), { restaurant: restaurants.find(restaurant => restaurant.uid === sponsor.restaurantId) }))));
    });
}
exports.provideSponsorsWithRestaurantData = provideSponsorsWithRestaurantData;
function getSponsors({ plans, limit }, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const random = require('random');
        const increment = admin.firestore.FieldValue.increment(1);
        let sponsors = yield (0, firebase_1.firestore)()
            .collection('SPONSORS')
            .where('expiredAt', '>', admin.firestore.Timestamp.now())
            .where('planId', 'in', plans)
            .where('disabled', '==', false)
            .orderBy('expiredAt', 'desc')
            .get()
            .then((snap) => {
            return snap.docs;
        });
        // filter out duplicated sponsors
        sponsors = sponsors
            .reduce((result, sponsor) => {
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
            return (0, data_1.objFromSnap)(doc);
        });
    });
}
exports.getSponsors = getSponsors;
function getBannerSponsors(options, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        let sponsorAutomatics = yield getSponsors({
            plans: ['sponsor_automatic'],
            limit: 8
        }, ctx);
        let sponsors = yield getSponsors({
            plans: ['sponsor_top_banner', 'sponsor_advance'],
            limit: 16
        }, ctx);
        return provideSponsorsWithRestaurantData({
            sponsors: sponsorAutomatics.concat(sponsors)
        }, ctx);
    });
}
exports.getBannerSponsors = getBannerSponsors;
function getRightColSponsors(_, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const sponsors = yield getSponsors({
            plans: ['sponsor_right_bar', 'sponsor_advance', 'sponsor_automatic'],
            limit: constants_1.RIGHT_COL_SPONSOR_LIMIT
        }, ctx);
        return provideSponsorsWithRestaurantData({ sponsors }, ctx);
    });
}
exports.getRightColSponsors = getRightColSponsors;
//# sourceMappingURL=sponsor.js.map