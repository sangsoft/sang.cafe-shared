"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPriceRangeTranslationOptions = void 0;
function getPriceRangeTranslationOptions({ range, }) {
    return Object.keys(range)
        .sort((a, b) => a - b)
        .map((key) => {
        const min = range[key][0];
        const max = range[key][1];
        let context = undefined;
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
            min, max, context, key,
        };
    });
}
exports.getPriceRangeTranslationOptions = getPriceRangeTranslationOptions;
//# sourceMappingURL=search.js.map