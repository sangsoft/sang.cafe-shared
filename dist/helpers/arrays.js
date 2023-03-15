"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findClustersOfAdjacentNumbers = void 0;
function findClustersOfAdjacentNumbers(ar) {
    if (!ar) {
        return [];
    }
    return ar
        .sort((a, b) => a - b)
        .reduce((result, value) => {
        const lastCluster = result[result.length - 1];
        if (lastCluster && value - (lastCluster[lastCluster.length - 1] || 0) === 1) {
            lastCluster.push(value);
            return [...result];
        }
        else {
            return [...result, [value]];
        }
    }, []);
}
exports.findClustersOfAdjacentNumbers = findClustersOfAdjacentNumbers;
//# sourceMappingURL=arrays.js.map