import fetch from 'node-fetch';

export const callCloudFunction = async (functionName: string, data: any = {}) => {
  let url = `https://asia-east2-${process.env.FIREBASE_PROJECT_ID}.cloudfunctions.net/${functionName}`
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  })
    .then(res => res.json())
    .then(result => result.result)
}

export const getBannerSponsors = callCloudFunction.bind(null, 'getBannerSponsors');
export const getRestaurant = callCloudFunction.bind(null, 'getRestaurant');