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
const firebase_1 = require("./firebase");
const data_1 = require("./data");
function getLastDeployment() {
    return __awaiter(this, void 0, void 0, function* () {
        return firebase_1.firestore()
            .collection('DEPLOYMENTS')
            .orderBy('createdAt', 'desc')
            .limit(1)
            .get()
            .then((snap) => {
            if (snap.empty) {
                return undefined;
            }
            return data_1.objFromSnap(snap.docs[0]);
        });
    });
}
exports.getLastDeployment = getLastDeployment;
//# sourceMappingURL=deployments.js.map