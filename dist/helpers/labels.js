"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const phoneNumber_1 = require("../helpers/phoneNumber");
exports.Tags = [
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
exports.DistrictKeywords = {
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
};
function guessPhoneNumberFromLabel(label) {
    const normalizedPhoneNumber = phoneNumber_1.normalizePhoneNumberNoThrow(label.page_label_name);
    return normalizedPhoneNumber;
}
exports.guessPhoneNumberFromLabel = guessPhoneNumberFromLabel;
function guessUserTypeFromLabel(label) {
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
exports.guessUserTypeFromLabel = guessUserTypeFromLabel;
function guessUserTypeFromLabels(labels) {
    for (const label of labels) {
        const guessedType = guessUserTypeFromLabel(label);
        if (guessedType) {
            return guessedType;
        }
    }
    return null;
}
exports.guessUserTypeFromLabels = guessUserTypeFromLabels;
function extractDistricts(labels) {
    return labels.reduce((result, label) => {
        const normalizedText = label.page_label_name.toLowerCase().trim();
        const districts = Object.keys(exports.DistrictKeywords).filter((key) => {
            const keywords = exports.DistrictKeywords[key].keywords;
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
function extractTags(labels) {
    return labels.map(label => label.page_label_name)
        .filter(tag => exports.Tags.includes(tag));
}
function guessSearchParams(labels, psid) {
    const district = extractDistricts(labels);
    const tags = extractTags(labels);
    const paramsWithDistricts = {
        createdBy: 'facebook',
        identity: psid,
        district,
        tags,
        city: district.length > 0 ? exports.DistrictKeywords[district[0]].city : undefined,
    };
    Object.keys(paramsWithDistricts).forEach((key) => {
        if (!paramsWithDistricts[key]) { // eslint-disable-line
            delete paramsWithDistricts[key]; // eslint-disable-line
        }
    });
    return [
        paramsWithDistricts,
    ];
}
exports.guessSearchParams = guessSearchParams;
//# sourceMappingURL=labels.js.map