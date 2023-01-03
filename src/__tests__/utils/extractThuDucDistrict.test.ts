import 'jest';
import { extractThuDucDistrict } from '../../helpers/strings';

describe('utils', () => {
  describe('extractThuDucDistrict', () => {
    it.each([
      ['2b Đường Lê Văn Miến, Thảo Điền, Quận 2, Hồ Chí Minh', 'Quận 2'],
      ['2b Đường Lê Văn Miến, Thảo Điền, Q 2, Hồ Chí Minh', 'Quận 2'],
      ['2b Đường Lê Văn Miến, Thảo Điền, Q.2, Hồ Chí Minh', 'Quận 2'],
      ['2b Đường Lê Văn Miến, Thảo Điền, Quan 2, Hồ Chí Minh', 'Quận 2'],
      ['2b Đường Lê Văn Miến, Thảo Điền, QuAn 2, Hồ Chí Minh', 'Quận 2'],
      ['2b Đường Lê Văn Miến, Thảo Điền, quan 2, Hồ Chí Minh', 'Quận 2'],
    ])('normalizePhoneNumberNationalNoThrow(%p) should be %p', (input: string, expected: 'Thủ Đức' | 'Quận 9' | 'Quận 2') => {
      expect(extractThuDucDistrict(input)).toEqual(expected);
    });
  });
});