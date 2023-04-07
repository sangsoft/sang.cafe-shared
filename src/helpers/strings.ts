export function slug(str: string): string {
  str = str.replace(/^\s+|\s+$/g, '').toLowerCase();

  // remove accents, swap ñ for n, etc
  var from =
    'àÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬđĐèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆìÌỉỈĩĨíÍịỊòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰỳỲỷỶỹỸýÝỵỴÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;';
  var to =
    'aAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAdDeEeEeEeEeEeEeEeEeEeEeEiIiIiIiIiIoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOuUuUuUuUuUuUuUuUuUuUuUyYyYyYyYyYAAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------';
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
}

export function capitalize(str?: string): string | undefined {
  if (!str) {
    return;
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}

const charMaps = {
  a: ['a', 'á', 'à', 'ả', 'ã', 'ạ', 'ă', 'ắ', 'ằ', 'ẳ', 'ẵ', 'ặ', 'â', 'ấ', 'ầ', 'ẩ', 'ẫ', 'ậ'],
  d: ['d', 'đ'],
  e: ['e', 'é', 'è', 'ẻ', 'ẽ', 'ẹ', 'ê', 'ế', 'ề', 'ể', 'ễ', 'ệ'],
  i: ['i', 'í', 'ì', 'ỉ', 'ĩ', 'ị'],
  o: ['o', 'ó', 'ò', 'ỏ', 'õ', 'ọ', 'ô', 'ố', 'ồ', 'ổ', 'ỗ', 'ộ'],
  u: ['u', 'ú', 'ù', 'ủ', 'ũ', 'ụ', 'ư', 'ứ', 'ừ', 'ử', 'ữ', 'ự'],
};

export function converVietnameseCharsToASCII(str: string): string {
  return str
    .split('')
    .map((c) => {
      return (
        Object.keys(charMaps).find((key) => {
          if (charMaps[key].includes(c)) {
            return true;
          }
        }) || c
      ).toUpperCase();
    })
    .join('');
}

export type ThuDicDistricts = 'Thủ Đức' | 'Quận 9' | 'Quận 2';

const ThuDucDistrictsTyposMaps = {
  'Quận 2': ['quận 2', 'q 2', 'q.2', 'quan 2', 'q. 2'],
  'Quận 9': ['quận 9', 'q 9', 'q.9', 'quan 9', 'q. 9'],
  'Thủ Đức': [
    'thu duc',
    'thủ đức',
    'quận thủ đức',
    'quan thu duc',
    'q thủ đức',
    'q.thủ đức',
    'q. thủ đức',
    'q thu duc',
    'q.thu duc',
    'q. thu duc',
  ],
};

export function extractThuDucDistrict(address: string): ThuDicDistricts | undefined {
  const arr = Object.values(ThuDucDistrictsTyposMaps);
  var regexFromMyArray = new RegExp([].concat(...arr).join('|'), 'gi');
  var matches = address.match(regexFromMyArray) || [];

  if (matches.length === 0) {
    return undefined;
  }

  const result = Object.keys(ThuDucDistrictsTyposMaps).find((key): boolean => {
    for (const match of matches) {
      if (ThuDucDistrictsTyposMaps[key].includes(match.toLowerCase())) {
        return true;
      }
    }

    return false;
  });

  if (Object.keys(ThuDucDistrictsTyposMaps).includes(result)) {
    return result as ThuDicDistricts;
  }

  return undefined;
}

export function matchSubstring(str1: string, str2: string): string {
  const str1Lower = str1.toLowerCase();
  const str2Lower = str2.toLowerCase();

  if (str1Lower.includes(str2Lower)) {
    return str2;
  }

  if (str2Lower.includes(str1Lower)) {
    return str1;
  }

  return '';
}
