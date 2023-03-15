"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const arrays_1 = require("../../helpers/arrays");
describe('utils', () => {
    describe('findClustersOfAdjacentNumbers', () => {
        it.each([
            [[3, 1, 2], [[1, 2, 3]]],
            [
                [1, 2, 3, 5, 8, 9, 10],
                [[1, 2, 3], [5], [8, 9, 10]],
            ],
            [
                [1, 8, 3, 9, 5, 10, 2],
                [[1, 2, 3], [5], [8, 9, 10]],
            ],
            [
                [-4, -2, -1, 1, 8, 3, 9, 5, 10, 2],
                [[-4], [-2, -1], [1, 2, 3], [5], [8, 9, 10]],
            ],
            [
                [-1, 3, 4, 5, 6, 7, 12],
                [[-1], [3, 4, 5, 6, 7], [12]],
            ],
        ])('findClustersOfAdjacentNumbers(%p) should be %p', (ar, expected) => {
            expect((0, arrays_1.findClustersOfAdjacentNumbers)(ar)).toEqual(expected);
        });
    });
});
//# sourceMappingURL=arrays.findClustersOfAdjacentNumbers.test.js.map