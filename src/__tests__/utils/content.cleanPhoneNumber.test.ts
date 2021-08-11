import 'jest';
import { cleanPhoneNumber } from '../../helpers/content';
describe('utils', () => {
  describe('content', () => {
    describe('cleanPhoneNumber', () => {
      it.each([
        [
`
Sang cửa hàng ở 108 Nam Đồng, Đống Đa, Hà Nội.
Ai có nhu cầu liên hệ số đt 0328888888.
`,
`
Sang cửa hàng ở {{address}}.
Ai có nhu cầu liên hệ số đt {{phone_number}}.
`
        ],
      ])('cleanPhoneNumber(%p) should be %p', (text: string, expected: string) => {
        expect(cleanPhoneNumber(text)).toEqual(expected);
      })
    });
  });
});