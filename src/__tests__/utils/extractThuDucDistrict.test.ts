import 'jest';
import { extractThuDucDistrict } from '../../helpers/strings';

describe('utils', () => {
  describe('extractThuDucDistrict', () => {
    it.each([
      ['2b Đường Lê Văn Miến, Thảo Điền, Quận 3, Hồ Chí Minh', 'Quận 3'],
      ['2b Đường Lê Văn Miến, Thảo Điền, Quận 2, Hồ Chí Minh', 'Quận 2'],
      ['2b Đường Lê Văn Miến, Thảo Điền, Q 2, Hồ Chí Minh', 'Quận 2'],
      ['2b Đường Lê Văn Miến, Thảo Điền, Q.2, Hồ Chí Minh', 'Quận 2'],
      ['2b Đường Lê Văn Miến, Thảo Điền, Quan 2, Hồ Chí Minh', 'Quận 2'],
      ['2b Đường Lê Văn Miến, Thảo Điền, QuAn 2, Hồ Chí Minh', 'Quận 2'],
      ['2b Đường Lê Văn Miến, Thảo Điền, quan 2, Hồ Chí Minh', 'Quận 2'],
      ['2b Đường Lê Văn Miến, Thảo Điền, quan 2', 'Quận 2'],
      ['2b Đường Lê Văn Miến, Thảo Điền, qUAn 2', 'Quận 2'],
      ['2b Đường Lê Văn Miến, Thảo Điền, Quận 2, Thủ Đức, Hồ Chí Minh', 'Quận 2'],

      ['153 Đường Man Thiện, Tăng Nhơn Phú A, Quận 9, Hồ Chí Minh', 'Quận 9'],
      ['153 Đường Man Thiện, Tăng Nhơn Phú A, Q 9, Hồ Chí Minh', 'Quận 9'],
      ['153 Đường Man Thiện, Tăng Nhơn Phú A, Q.9, Hồ Chí Minh', 'Quận 9'],
      ['153 Đường Man Thiện, Tăng Nhơn Phú A, Quan 9, Hồ Chí Minh', 'Quận 9'],
      ['153 Đường Man Thiện, Tăng Nhơn Phú A, QuAn 9, Hồ Chí Minh', 'Quận 9'],
      ['153 Đường Man Thiện, Tăng Nhơn Phú A, quan 9, Hồ Chí Minh', 'Quận 9'],

      ['21 Võ Văn Ngân, Linh Chiểu, Quận Thủ Đức, Hồ Chí Minh', 'Thủ Đức'],
      ['21 Võ Văn Ngân, Linh Chiểu, Quận thủ đức, Hồ Chí Minh', 'Thủ Đức'],
      ['21 Võ Văn Ngân, Linh Chiểu, quận thủ đức, Hồ Chí Minh', 'Thủ Đức'],
      ['21 Võ Văn Ngân, Linh Chiểu, quận Thủ Đức, Hồ Chí Minh', 'Thủ Đức'],
      ['21 Võ Văn Ngân, Linh Chiểu, Q.Thủ Đức, Hồ Chí Minh', 'Thủ Đức'],
      ['21 Võ Văn Ngân, Linh Chiểu, Q.thủ đức, Hồ Chí Minh', 'Thủ Đức'],
      ['21 Võ Văn Ngân, Linh Chiểu, q.Thủ Đức, Hồ Chí Minh', 'Thủ Đức'],
      ['21 Võ Văn Ngân, Linh Chiểu, q.thủ đức, Hồ Chí Minh', 'Thủ Đức'],
      ['21 Võ Văn Ngân, Linh Chiểu, Thủ Đức, Hồ Chí Minh', 'Thủ Đức'],
      ['21 Võ Văn Ngân, Linh Chiểu, thu duc, Hồ Chí Minh', 'Thủ Đức'],
      
    ])('normalizePhoneNumberNationalNoThrow(%p) should be %p', (input: string, expected: 'Thủ Đức' | 'Quận 9' | 'Quận 2') => {
      expect(extractThuDucDistrict(input)).toEqual(expected);
    });
  });
});