"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPriceRangeTranslationOptions = exports.getPriceRangeTranslationOption = void 0;
function getPriceRangeTranslationOption({ range, }) {
    if (!range) {
        return { min: undefined, max: undefined, context: 'none' };
    }
    let context = undefined;
    const min = range[0];
    const max = range[1];
    if (!min && !max) {
        context = 'none';
    }
    else if (!min) {
        context = 'low';
    }
    else if (!max) {
        context = 'high';
    }
    return {
        min, max, context,
    };
}
exports.getPriceRangeTranslationOption = getPriceRangeTranslationOption;
function getPriceRangeTranslationOptions({ range, }) {
    return Object.keys(range)
        .sort((a, b) => a - b)
        .map((key) => {
        return Object.assign(Object.assign({}, getPriceRangeTranslationOption({
            range: range[key]
        })), { key });
    });
}
exports.getPriceRangeTranslationOptions = getPriceRangeTranslationOptions;
//# sourceMappingURL=search.js.map