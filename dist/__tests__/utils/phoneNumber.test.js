"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const phoneNumber_1 = require("../../helpers/phoneNumber");
describe('utils', () => {
    describe('phone number', () => {
        it.each([
            ['+84328888888', '0328888888'],
            ['(+84) 328 888 888', '0328888888'],
            ['+8432888888', null],
            ['0328888888', '0328888888'],
            ['032 888 8888', '0328888888'],
        ])('normalizePhoneNumberNationalNoThrow(%p) should be %p', (input, expected) => {
            expect((0, phoneNumber_1.normalizePhoneNumberNationalNoThrow)(input)).toEqual(expected);
        });
    });
});
//# sourceMappingURL=phoneNumber.test.js.map