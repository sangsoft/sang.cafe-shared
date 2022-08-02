"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserCreateLevel = exports.getUserViewLevel = exports.removeLevelSpecificData = void 0;
const LEVELED_DATA = {
    // Logged in
    [0]: ['contact', 'contactPerson'],
    [1]: ['revenue', 'grossProfit', 'businessLicensePhotoUrl', 'menuPhotoUrl', 'employeeCount', 'hasPos', 'since'],
};
function removeLevelSpecificData({ user, restaurant }) {
    if (user && user.uid === restaurant.ownerId) {
        return restaurant;
    }
    const level = getUserViewLevel(user);
    const newRestaurant = Object.assign({}, restaurant);
    Object.keys(LEVELED_DATA).forEach(key => {
        // console.log('User level', level, 'with', key, 'lower?', key <= level, user)
        if (key <= level) {
            return;
        }
        const properties = LEVELED_DATA[key];
        // console.log('Deleting', properties);
        properties.forEach((keyName) => {
            delete newRestaurant[keyName];
        });
    });
    ['privateAddress', 'privateContact', 'privateContactPerson'].forEach((key) => {
        delete newRestaurant[key];
    });
    return newRestaurant;
}
exports.removeLevelSpecificData = removeLevelSpecificData;
function getUserViewLevel(user) {
    if (!user) {
        return -1;
    }
    if (user.admin) {
        return 999;
    }
    if (!user.buyer) {
        return 0;
    }
    return user.buyer.level;
}
exports.getUserViewLevel = getUserViewLevel;
function getUserCreateLevel(user) {
    if (!user) {
        return -1;
    }
    if (user.admin) {
        return 999;
    }
    if (!user.seller) {
        return 0;
    }
    return user.seller.level;
}
exports.getUserCreateLevel = getUserCreateLevel;
//# sourceMappingURL=view-level.js.map