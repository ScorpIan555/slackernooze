const jwt = require('jsonwebtoken');

let APP_SECRET = 'GraphQL-is-aw3some';
let Authorization;

const getUserId = (context, type) => {
  if (type === 'post') {
    Authorization = process.env.APP_SECRET;
  }
  if (type !== 'post') {
    Authorization = context.request.get('Authorization');
  }

  console.log('Authorization:::', Authorization);
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
