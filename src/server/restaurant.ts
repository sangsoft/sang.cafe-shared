import { firestore } from './firebase';
import { objFromSnap } from './data';
import { removeLevelSpecificData } from './view-level';
import admin from 'firebase-admin';

function restaurantFromSnap(doc) {
  let data = objFromSnap(doc);
  if (data && data.place) {
    data.place = {
      geometry: data.place.geometry,
      url: data.place.url
    };
  }
  return data;
}

export async function getRestaurant({ id }) {
  const user = null;
  return firestore()
    .collection('RESTAURANTS')
    .doc(id)
    .get()
    .then((snap) => {
      const restaurant = restaurantFromSnap(snap);
      if (!restaurant) {
        return null;
      }
      if (!restaurant.show && (!user || restaurant.ownerId !== user.uid)) {
        return null;
      }
      return removeLevelSpecificData({ user, restaurant });
    });
}

export async function getRestaurantsInList({ ids }) {
  if (!ids || ids.length === 0) {
    return [];
  }
  return firestore()
    .collection('RESTAURANTS')
    .where(admin.firestore.FieldPath.documentId(), 'in', ids)
    .get()
    .then((snap) => {
      let restaurants = [];
      snap.forEach((doc) => {
        restaurants.push(restaurantFromSnap(doc));
      })
      return restaurants;
    });
}
