let sponsors = [{
  planId: 'sponsor_top_banner',
  pickCount: 267,
  restaurantId: '9SPksvLxtQKZzXCsgkoB',
  billId: 'G4kUznog5M59DgqKduCv',
  createdAt: { _seconds: 1592386711, _nanoseconds: 555000000 },
  level: 1,
  expiredAt: { _seconds: 1594978711, _nanoseconds: 554000000 },
  path: 'SPONSORS/hjwKmeFC8QDt0M8v2nUs',
  uid: 'hjwKmeFC8QDt0M8v2nUs'
},
{
  createdAt: { _seconds: 1592957795, _nanoseconds: 402000000 },
  level: 1,
  expiredAt: { _seconds: 1595549795, _nanoseconds: 401000000 },
  planId: 'sponsor_top_banner',
  pickCount: 71,
  restaurantId: '03PKYHjbsjmRJ6Ax7JmW',
  billId: '2MS0qXaLtmCswt7nKzHN',
  path: 'SPONSORS/NZwsy92kBA4dr11PwcSS',
  uid: 'NZwsy92kBA4dr11PwcSS'
}]

var shuffle = require('shuffle-array');
console.log(shuffle(sponsors));