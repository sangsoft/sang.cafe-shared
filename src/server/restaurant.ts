import { firestore } from './firebase';
import { objFromSnap, divideIntoLessThan10 } from './data';
import { removeLevelSpecificData } from './view-level';
import { ITEM_PER_PAGE, ITEM_PER_PAGE_FULL } from '../constants';
import { timestampFromObj } from '../helpers/times';
import * as admin from 'firebase-admin';
import { ServerContext } from '../models/ServerContext';
import { Restaurant } from '../models/Restaurant';
import { getRightColSponsors } from './sponsor';
import { searchRestaurant } from '../helpers/algolia';

function restaurantFromSnap(doc: admin.firestore.DocumentSnapshot): Restaurant {
  let data: any = objFromSnap(doc);
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
      if (!restaurant.show) {
        if (!user) {
          return null;
        }
        if (restaurant.ownerId !== user.uid && !user.admin) {
          return null;
        }
      }
      return removeLevelSpecificData({ user, restaurant });
    });
}
export async function getRestaurantBySlug({ slug }, ctx: ServerContext) {
  const user = null;
  return firestore()
    .collection('RESTAURANTS')
    .where('slug', '==', slug)
    .limit(1)
    .get()
    .then((snap) => {
      if (snap.empty) {
        return null;
      }
      const restaurant = restaurantFromSnap(snap.docs[0]);
      if (!restaurant.show) {
        if (!user) {
          return null;
        }
        if (restaurant.ownerId !== user.uid && !user.admin) {
          return null;
        }
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

  let results = await Promise.all(
    divideIntoLessThan10<string>(ids)
      .map((part: string[]) => {
        return firestore()
          .collection('RESTAURANTS')
          .where(admin.firestore.FieldPath.documentId(), 'in', part)
          .get()
          .then((snap: admin.firestore.QuerySnapshot) => {
            const data = snap.docs.map(doc => restaurantFromSnap(doc));
            return part.map(id => data.find((restaurant) => restaurant.uid === id));
          });
      })
  );

  return results
    .reduce((result, part) => result.concat(part), []);
}

export async function getRestaurantsByPage(options: any, ctx: any) {
  return searchRestaurant({ page: options.page }, ctx);
}

export async function getRestaurantsByCursor(options: any, ctx: any) {
  let query = firestore()
    .collection('RESTAURANTS')
    .where('show', '==', true)
    .orderBy('createdAt', 'desc');

  if (!options) {
    query = query.limit(ITEM_PER_PAGE_FULL);
  } else if (options.after) {
    console.log('Getting restaurants after', new Date(options.after))
    query = query
      .startAfter(admin.firestore.Timestamp.fromDate(new Date(options.after)))
      .limit(ITEM_PER_PAGE_FULL);
  } else if (options.before) {
    console.log('Getting restaurants before', new Date(options.before))
    query = query
      .endBefore(admin.firestore.Timestamp.fromDate(new Date(options.before)))
      .limitToLast(ITEM_PER_PAGE_FULL);
  } else {
    query = query.limit(ITEM_PER_PAGE_FULL);
  }

  return query
    .get()
    .then((snap: admin.firestore.QuerySnapshot) => {
      return snap.docs.map(doc => restaurantFromSnap(doc));
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

export async function getAllRestaurants(options: any, ctx: ServerContext) {
  return firestore()
    .collection('RESTAURANTS')
    .get()
    .then((snap: admin.firestore.QuerySnapshot) => {
      return snap.docs.map((doc: admin.firestore.DocumentSnapshot) => {
        return restaurantFromSnap(doc);
      })
    });
}
