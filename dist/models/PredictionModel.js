"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredictionModelStatus = exports.PredictionModelType = void 0;
var PredictionModelType;
(function (PredictionModelType) {
    PredictionModelType["RENT_VALUE"] = "rent-value";
    PredictionModelType["RENT_VALUE_HAN"] = "rent-value-hanoi";
    PredictionModelType["RENT_VALUE_SGN"] = "rent-value-hcmc";
})(PredictionModelType = exports.PredictionModelType || (exports.PredictionModelType = {}));
var PredictionModelStatus;
(function (PredictionModelStatus) {
    PredictionModelStatus["ACTIVE"] = "active";
    PredictionModelStatus["DEACTIVE"] = "deactive";
    PredictionModelStatus["ERROR"] = "error";
})(PredictionModelStatus = exports.PredictionModelStatus || (exports.PredictionModelStatus = {}));
//# sourceMappingURL=PredictionModel.js.map