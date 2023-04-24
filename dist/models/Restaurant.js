"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantStatus = exports.BasementType = exports.PremiseType = exports.RoadDirection = exports.StreetLaneType = exports.StreetType = exports.PavementStatus = exports.OwnerType = void 0;
var OwnerType;
(function (OwnerType) {
    OwnerType["GOVERNMENT"] = "government";
    OwnerType["ORGANIZATION"] = "organization";
    OwnerType["INDIVIDUAL"] = "individual";
})(OwnerType = exports.OwnerType || (exports.OwnerType = {}));
var PavementStatus;
(function (PavementStatus) {
    PavementStatus["PAVEMENT_WITH_MOTORBIKE_PARKING"] = "pavement-with-motorbike-parking";
    PavementStatus["PAVEMENT_WITHOUT_MOTORBIKE_PARKING"] = "pavement-without-parking";
    PavementStatus["NO_PAVEMENT"] = "no-pavement";
    PavementStatus["PAVEMENT_SMALLER_THAN_3M"] = "pavement-smaller-than-3m";
    PavementStatus["PAVEMENT_3_6M"] = "pavement-3-6m";
    PavementStatus["PAVEMENT_LARGER_THAN_6M"] = "pavement-larger-than-6m";
})(PavementStatus = exports.PavementStatus || (exports.PavementStatus = {}));
var StreetType;
(function (StreetType) {
    StreetType["ALLEYWAY_ONLY_MOTORBIKE"] = "alleyway-only-motorbike";
    StreetType["ALLEYWAY_CAR_CAN_ENTER"] = "alleyway-car-can-enter";
    StreetType["STREET_1_WAY"] = "street-1-way";
    StreetType["STREET_2_WAY_NO_SEPARATION"] = "street-2-way-no-separation";
    StreetType["STREET_2_WAY_WITH_HARD_SEPARATION"] = "street-2-way-with-hard-separation";
})(StreetType = exports.StreetType || (exports.StreetType = {}));
var StreetLaneType;
(function (StreetLaneType) {
    StreetLaneType["WITH_1_LANE"] = "1-lane";
    StreetLaneType["WITH_2_LANE"] = "2-lane";
    StreetLaneType["WITH_4_LANE"] = "4-lane";
    StreetLaneType["WITH_6_LANE"] = "6-lane";
    StreetLaneType["MORE_THAN_6_LANE"] = "more-than-6-lane";
})(StreetLaneType = exports.StreetLaneType || (exports.StreetLaneType = {}));
var RoadDirection;
(function (RoadDirection) {
    RoadDirection["ONE_WAY_ROAD"] = "one-way-road";
    RoadDirection["TWO_WAY_ROAD"] = "two-way-road";
})(RoadDirection = exports.RoadDirection || (exports.RoadDirection = {}));
var PremiseType;
(function (PremiseType) {
    PremiseType["VILLA"] = "villa";
    PremiseType["SEMI_DETACHED"] = "semi-detached";
    PremiseType["EMPTY_LAND"] = "empty-land";
    PremiseType["OFFICE_BUILDING"] = "office-building";
    PremiseType["SHOP_HOUSE"] = "shop-house";
    PremiseType["COMMERCIAL_FLOOR"] = "commercial-floor";
    PremiseType["HOTEL"] = "hotel";
    PremiseType["ROW_HOUSE"] = "row_house";
})(PremiseType = exports.PremiseType || (exports.PremiseType = {}));
var BasementType;
(function (BasementType) {
    BasementType["MOTORBIKE_ONLY"] = "motobike-only";
    BasementType["CAR_ONLY"] = "car-only";
    BasementType["MIXED"] = "mixed";
})(BasementType = exports.BasementType || (exports.BasementType = {}));
var RestaurantStatus;
(function (RestaurantStatus) {
    RestaurantStatus["FULL_INFO"] = "done";
    RestaurantStatus["IMAGES_AND_ADDRESS_ONLY"] = "images-and-address-only";
    RestaurantStatus["HAS_LAND_USE_CERTIFICATE"] = "has-land-use-cert";
    RestaurantStatus["ARCHIVED"] = "archived";
})(RestaurantStatus = exports.RestaurantStatus || (exports.RestaurantStatus = {}));
//# sourceMappingURL=Restaurant.js.map