import type { SearchParameters } from '../models/SearchParameters';
import type { FBLabel } from '../models/facebook';
import { normalizePhoneNumberNoThrow } from '../helpers/phoneNumber';
import { converVietnameseCharsToASCII } from './strings';

export const Tags = [
  'near:mall',
  'near:complex',
  'near:office a',
  'near:office b',
  'near:residential',
  'near:walkstreet',
  'near:pubstreet',
  'neart:cinema',
  'near:market',
  'near:supermarket',
  'next2:highschool',
  'next2:metrostn',
  'next2:university',
  'next2:hospital',
  'next2:mall',
  'next2:complex',
  'next2:office a',
  'next2:office b',
  'next2:residential',
  'next2:walkstreet',
  'next2:pubstreet',
  'next2:cinema',
  'next2:market',
  'next2:supermarket',
  'in:school',
  'in:metrostn',
  'in:college',
  'in:hospital',
  'in:mall',
  'in:complex',
  'in:office',
  'in:condo',
  'in:park',
  'in:walkstreet',
  'in:pubstreet',
  'view:river',
  'view:lake',
  'view:airplane',
  'bt:rooftop',
  'bt:basement',
  'bt:whole building',
  'bt:share stairs with owners',
  'bt:separate stairs with owners',
  'bt:has elevator',
  'view:park',
];

