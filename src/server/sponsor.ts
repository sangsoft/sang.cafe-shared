import { objFromSnap } from './data';
import { firestore } from './firebase';
import admin from 'firebase-admin';
import { ITEM_PER_PAGE } from './constants';
import { getRestaurantsInList } from './restaurant';

export async function provideSponsorsWithRestaurantData({ sponsors }) {
  let restaurantIds = sponsors.map((sponsor) => sponsor.restaurantId);
  let restaurants = await getRestaurantsInList({ ids: restaurantIds });
  // console.log(sponsors.length, restaurants.length, restaurantIds);
  return (sponsors || []).map((sponsor, index) => ({
    ...sponsor,
    restaurant: restaurants[index]
  }));
}

export async function getSponsors({ plans, limit }) {
  const random = require('random');
  const increment = admin.firestore.FieldValue.increment(1);

  let sponsors = await firestore()
    .collection('SPONSORS')
    .where('expiredAt', '>', admin.firestore.Timestamp.now())
    .where('planId', 'in', plans)
    .orderBy('expiredAt', 'desc')
    .get()
    .then((snap) => {
      let newSponsors = [];
      snap.forEach((doc) => {
        // And get its value
        newSponsors.push(doc);
      })
      return newSponsors;
    });
  // console.log(sponsors.map(s => s.get('restaurantId')));
  sponsors = sponsors.reduce((result, sponsor) => {
    if (result.find(s => s.get('restaurantId') === sponsor.get('restaurantId'))) {
      return result;
    }

    return result.concat(sponsor);
  }, []);

  let results = [];
  do {
    let index = random.int(0, sponsors.length - 1);
    results.push(sponsors[index]);
    sponsors.splice(index, 1);
  } while (results.length < limit && sponsors.length > 0);
  return results
    .filter(_ => !!_)
    .map((doc) => {
      // Update the pickCount
      doc.ref.update({ pickCount: increment })
      return objFromSnap(doc);
    });
}

export async function getBannerSponsors() {
  let sponsors = await getSponsors({
    plans: ['sponsor_top_banner', 'sponsor_advance'],
    limit: ITEM_PER_PAGE
  });
  return provideSponsorsWithRestaurantData({ sponsors });
}
