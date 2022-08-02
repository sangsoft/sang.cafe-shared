"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const photos_1 = require("../../helpers/photos");
describe('utils', () => {
    describe('photos', () => {
        it.each([
            [[
                    { main: false },
                    { main: false },
                    { main: false },
                    { main: true },
                    { main: false },
                    { main: false },
                    { main: false },
                    { main: false },
                ], [
                    { main: true },
                    { main: false },
                    { main: false },
                    { main: false },
                    { main: false },
                    { main: false },
                    { main: false },
                    { main: false },
                ]],
        ])('moveMainPhotoFirst(%p) should be %p', (input, expected) => {
            expect(photos_1.moveMainPhotoFirst(input)).toEqual(expected);
        });
    });
});
//# sourceMappingURL=photos.moveMainPhotoFirst.test.js.map