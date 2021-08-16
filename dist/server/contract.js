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
const data_1 = require("../helpers/data");
const firebase_1 = require("./firebase");
function getContractsAndBills({ contractId }, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const contract = yield firebase_1.firestore()
            .collection('CONTRACTS')
            .doc(contractId)
            .get()
            .then(snap => data_1.objFromSnap(snap));
        const bill = yield firebase_1.firestore()
            .doc(contract.billPath)
            .get()
            .then(snap => data_1.objFromSnap(snap));
        const restaurant = yield firebase_1.firestore()
            .collection('RESTAURANTS')
            .doc(bill.items[contract.itemId].restaurantId)
            .get()
            .then(snap => data_1.objFromSnap(snap));
        return {
            contract, bill, restaurant
        };
    });
}
exports.getContractsAndBills = getContractsAndBills;
//# sourceMappingURL=contract.js.map