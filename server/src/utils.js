const jwt = require('jsonwebtoken');

let APP_SECRET = 'GraphQL-is-aw3some';
let Authorization;

const getUserId = (context, type) => {
  if (type === 'post') {
    Authorization =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDc5Nzc1Yjg1N2FiYTAwMDdlMWU4NWIiLCJpYXQiOjE1NjgyNDE0OTl9.tPYaphU-uWeXn4jJQaANdNXPd9-SaJoCrrv6etHq5VA';
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
