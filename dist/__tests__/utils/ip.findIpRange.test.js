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
const ip_1 = require("../../helpers/ip");
describe('utils', () => {
    describe('ip', () => {
        describe('findIpRange', () => {
            it.each([
                // These are real life customer IP recorded in our DB
                ['118.68.96.242', 'Hà Nội'],
                ['171.237.198.246', 'Hà Nội'],
                ['27.73.122.12', 'Hà Nội'],
                ['171.253.182.164', 'Hồ Chí Minh'],
                ['14.162.202.22', 'Hà Nội'],
                ['2001:ee0:4fcc:55c0:c039:d1da:723f:583c', 'Hà Nội'],
                ['2001:ee0:5007:2760:24ca:84ae:7581:355', 'Hồ Chí Minh'],
                ['2402:800:6314:2a3d:985f:2283:95cd:1a6f', 'Hà Nội'],
                // Random foreign IP
                ['45.146.54.42', null],
                ['193.36.225.200', null],
                ['85.203.21.7', null],
                ['154.16.51.24', null],
                // Edge cases
                ['118.68.96.255', 'Hà Nội'],
                ['118.68.96.0', 'Hà Nội'],
                ['171.253.182.255', 'Hồ Chí Minh'],
                ['171.253.182.0', 'Hồ Chí Minh'],
                ['253.143.197.106', null],
            ])('findIpRange(%p) should be %p', (ip, expected) => __awaiter(void 0, void 0, void 0, function* () {
                const range = yield ip_1.findIpRange(ip);
                console.log(range);
                if (expected) {
                    expect(range.city).toBe(expected);
                }
                else {
                    expect(range).toBeNull;
                }
            }));
        });
    });
});
//# sourceMappingURL=ip.findIpRange.test.js.map