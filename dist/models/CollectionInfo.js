"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectedInfoRejectedReason = exports.CollectedInfoType = exports.CollectedInfoStatus = void 0;
var CollectedInfoStatus;
(function (CollectedInfoStatus) {
    CollectedInfoStatus["PENDING"] = "pending";
    CollectedInfoStatus["REJECTED"] = "rejected";
    CollectedInfoStatus["ACCEPTED"] = "accepted";
})(CollectedInfoStatus = exports.CollectedInfoStatus || (exports.CollectedInfoStatus = {}));
var CollectedInfoType;
(function (CollectedInfoType) {
    CollectedInfoType["EMPTY_PREMISE"] = "empty-premise";
    CollectedInfoType["RENT_DEMAND"] = "rent-demand";
})(CollectedInfoType = exports.CollectedInfoType || (exports.CollectedInfoType = {}));
var CollectedInfoRejectedReason;
(function (CollectedInfoRejectedReason) {
    CollectedInfoRejectedReason["IMAGE_TOO_BLURRY"] = "image-too-blurry";
    CollectedInfoRejectedReason["DUPLICATED"] = "duplicated";
    CollectedInfoRejectedReason["CANNOT_CONTACT_OWNER"] = "cannot-contact-owner";
    CollectedInfoRejectedReason["PREMISE_DOES_NOT_MEET_REQUIREMENT"] = "premise-does-not-meet-requirement";
    CollectedInfoRejectedReason["PREMISE_DOES_NOT_MEET_PROJECT_REQUIREMENT"] = "premise-does-not-meet-project-requirement";
})(CollectedInfoRejectedReason = exports.CollectedInfoRejectedReason || (exports.CollectedInfoRejectedReason = {}));
//# sourceMappingURL=CollectionInfo.js.map