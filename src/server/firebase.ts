const admin = require('firebase-admin');
let isInitialized = false;

function pickCred() {
  try {
    // console.log(process.env.FIREBASE_CREDENTIAL)
    let cred = admin.credential.cert(JSON.parse(process.env.FIREBASE_CREDENTIAL));
    console.log('Use provided credential')
    return cred;
  } catch (e) {
    // console.warn(e);
    console.log('Using default credential')
    return admin.credential.applicationDefault();
  }
}

function lazyInitialize() {
  if (!isInitialized) {
    try {
      let cred = pickCred();
      admin.initializeApp({
        credential: cred,
        // databaseURL: "https://restaurant-listing-89eb7.firebaseio.com",
        // projectId: "restaurant-listing-89eb7",
        // storageBucket: "restaurant-listing-89eb7.appspot.com",
      });
    } catch (e) {
      console.error(e)
    }
    isInitialized = true;
  }

  return admin;
}
export const storage = () => {
  const admin = lazyInitialize();
  return admin.storage();
}
export const firestore = () => {
  const admin = lazyInitialize();
  return admin.firestore();
}