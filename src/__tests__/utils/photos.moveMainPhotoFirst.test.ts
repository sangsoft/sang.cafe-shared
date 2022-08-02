import 'jest';
import { moveMainPhotoFirst } from '../../helpers/photos';

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
    ])('moveMainPhotoFirst(%p) should be %p', (input: { main?: boolean }[], expected: { main?: boolean }[]) => {
      expect(moveMainPhotoFirst(input)).toEqual(expected);
    });
  });
});