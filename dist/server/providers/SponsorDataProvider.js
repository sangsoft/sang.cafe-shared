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
const ServerDataProvider_1 = require("./ServerDataProvider");
const sponsor_1 = require("../sponsor");
class SponsorDataProvider extends ServerDataProvider_1.ServerDataProvider {
    shouldProvideData(ctx) {
        return true;
    }
    onPrepareData(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                sponsors: yield sponsor_1.getBannerSponsors(),
            };
        });
    }
}
exports.SponsorDataProvider = SponsorDataProvider;
//# sourceMappingURL=SponsorDataProvider.js.map