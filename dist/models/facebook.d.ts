export interface FBLabel {
    id: string;
    page_label_name: string;
}
export interface FBWebHookEntryChange {
    field: 'inbox_labels';
    value: {
        user: {
            id: string;
        };
        action: 'remove' | 'add';
        label: FBLabel;
    };
}
export interface FBWebHookEntry {
    id: string;
    time: number;
    changes: FBWebHookEntryChange[];
}
export interface FBWebHookBody {
    object: 'page';
    entry: FBWebHookEntry[];
}
export interface FBPaging {
    cursors: {
        before: string;
        after: string;
    };
    next?: string;
}
export interface FBCustomLabelResponse {
    data: FBLabel[];
    paging: FBPaging;
}
export interface FBApp {
    id: string;
}
export interface FBPage {
    id: string;
}
export interface FBUserProfile {
    id: string;
    name: string;
    profile_pic: string;
}
export interface FBConversation {
    id: string;
    link: string;
    can_reply: boolean;
    snippet: string;
    message_count: number;
    unread_cound: number;
    participants: {
        data: FBUserProfile[];
    };
    updated_time: string;
    is_subscribed: boolean;
}
export interface FBUserProfileResponse extends FBUserProfile {
    ids_for_apps: {
        data: FBApp[];
        paging: FBPaging;
    };
    ids_for_pages: {
        data: FBPage[];
        paging: FBPaging;
    };
}
export interface FBConversationsResponse {
    data: FBConversation[];
    paging: FBPaging;
}
export declare type FBResponse = FBConversationsResponse | FBCustomLabelResponse | FBUserProfileResponse;
