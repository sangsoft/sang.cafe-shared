"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentRequestStatus = exports.CompensationModel = exports.IDTypeText = void 0;
exports.IDTypeText = {
    'cccd': 'Căn cước công dân/Chứng minh nhân dân',
    'passport': 'Hộ chiếu',
    'driving_license': 'Giấy phép lái xe',
};
exports.CompensationModel = {
    'fee-based': 'Mô hình phí',
    'commission-based': 'Mô hình hoa hồng',
};
var AgentRequestStatus;
(function (AgentRequestStatus) {
    AgentRequestStatus["PENDING"] = "pending";
    AgentRequestStatus["APPROVED"] = "approved";
    AgentRequestStatus["REJECTED"] = "rejected";
    AgentRequestStatus["UNDERGOING"] = "undergoing";
})(AgentRequestStatus = exports.AgentRequestStatus || (exports.AgentRequestStatus = {}));
//# sourceMappingURL=AgentRequest.js.map