import { ITEM_PER_PAGE } from '../constants';
import { getRestaurantsInList, mergeWithSponsor } from '../server/restaurant';
import { removeLevelSpecificData } from '../server/view-level';
import { getRightColSponsors } from '../server/sponsor';

export let client: any;
export const indexes: { [key: string]: any } = {};

function lazyInitializeClient() {
  if (!client) {
    const algoliasearch = require('algoliasearch');

    let ALGOLIA_ID = process.env.ALGOLIA_ID;
    let ALGOLIA_SEARCH_KEY = process.env.ALGOLIA_SEARCH_KEY;

    console.log('ALGOLIA', ALGOLIA_ID, ALGOLIA_SEARCH_KEY)
    client = algoliasearch(ALGOLIA_ID, ALGOLIA_SEARCH_KEY);
    indexes['restaurants'] = client.initIndex('restaurants');
  }

  return client;
}

export async function searchRestaurant({
  name,
  district,
  city,
  type,
  page,
}: {
  name?: string;
  district?: string;
  city?: string;
  type?: string;
  page?: number;
}, ctx: any) {
  const { user } = ctx;

  lazyInitializeClient();
  const { hits, nbPages, nbHits, exhaustiveNbHits } = await indexes['restaurants']
    .search(name || '', {
      page: page || 0,
      hitsPerPage: 24,
      facetFilters: [
        district ? `district:${district}` : null,
        city ? `city:${city}` : null,
        type ? `type:${type}` : null,
        'show:true',
      ].filter(_ => !!_),
    });
  const restaurants = await getRestaurantsInList({ ids: hits.map((hit: any) => hit.objectID) }, ctx)
    .then((restaurants) => restaurants.map((restaurant: any) => removeLevelSpecificData({
      user, restaurant,
    })))
    .then(async (restaurants) => mergeWithSponsor({
      sponsors: await getRightColSponsors(null, ctx),
      restaurants,
      user,
    }, ctx));

  return {
    restaurants,
    nbHits,
    nbPages,
    exhaustiveNbHits
  }
}