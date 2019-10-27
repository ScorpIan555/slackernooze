import { initAuth0 } from '@auth0/nextjs-auth0';

export default initAuth0({
  domain: process.env.AUTHO_DOMAIN,
  clientId: process.env.AUTHO_CLIENT_ID,
  clientSecret: process.env.AUTHO_SECRET,
  scope: 'openid profile',
  redirectUri: 'http://localhost:3000/api/callback',
  postLogoutRedirectUri: 'http://localhost:3000/',
  session: {
    // The secret used to encrypt the cookie.
    cookieSecret: '<RANDOMLY_GENERATED_SECRET>',
    // The cookie lifetime (expiration) in seconds. Set to 8 hours by default.
    cookieLifetime: 60 * 60 * 8,
    // Store the id_token in the session. Defaults to false.
    storeIdToken: false,
    // Store the access_token in the session. Defaults to false.
    storeAccessToken: false,
    // Store the refresh_token in the session. Defaults to false.
    storeRefreshToken: false
  },
  oidcClient: {
    // Optionally configure the timeout in milliseconds for HTTP requests to Auth0.
    httpTimeout: 2500,
    // Optionally configure the clock tolerance in milliseconds, if the time on your server is running behind.
    clockTolerance: 10000
  }
});
