import type { CustomerComment, CommentsDict, StaffRemark, RemarksDict } from '../models/Suggestion';
export declare function commentsFromCustomerComments(customerComments: CustomerComment[]): CommentsDict;
export declare function customerCommentsFromComments(commentsDict: CommentsDict): CustomerComment[];
export declare function remarksFromStaffRemarks(staffRemarks: StaffRemark[]): RemarksDict;
export declare function staffRemarksFromRemarks(remarksDict: RemarksDict): StaffRemark[];
