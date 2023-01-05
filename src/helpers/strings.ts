export function slug(str: string): string {
  str = str
    .replace(/^\s+|\s+$/g, '')
    .toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬđĐèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆìÌỉỈĩĨíÍịỊòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰỳỲỷỶỹỸýÝỵỴÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
  var to = "aAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAdDeEeEeEeEeEeEeEeEeEeEeEiIiIiIiIiIoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOuUuUuUuUuUuUuUuUuUuUuUyYyYyYyYyYAAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
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
  'a': [
    'a', 'á', 'à', 'ả', 'ã', 'ạ',
    'ă', 'ắ', 'ằ', 'ẳ', 'ẵ', 'ặ',
    'â', 'ấ', 'ầ', 'ẩ', 'ẫ', 'ậ',
  ],
  'd': ['d', 'đ'],
  'e': [
    'e', 'é', 'è', 'ẻ', 'ẽ', 'ẹ',
    'ê', 'ế', 'ề', 'ể', 'ễ', 'ệ',
  ],
  'i': [
    'i', 'í', 'ì', 'ỉ', 'ĩ', 'ị',
  ],
  'o': [
    'o', 'ó', 'ò', 'ỏ', 'õ', 'ọ',
    'ô', 'ố', 'ồ', 'ổ', 'ỗ', 'ộ',
  ],
  'u': [
    'u', 'ú', 'ù', 'ủ', 'ũ', 'ụ',
    'ư', 'ứ', 'ừ', 'ử', 'ữ', 'ự',
  ],
};

export function converVietnameseCharsToASCII(str: string): string {
  return str.split('').map((c) => {
    return (Object.keys(charMaps).find((key) => {
      if (charMaps[key].includes(c)) {
        return true;
      }
    }) || c).toUpperCase();
  }).join('');
}
const extractThuDucDistrictMaps = {
  'Quận 2': [
    'Quận 2','Q 2','Q.2','Quan 2','QuAn 2','quan 2'
  ],
  'Quận 9': [
    'Quận 9','Q 9','Q.9','Quan 9','QuAn 9','quan 9'
  ],
  'Thủ Đức': [
    'Quận Thủ Đức','Quận thủ đức','quận thủ đức','quận Thủ Đức','Q.Thủ Đức','Q.thủ đức','q.Thủ Đức','q.thủ đức','Thủ Đức','thu duc',''
  ]
}
// : 'Thủ Đức' | 'Quận 9' | 'Quận 2'
export function extractThuDucDistrict(address: string):string {
  const splits = address.split(',');
  const district = (splits[splits.length - 2] || '').trim();
  const result =  Object.keys(extractThuDucDistrictMaps).find((key) => {
    if (extractThuDucDistrictMaps[key].includes(district)) {  
      return key
    }
  })
  if (result === undefined) {
    // console.log('district',district)
    return district
  }
  else {
    // console.log('result',result);
    return result
  }
  // console.log(result)
  // return result; 
}