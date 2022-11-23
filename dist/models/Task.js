"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskCallLogStatus = exports.CannotCallReason = exports.TaskResult = exports.TaskType = exports.TaskStatus = void 0;
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["PENDING"] = "pending";
    TaskStatus["ONGOING"] = "ongoing";
    TaskStatus["COMPLETE"] = "complete";
    TaskStatus["DEPOSITED"] = "deposited";
    TaskStatus["DELEGATED"] = "delegated";
    TaskStatus["OUT_OF_DATE"] = "out-of-date";
    TaskStatus["BILL_CREATED"] = "bill-created";
    TaskStatus["CANNOT_CONTACT_OWNER"] = "cannot-contact-owner";
})(TaskStatus = exports.TaskStatus || (exports.TaskStatus = {}));
var TaskType;
(function (TaskType) {
    TaskType["FILL_DATA"] = "fill-data";
    TaskType["FINALIZE_POST"] = "finalize-post";
    TaskType["FINALIZE_OLD_POST"] = "finalize-old-post";
    TaskType["COMMUNICATE_BUYER"] = "communicate-buyer";
    TaskType["BROKERAGE"] = "brokerage";
    TaskType["CRAWLED_DATA"] = "crawled-data";
    TaskType["POST_EXTENSION"] = "post-extension";
    TaskType["HANDLE_COLLECTED_INFO"] = "handle-collected-info";
    TaskType["HANDLE_COLLECTED_INFO_MISSING_PHONE"] = "handle-collected-info-missing-phone";
    TaskType["HANDLE_COLLECTED_INFO_RENT_DEMAND"] = "handle-collected-info-rent-demand";
    TaskType["CONTACT_INFORMATION_REQUEST"] = "contact-information-request";
})(TaskType = exports.TaskType || (exports.TaskType = {}));
var TaskResult;
(function (TaskResult) {
    TaskResult["DONE"] = "done";
    // handle-collected-info
    TaskResult["DATA_COLLECTED_NOT_SATISFIED"] = "data-collected-not-satisfied";
    TaskResult["DATA_DUPLICATED"] = "data-duplicated";
    // post-extension
    TaskResult["EXTENDS"] = "extends";
    TaskResult["CHANGE_TO_BROKERAGE"] = "change-to-brokerage";
    TaskResult["SOLD"] = "sold";
    TaskResult["EXTENSION_REJECTED"] = "extension-rejected";
    // fill-data
    TaskResult["DATA_COMPLETED"] = "data-completed";
    // crawled-data
    TaskResult["SELLER_NOT_INTERESTED"] = "seller-not-interested";
    TaskResult["SELLER_ACCEPTED"] = "seller-accepted";
    TaskResult["SELLER_IS_BROKER"] = "is-broker";
    TaskResult["POST_NOT_COMPATIBLE"] = "post-not-compatible";
    TaskResult["FOR_SALE_PRICE_TOO_LOW"] = "for-sale-price-too-low";
    TaskResult["RENTAL_PRICE_TOO_LOW"] = "rental-price-too-low";
    TaskResult["COULDNT_CONTACT"] = "couldnt-contact";
    TaskResult["OLD_CUSTOMER_ACCEPTED"] = "old-customer-accepted";
    TaskResult["DUPLICATED"] = "deplicated";
    // communicate-buyer
    TaskResult["BUYER_NOT_INTERESTED"] = "buyer-not-interested";
    TaskResult["BUYER_CONSIDERING"] = "buyer-considering";
    // brokerage
    TaskResult["DEAL_SUCCESS"] = "deal-success";
    TaskResult["DEAL_FAILED_BUYER_REJECT"] = "deal-failed-buyer-reject";
    TaskResult["DEAL_FAILED_SELLER_REJECT"] = "deal-failed-seller-reject";
})(TaskResult = exports.TaskResult || (exports.TaskResult = {}));
var CannotCallReason;
(function (CannotCallReason) {
    CannotCallReason["LINE_BUSY"] = "line-busy";
    CannotCallReason["DID_NOT_PICKUP"] = "did-not-pickup";
    CannotCallReason["WRONG_NUMBER"] = "wrong-number";
    CannotCallReason["PHONE_OFF"] = "phone-off";
})(CannotCallReason = exports.CannotCallReason || (exports.CannotCallReason = {}));
var TaskCallLogStatus;
(function (TaskCallLogStatus) {
    TaskCallLogStatus["CANNOT_CONTACT_OWNER"] = "cannot-contact-owner";
    TaskCallLogStatus["CALL_THROUGH"] = "call-through";
    TaskCallLogStatus["CALL_THROUGH_NEED_CALL_BACK"] = "call-through-need-call-back";
})(TaskCallLogStatus = exports.TaskCallLogStatus || (exports.TaskCallLogStatus = {}));
//# sourceMappingURL=Task.js.map