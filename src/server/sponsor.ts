import { objFromSnap } from './data';
import { firestore } from './firebase';
import * as admin from 'firebase-admin';
import { ITEM_PER_PAGE_FULL, RIGHT_COL_SPONSOR_LIMIT } from '../constants';
import { getRestaurantsInList } from './restaurant';
import { ServerContext } from '../models/ServerContext';
import shuffle from 'shuffle-array';

export async function provideSponsorsWithRestaurantData({ sponsors }, ctx: ServerContext) {
  let restaurantIds = sponsors.map((sponsor) => sponsor.restaurantId);
  let restaurants = await getRestaurantsInList({ ids: restaurantIds }, ctx);
  return shuffle((sponsors || []).map((sponsor, index) => ({
    ...sponsor,
    restaurant: restaurants.find(restaurant => restaurant.uid === sponsor.restaurantId)
  })));
}

export async function getSponsors({ plans, limit }, ctx: ServerContext) {
  const random = require('random');
  const increment = admin.firestore.FieldValue.increment(1);

  let sponsors = await firestore()
    .collection('SPONSORS')
    .where('expiredAt', '>', admin.firestore.Timestamp.now())
    .where('planId', 'in', plans)
    .where('disabled', '==', false)
    .orderBy('expiredAt', 'desc')
    .get()
    .then((snap: admin.firestore.QuerySnapshot) => {
      return snap.docs;
    });

  // filter out duplicated sponsors
  sponsors = sponsors
    .reduce((result, sponsor) => {
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

export async function getBannerSponsors(options: any, ctx: ServerContext) {
  let sponsorAutomatics = await getSponsors({
    plans: ['sponsor_automatic'],
    limit: 8
  }, ctx);
  let sponsors = await getSponsors({
    plans: ['sponsor_top_banner', 'sponsor_advance'],
    limit: 16
  }, ctx);
  return provideSponsorsWithRestaurantData({
    sponsors: sponsorAutomatics.concat(sponsors)
  }, ctx);
}

export async function getRightColSponsors(_: any, ctx: any) {
  const sponsors = await getSponsors({
    plans: ['sponsor_right_bar', 'sponsor_advance', 'sponsor_automatic'],
    limit: RIGHT_COL_SPONSOR_LIMIT
  }, ctx);
  return provideSponsorsWithRestaurantData({ sponsors }, ctx);
}
