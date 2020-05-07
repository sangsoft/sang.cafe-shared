"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require('firebase-admin');
let isInitialized = false;
function pickCred() {
    try {
        let cred = admin.credential.cert(JSON.parse(process.env.FIREBASE_CREDENTIAL));
        console.log('Use provided credential');
        return cred;
    }
    catch (e) {
        console.log('Using default credential');
        return admin.credential.applicationDefault();
    }
}
function lazyInitialize() {
    if (!isInitialized) {
        try {
            let cred = pickCred();
            admin.initializeApp({
                credential: cred,
            });
        }
        catch (e) {
            console.error(e);
        }
        isInitialized = true;
    }
    return admin;
}
exports.storage = () => {
    const admin = lazyInitialize();
    return admin.storage();
};
exports.firestore = () => {
    const admin = lazyInitialize();
    return admin.firestore();
};
//# sourceMappingURL=firebase.js.map