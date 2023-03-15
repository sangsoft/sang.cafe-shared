import 'jest';
import { findClustersOfAdjacentNumbers } from '../../helpers/arrays';

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
    ])('findClustersOfAdjacentNumbers(%p) should be %p', (ar: number[], expected: number[][]) => {
      expect(findClustersOfAdjacentNumbers(ar)).toEqual(expected);
    });
  });
});
