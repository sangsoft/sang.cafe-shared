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
exports.findIpRange = exports.findBigIntIpRange = exports.ipToBigInteger = void 0;
const ip_address_1 = require("ip-address");
const firebase_1 = require("../server/firebase");
const data_1 = require("./data");
function ipToBigInteger(ip) {
    let address;
    try {
        address = new ip_address_1.Address4(ip);
    }
    catch (e) {
        address = new ip_address_1.Address6(ip);
    }
    return address.bigInteger().toString();
}
exports.ipToBigInteger = ipToBigInteger;
function findBigIntIpRange(bigInt) {
    return __awaiter(this, void 0, void 0, function* () {
        const snap = yield (0, firebase_1.firestore)()
            .collection('IP_RANGES')
            .where('fromBigInt', '<=', bigInt)
            .orderBy('fromBigInt', 'desc')
            .limit(1)
            .get();
        if (snap.empty) {
            return null;
        }
        const range = (0, data_1.objFromSnap)(snap.docs[0]);
        if (range.toBigInt >= bigInt) {
            return range;
        }
        return null;
    });
}
exports.findBigIntIpRange = findBigIntIpRange;
function findIpRange(ip) {
    return __awaiter(this, void 0, void 0, function* () {
        const bigInt = ipToBigInteger(ip);
        return findBigIntIpRange(bigInt);
    });
}
exports.findIpRange = findIpRange;
//# sourceMappingURL=ip.js.map