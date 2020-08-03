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
const functions = __importStar(require("firebase-functions"));
const constants_1 = require("../constants");
const restaurant_1 = require("../server/restaurant");
const view_level_1 = require("../server/view-level");
const sponsor_1 = require("../server/sponsor");
exports.indexes = {};
function lazyInitializeClient() {
    if (!exports.client) {
        const algoliasearch = require('algoliasearch');
        let ALGOLIA_ID = process.env.ALGOLIA_ID;
        let ALGOLIA_SEARCH_KEY = process.env.ALGOLIA_SEARCH_KEY;
        if (functions.config().algolia) {
            ALGOLIA_ID = functions.config().algolia.app_id;
            ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key;
        }
        console.log('ALGOLIA', ALGOLIA_ID, ALGOLIA_SEARCH_KEY);
        exports.client = algoliasearch(ALGOLIA_ID, ALGOLIA_SEARCH_KEY);
        exports.indexes['restaurants'] = exports.client.initIndex('restaurants');
    }
    return exports.client;
}
function searchRestaurant({ name, district, city, type, page, }, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user } = ctx;
        lazyInitializeClient();
        const { hits, nbPages, nbHits, exhaustiveNbHits } = yield exports.indexes['restaurants']
            .search(name || '', {
            page: page || 0,
            hitsPerPage: constants_1.ITEM_PER_PAGE,
            facetFilters: [
                district ? `district:${district}` : null,
                city ? `city:${city}` : null,
                type ? `type:${type}` : null,
                'show:true',
            ].filter(_ => !!_),
        });
        const restaurants = yield restaurant_1.getRestaurantsInList({ ids: hits.map((hit) => hit.objectID) }, ctx)
            .then((restaurants) => restaurants.map((restaurant) => view_level_1.removeLevelSpecificData({
            user, restaurant,
        })))
            .then((restaurants) => __awaiter(this, void 0, void 0, function* () {
            return restaurant_1.mergeWithSponsor({
                sponsors: yield sponsor_1.getRightColSponsors(null, ctx),
                restaurants,
                user,
            }, ctx);
        }));
        return {
            restaurants,
            nbHits,
            nbPages,
            exhaustiveNbHits
        };
    });
}
exports.searchRestaurant = searchRestaurant;
//# sourceMappingURL=algolia.js.map