"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function commentsFromCustomerComments(customerComments) {
    return (customerComments || []).reduce((result, customerComment) => {
        return Object.assign(Object.assign({}, result), { [customerComment.shortCode]: customerComment.comment });
    }, {});
}
exports.commentsFromCustomerComments = commentsFromCustomerComments;
function customerCommentsFromComments(commentsDict) {
    const customerComments = Object.keys(commentsDict || {}).map((key) => {
        if (commentsDict[key] === '') {
            return null;
        }
        return { shortCode: key, comment: commentsDict[key] };
    });
    return customerComments.filter((_) => !!_);
}
exports.customerCommentsFromComments = customerCommentsFromComments;
function remarksFromStaffRemarks(staffRemarks) {
    return (staffRemarks || []).reduce((result, staffComment) => {
        return Object.assign(Object.assign({}, result), { [staffComment.shortCode]: staffComment.remark });
    }, {});
}
exports.remarksFromStaffRemarks = remarksFromStaffRemarks;
function staffRemarksFromRemarks(remarksDict) {
    const staffRemarks = Object.keys(remarksDict || {}).map((key) => {
        if (remarksDict[key].positive === '' && remarksDict[key].negative === '') {
            return null;
        }
        return { shortCode: key, remark: remarksDict[key] };
    });
    return staffRemarks.filter((_) => !!_);
}
exports.staffRemarksFromRemarks = staffRemarksFromRemarks;
//# sourceMappingURL=suggestion.js.map