const jwt = require('jsonwebtoken');

let APP_SECRET = 'GraphQL-is-aw3some';
// let APP_SECRET_CANARY = require(process.env.APP_SECRET);
let APP_SECRET_CANARY = process.env.APP_SECRET;
let Authorization;
console.log('Authorization declaration:::', Authorization);
console.log('APP_SECRET_CANARY at declaration:::', APP_SECRET_CANARY);

const getUserId = (context, type) => {
  if (type === 'post') {
    Authorization = process.env.APP_SECRET;
    // Authorization = context.request.get('Authorization');
    console.log('getUserId1.Authorization:::', Authorization);
  }
  if (type !== 'post') {
    Authorization = context.request.get('Authorization');
    console.log('getUserId1.Authorization:::', Authorization);
  }

  console.log('getUserId2.Authorization:::', Authorization);
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, APP_SECRET);
    console.log('token:::', token);
    console.log('userId:::', userId);
    return userId;
  }

  throw new Error('Not authenticated');
};

module.exports = { APP_SECRET, getUserId };
