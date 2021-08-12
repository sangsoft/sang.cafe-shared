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
Sang cửa hàng ở 108 Nam Đồng, Đống Đa, Hà Nội.
Ai có nhu cầu liên hệ số đt {{phone_number}}.
`
        ],
        [
`
Sang cửa hàng ở 108 Nam Đồng, Đống Đa, Hà Nội.
Ai có nhu cầu liên hệ số đt O328888888.
`,
`
Sang cửa hàng ở 108 Nam Đồng, Đống Đa, Hà Nội.
Ai có nhu cầu liên hệ số đt {{phone_number}}.
`
        ],
        [
`
Sang cửa hàng ở 108 Nam Đồng, Đống Đa, Hà Nội.
Ai có nhu cầu liên hệ số đt O32tam888888.
`,
`
Sang cửa hàng ở 108 Nam Đồng, Đống Đa, Hà Nội.
Ai có nhu cầu liên hệ số đt {{phone_number}}.
`
        ],
        [
`
Sang cửa hàng ở 108 Nam Đồng, Đống Đa, Hà Nội.
Ai có nhu cầu liên hệ số đt 032tam888888.
`,
`
Sang cửa hàng ở 108 Nam Đồng, Đống Đa, Hà Nội.
Ai có nhu cầu liên hệ số đt {{phone_number}}.
`
        ],
        [
          `
          Sang cửa hàng ở 108 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt 032 999 9999.
          `,
          `
          Sang cửa hàng ở 108 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt {{phone_number}}.
          `
        ],
        [
          `
          Sang cửa hàng ở 108 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt 0329 999 999.
          `,
          `
          Sang cửa hàng ở 108 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt {{phone_number}}.
          `
        ],
        [
          `
          Sang cửa hàng ở 108 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt (032)-888-3444.
          `,
          `
          Sang cửa hàng ở 108 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt {{phone_number}}.
          `
        ],
        [
          `
          Sang cửa hàng ở 108 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt 032777777bay.
          `,
          `
          Sang cửa hàng ở 108 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt {{phone_number}}.
          `
        ],
        [
          `
          Sang cửa hàng ở 108/265/13/34 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt 032777777bay.
          `,
          `
          Sang cửa hàng ở 108/265/13/34 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt {{phone_number}}.
          `
        ],
        [
          `
          Sang cửa hàng ở 108/265/13/34 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt 032x888888. x = 6
          `,
          `
          Sang cửa hàng ở 108/265/13/34 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt {{phone_number}}.
          `
        ],
        [
          `
          Sang cửa hàng ở 108/265/13/34 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt 032*888888. * = 3
          `,
          `
          Sang cửa hàng ở 108/265/13/34 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt {{phone_number}}.
          `
        ],
        [
          `
          Sang cửa hàng ở 108/265/13/34 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt 032.666.7777.
          `,
          `
          Sang cửa hàng ở 108/265/13/34 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt {{phone_number}}.
          `
        ],
        [
          `
          Sang cửa hàng ở 108/265/13/34 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt 032.666.7777 hoặc 032.999.2222.
          `,
          `
          Sang cửa hàng ở 108/265/13/34 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt {{phone_number}} hoặc {{phone_number}}.
          `
        ],
        [
          `
          Sang cửa hàng ở 108/265/13/34 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt 032777777bay hoặc 032.999.2222.
          `,
          `
          Sang cửa hàng ở 108/265/13/34 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt {{phone_number}} hoặc {{phone_number}}.
          `
        ],
      ])('cleanPhoneNumber(%p) should be %p', (text: string, expected: string) => {
        expect(cleanPhoneNumber(text)).toEqual(expected);
      })
    });
  });
});