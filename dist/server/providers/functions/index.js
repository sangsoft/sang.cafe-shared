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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
exports.callCloudFunction = (functionName, data = {}) => __awaiter(void 0, void 0, void 0, function* () {
    let url = `https://asia-east2-${process.env.FIREBASE_PROJECT_ID}.cloudfunctions.net/${functionName}`;
    return node_fetch_1.default(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
    })
        .then(res => res.json())
        .then(result => result.result);
});
exports.getBannerSponsors = exports.callCloudFunction.bind(null, 'getBannerSponsors');
exports.getRestaurant = exports.callCloudFunction.bind(null, 'getRestaurant');
//# sourceMappingURL=index.js.map