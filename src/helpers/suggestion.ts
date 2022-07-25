import type { CustomerComment, CommentsDict, StaffRemark, RemarksDict } from '../models/Suggestion';

export function commentsFromCustomerComments(customerComments: CustomerComment[]): CommentsDict {
  return (customerComments || []).reduce((result, customerComment) => {
    return { ...result, [customerComment.shortCode]: customerComment.comment };
  }, {});
}

export function customerCommentsFromComments(commentsDict: CommentsDict): CustomerComment[] {
  const customerComments = Object.keys(commentsDict || {}).map((key) => {
    if (commentsDict[key] === '') {
      return null;
    }
    return { shortCode: key, comment: commentsDict[key] };
  });
  return customerComments.filter((_) => !!_) as CustomerComment[];
}

export function remarksFromStaffRemarks(staffRemarks: StaffRemark[]): RemarksDict {
  return (staffRemarks || []).reduce((result, staffComment) => {
    return { ...result, [staffComment.shortCode]: staffComment.remark };
  }, {});
}

export function staffRemarksFromRemarks(remarksDict: RemarksDict): StaffRemark[] {
  const staffRemarks = Object.keys(remarksDict || {}).map((key) => {
    if (remarksDict[key].positive === '' && remarksDict[key].negative === '') {
      return null;
    }
    return { shortCode: key, remark: remarksDict[key] };
  });
  return staffRemarks.filter((_) => !!_) as StaffRemark[];
}
