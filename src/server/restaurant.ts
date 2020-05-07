import { firestore } from './firebase';
import { objFromSnap } from './data';
import { removeLevelSpecificData } from './view-level';
import { ITEM_PER_PAGE } from '../constants';
import { timestampFromObj } from '../helpers/times';
import * as admin from 'firebase-admin';
import { ServerContext } from '../models/ServerContext';
import { Restaurant } from '../models/Restaurant';
import { getRightColSponsors } from './sponsor';

function restaurantFromSnap(doc): Restaurant {
  let data = objFromSnap(doc);
  if (data && data.place) {
    data.place = {
      geometry: data.place.geometry,
      url: data.place.url
    };
  }
  return new Restaurant(data);
}

export async function mergeWithSponsor({ sponsors, restaurants, user }: any, ctx: ServerContext) {
  if (!restaurants || restaurants.length === 0) {
    return restaurants;
  }
  const ownerId = user ? user.uid : null;
  let sponsoredRestaurants = sponsors.map((sponsor: any) => removeLevelSpecificData({
    user,
    restaurant: sponsor.restaurant
  }));
  if (ownerId) {
    sponsoredRestaurants = await provideSavedStatus({
      ownerId,
      restaurants: sponsoredRestaurants
    }, ctx);
  }

  const newRestaurants = restaurants
    .reduce((result: any[], restaurant: any, index: number) => {
      const c = [restaurant];
      if (index % 5 == 0) {
        const sponsoredRestaurant = sponsoredRestaurants[index / 5];
        if (sponsoredRestaurant) {
          c.push({
            ...sponsoredRestaurant,
            ad: true
          });
        }
      }
      return result.concat(c);
    }, [])
    .filter((_: any) => !!_);
  return newRestaurants;
}

export async function getRestaurant({ id }, ctx: ServerContext) {
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

export async function provideSavedStatus({ ownerId, restaurants }: any, ctx: ServerContext) {
  if (!restaurants || restaurants.length == 0) {
    return restaurants;
  }
  const ids = restaurants.map((restaurant: any) => restaurant.uid);

  return firestore()
    .collection('USERS')
    .doc(ownerId)
    .collection('SAVED_RESTAURANTS')
    .where('restaurantId', 'in', ids)
    .where('status', '==', true)
    .get()
    .then((snap: admin.firestore.QuerySnapshot) => {
      const saved: any[] = snap.docs.map(doc => doc.data().restaurantId);
      return restaurants.map((restaurant: any) => {
        return {
          ...restaurant,
          saved: saved.includes(restaurant.uid)
        };
      });
    });
}

export async function getListing({ options, user }: any, ctx: ServerContext) {
  const ownerId = user ? user.uid : null;
  let query = firestore()
    .collection('RESTAURANTS')
    .where('show', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(ITEM_PER_PAGE);

  if (options && options.startAfter) {
    const startAfter = options.startAfter;
    query = query.startAfter(timestampFromObj(startAfter));
  }

  return query
    .get()
    .then((snap: admin.firestore.QuerySnapshot) => {
      return snap.docs.map(doc => restaurantFromSnap(doc));
    })
    .then((restaurants: any) => ownerId ? provideSavedStatus({ ownerId, restaurants }, ctx) : restaurants);
}

export async function getRestaurantsInList({ ids }, ctx: ServerContext) {
  if (!ids || ids.length === 0) {
    return [];
  }
  return firestore()
    .collection('RESTAURANTS')
    .where(admin.firestore.FieldPath.documentId(), 'in', ids)
    .get()
    .then((snap: admin.firestore.QuerySnapshot) => {
      let restaurants = [];
      snap.forEach((doc: admin.firestore.DocumentSnapshot) => {
        restaurants.push(restaurantFromSnap(doc));
      })
      return restaurants;
    });
}

export async function getRestaurants(options: any, ctx: any) {
  const { user } = ctx;
  const [sponsors, restaurants] = await Promise.all([
    getRightColSponsors(null, ctx),
    getListing({ options, user }, ctx)
  ]);

  return mergeWithSponsor({ sponsors, restaurants, user }, ctx);
}