export const DistrictKeywords: {[key: string]: { keywords: string[], city: string }} = {
  'Quận 1': {
    keywords: ['q1', 'quan 1', 'quận 1', 'quan1'],
    city: 'Hồ Chí Minh',
  },
  'Quận 2': {
    keywords: ['q2', 'quan 2', 'quận 2', 'quan2'],
    city: 'Hồ Chí Minh',
  },
  'Quận 3': {
    keywords: ['q3', 'quan 3', 'quận 3', 'quan3'],
    city: 'Hồ Chí Minh',
  },
  'Quận 5': {
    keywords: ['q5', 'quan 5', 'quận 5', 'quan5'],
    city: 'Hồ Chí Minh',
  },
  'Quận 6': {
    keywords: ['q6', 'quan 6', 'quận 6', 'quan6'],
    city: 'Hồ Chí Minh',
  },
  'Quận 7': {
    keywords: ['q7', 'quan 7', 'quận 7', 'quan7'],
    city: 'Hồ Chí Minh',
  },
  'Quận 8': {
    keywords: ['q8', 'quan 8', 'quận 8', 'quan8'],
    city: 'Hồ Chí Minh',
  },
  'Quận 9': {
    keywords: ['q9', 'quan 9', 'quận 9', 'quan9'],
    city: 'Hồ Chí Minh',
  },
  'Quận 10': {
    keywords: ['q10', 'quan 10', 'quận 10', 'quan10'],
    city: 'Hồ Chí Minh',
  },
  'Quận 11': {
    keywords: ['q11', 'quan 11', 'quận 11', 'quan11'],
    city: 'Hồ Chí Minh',
  },
  'Quận 12': {
    keywords: ['q12', 'quan 12', 'quận 12', 'quan12'],
    city: 'Hồ Chí Minh',
  },
  'Thủ Đức': {
    keywords: ['thu duc', 'thủ đức', 'thu đức', 'thủ đuc', 'thủ duc', 'thuduc'],
    city: 'Hồ Chí Minh',
  },
  'Gò Vấp': {
    keywords: ['go vap', 'gò vấp', 'go vấp', 'thò vap', 'gò vâp', 'govap'],
    city: 'Hồ Chí Minh',
  },
  'Bình Thạnh': {
    keywords: ['binh thanh', 'binhf thanhj', 'bình thạnh', 'bình thanh', 'binh thạnh', 'binhthanh'],
    city: 'Hồ Chí Minh',
  },
  'Tân Bình': {
    keywords: ['tan binh', 'tân bình', 'tân binh', 'tan bình', 'tanbinh'],
    city: 'Hồ Chí Minh',
  },
  'Tân Phú': {
    keywords: ['tan phu', 'tân phú', 'tân phu', 'tan phú', 'tanphu'],
    city: 'Hồ Chí Minh',
  },
  'Phú Nhuận': {
    keywords: ['phú nhuận', 'phu nhuan', 'phú nhuận', 'phu nhuận', 'phunhuan'],
    city: 'Hồ Chí Minh',
  },
  'Bình Tân': {
    keywords: ['bình tân', 'binh tan', 'bình tan', 'binh tân', 'binhtan'],
    city: 'Hồ Chí Minh',
  },
  'Củ Chi': {
    keywords: ['củ chi', 'cu chi', 'cuchi'],
    city: 'Hồ Chí Minh',
  },
  'Hóc Môn': {
    keywords: ['hóc môn', 'hocmon', 'hoc mon', 'hốc môn', 'hooc mon'],
    city: 'Hồ Chí Minh',
  },
  'Bình Chánh': {
    keywords: ['bình chánh', 'binhchanh', 'bình chanh', 'binh chánh', 'binhchanh'],
    city: 'Hồ Chí Minh',
  },
  'Nhà Bè': {
    keywords: ['nhà bè', 'nha be', 'nhà be', 'nha bè', 'nhabe'],
    city: 'Hồ Chí Minh',
  },
  'Cần Giờ': {
    keywords: ['cần giờ', 'can gio', 'cangio', 'can giờ', 'cần gio'],
    city: 'Hồ Chí Minh',
  },

  // Hà Nội -----------------------------------------------------------------------------------------
  'Ba Đình': {
    keywords: ['ba đình', 'ba đinh', 'badinh', 'ba dinh', 'bađình'],
    city: 'Hà Nội',
  },
  'Hoàn Kiếm': {
    keywords: ['hoàn kiếm', 'hoan kiem', 'hoan kiem', 'hoàn kiem', 'hoan kiêm', 'hoan kiem'],
    city: 'Hà Nội',
  },
  'Tây Hồ': {
    keywords: ['tây hồ', 'tay ho', 'tayho', 'tây ho', 'tay hồ', 'tay hô'],
    city: 'Hà Nội',
  },
  'Long Biên': {
    keywords: ['long biên', 'long bien', 'longbien'],
    city: 'Hà Nội',
  },
  'Cầu Giấy': {
    keywords: ['cầu giấy', 'cau giay', 'caugiay', 'câu giấy', 'cầu giây', 'câu giây', 'cau giây', 'cầu giay'],
    city: 'Hà Nội',
  },
  'Đống Đa': {
    keywords: ['dong da', 'dongda'],
    city: 'Hà Nội',
  },
  'Hai Bà Trưng': {
    keywords: ['hai ba trung', 'haibatrung', 'hai batrung', 'haiba trung'],
    city: 'Hà Nội',
  },
  'Hoàng Mai': {
    keywords: ['hoang mai', 'hoangmai'],
    city: 'Hà Nội',
  },
  'Thanh Xuân': {
    keywords: ['thanhxuan', 'thanh xuan'],
    city: 'Hà Nội',
  },
  'Sóc Sơn': {
    keywords: ['socson', 'soc son'],
    city: 'Hà Nội',
  },
  'Đông Anh': {
    keywords: ['dong anh', 'donganh'],
    city: 'Hà Nội',
  },
  'Gia Lâm': {
    keywords: ['gia lam', 'gialam'],
    city: 'Hà Nội',
  },
  'Nam Từ Liêm': {
    keywords: ['nam tu liem', 'namtuliem', 'namtu liem', 'nam tuliem'],
    city: 'Hà Nội',
  },
  'Thanh Trì': {
    keywords: ['thanh tri', 'thanhtri'],
    city: 'Hà Nội',
  },
  'Bắc Từ Liêm': {
    keywords: ['bac tu liem', 'bactuliem', 'bac tuliem', 'bactu liem'],
    city: 'Hà Nội',
  },
  'Mê Linh': {
    keywords: ['me linh', 'melinh'],
    city: 'Hà Nội',
  },
  'Hà Đông': {
    keywords: ['ha dong', 'ha dong'],
    city: 'Hà Nội',
  },
  'Sơn Tây': {
    keywords: ['son tay', 'sontay'],
    city: 'Hà Nội',
  },
  'Ba Vì': {
    keywords: ['ba vi', 'bavi'],
    city: 'Hà Nội',
  },
  'Phúc Thọ': {
    keywords: ['phuc tho', 'phuctho'],
    city: 'Hà Nội',
  },
  'Đan Phượng': {
    keywords: ['dan phuong', 'danphuong'],
    city: 'Hà Nội',
  },
  'Hoài Đức': {
    keywords: ['hoai duc', 'hoaiduc'],
    city: 'Hà Nội',
  },
  'Quốc Oai': {
    keywords: ['quoc oai', 'quocoai'],
    city: 'Hà Nội',
  },
  'Thạch Thất': {
    keywords: ['thach that', 'thachthat'],
    city: 'Hà Nội',
  },
  'Chương Mỹ': {
    keywords: ['chuong my', 'chuongmy'],
    city: 'Hà Nội',
  },
  'Thanh Oai': {
    keywords: ['thanh oai', 'thanhoai'],
    city: 'Hà Nội',
  },
  'Thường Tín': {
    keywords: ['thuong tin', 'thuongtin'],
    city: 'Hà Nội',
  },
  'Phú Xuyên': {
    keywords: ['phu xuyen', 'phuxuyen'],
    city: 'Hà Nội',
  },
  'Ứng Hòa': {
    keywords: ['ung hoa', 'unghoa'],
    city: 'Hà Nội',
  },
  'Mỹ Đức': {
    keywords: ['my duc', 'myduc'],
    city: 'Hà Nội',
  },

};

