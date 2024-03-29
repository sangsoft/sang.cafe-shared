"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// export class User extends Model {
//   uid?: string;
//   customerCode?: string;
//   displayName: string = '';
//   email: string = '';
//   phoneNumber: string = '';
//   photoURL: string | Photo = '';
//   canPost: boolean = false;
//   admin: boolean = false;
//   createdAt: any = {};
//   updatedAt: any = {};
//   doc?: any;
//   buyer?: IUserStatus = null;
//   seller?: IUserStatus = null;
//   signInMetaData?: {
//     phoneNumber: string;
//     email?: string;
//     displayName?: string;
//     registerAsSeller?: boolean;
//     idNumber?: string;
//     address?: string;
//     issueDate?: string;
//     issueAuthority?: string;
//     reason?: 'post' | 'view-contact';
//     path?: string;
//   };
//   searches?: any[];
//   type?: string;
//   roles?: Role[];
//   identity?: string;
//   note?: string;
//   credentials?: Photo[];
//   idNumber?: string;
//   issueAuthority?: string;
//   issueDate?: string;
//   paymentInfo?: IPaymentInfo;
//   createdBy?: 'signup' | 'facebook' | 'chatfuel';
//   fbPsid?: string;
//   labels?: string[];
//   //Organization
//   isOrganization?: boolean;
//   representativeName?: string;
//   taxCode?: string;
//   belongsToOrganization?: string;
//   constructor(obj: IUser) {
//     super();
//     Object.assign(this, obj);
//     this.roles = (obj.roles || []).map((role) => new Role(role));
//   }
//   isSuperAdmin(): boolean {
//     return (this.roles || []).some((role) => role.superadmin);
//   }
//   can(action: string): boolean {
//     for (const role of this.roles || []) {
//       if (role.can(action)) {
//         return true;
//       }
//     }
//     return false;
//   }
//   // getPhotoUrl(): string {
//   //   return this.getUrl(this.photoURL);
//   // }
//   onPrepareData() {
//     let obj: any = {
//       ...this,
//     };
//     delete obj.buyer;
//     delete obj.seller;
//     delete obj.canPost;
//     delete obj.admin;
//     delete obj.doc;
//     delete obj.requestPost;
//     delete obj.roles;
//     return obj;
//   }
//   flatten() {
//     const obj = super.flatten();
//     return {
//       ...obj,
//       roles: this.roles.map((role) => role.flatten()),
//     };
//   }
// }
//# sourceMappingURL=User.js.map