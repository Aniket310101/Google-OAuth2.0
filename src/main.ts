import OauthAuthorizationController from './controllers/oauth-authorization.controller';
import express from 'express';

require('dotenv').config();
const app = express();

app.get(
  '/oauth-authorization',
  new OauthAuthorizationController().authorizeUser,
);
app.get('/oauth2callback', new OauthAuthorizationController().generateTokens);

app.listen(3000, () => {
  console.log(
    'Listening on http://localhost:3000/oauth-authorization?scopes=email,profile',
  );
});