export function guessPhoneNumberFromLabel(label: FBLabel): string | null {
  const normalizedPhoneNumber = normalizePhoneNumberNoThrow(label.page_label_name);
  return normalizedPhoneNumber;
}

export function guessPhoneNumberFromLabels(labels: FBLabel[]): string | null {
  for (const label of labels) {
    const number = guessPhoneNumberFromLabel(label);
    if (number) {
      return number;
    }
  }

  return null;
}

export function guessUserTypeFromLabel(label: FBLabel): 'seller' | 'buyer' | 'broker' | 'owner' | null {
  const labelStr = label.page_label_name.toLowerCase();

  switch (labelStr) {
    case 'người mua':
    case 'khách mua':
    case 'khách thuê':
    case 'người thuê':
    case 'ct:người thuê/mua':
      return 'buyer';
    case 'ct:người cho thuê/bán':
    case 'người cho thuê':
    case 'người bán':
    case 'cho thuê':
      return 'seller';
    case 'chủ nhà':
      return 'owner';
    case 'môi giới':
      return 'broker';
    default:
      return null;
  }
}

export function guessUserTypeFromLabels(labels: FBLabel[]): 'seller' | 'buyer' | 'broker' | 'owner' | null {
  for (const label of labels) {
    const guessedType = guessUserTypeFromLabel(label);
    if (guessedType) {
      return guessedType;
    }
  }

  return null;
}

export function extractPriceFromLabel(label: FBLabel): number | null {
  if (label.page_label_name.indexOf('triệu') > 0  && label.page_label_name.indexOf('triệu/tháng') < 0) {
    return parseFloat(label.page_label_name.replace('triệu', ''));
  }

  return null;
}

export function extractPriceFromLabels(labels: FBLabel[]): number | null {
  for (const label of labels) {
    const price = extractPriceFromLabel(label);
    if (price) {
      return price;
    }
  }

  return null;
}

export function extractMonthlyRentFromLabel(label: FBLabel): number | null {
  if (label.page_label_name.indexOf('triệu/tháng') > 0) {
    return parseFloat(label.page_label_name.replace('triệu/tháng', ''));
  }

  return null;
}

export function extractMonthlyRentFromLabels(labels: FBLabel[]): number | null {
  for (const label of labels) {
    const monthlyRent = extractMonthlyRentFromLabel(label);
    if (monthlyRent) {
      return monthlyRent;
    }
  }

  return null;
}


export function extractDistricts(labels: FBLabel[]): string[] {
  return labels.reduce((result: string[], label: FBLabel) => {
    const normalizedText = converVietnameseCharsToASCII(label.page_label_name.trim()).toLowerCase();
    const districts = Object.keys(DistrictKeywords).filter((key: string) => {
      const keywords = DistrictKeywords[key].keywords;
      for (const word of keywords) {
        if (normalizedText.indexOf(word) > -1) {
          return true;
        }
      }
      return false;
    });
  
    return result.concat(districts.filter(d => !result.includes(d)));
  }, []);
}

export function getCity(district: string): string {
  return DistrictKeywords[district].city;
}

export function extractTags(labels: FBLabel[]): string[] {
  return labels.map(label => label.page_label_name)
    .filter(tag => Tags.includes(tag));
}

export function guessSearchParams(labels: FBLabel[], psid: string): SearchParameters[] {
  const district = extractDistricts(labels);
  const tags = extractTags(labels);

  const paramsWithDistricts: SearchParameters = {
    createdBy: 'facebook',
    identity: psid,
    district,
    tags,
    city: district.length > 0 ? getCity(district[0]) : undefined,
  };

  Object.keys(paramsWithDistricts).forEach((key: string) => {
    if (!(paramsWithDistricts as any)[key]) { // eslint-disable-line
      delete (paramsWithDistricts as any)[key];  // eslint-disable-line
    }
  });

  return [
    paramsWithDistricts,
  ];
}
