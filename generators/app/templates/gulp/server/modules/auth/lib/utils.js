import jwt from 'jwt-simple';

const Config = {
  // App Settings

  TOKEN_SECRET: 'YOUR_UNIQUE_JWT_TOKEN_SECRET',

  // OAuth 2.0
  FACEBOOK_SECRET: 'YOUR_FACEBOOK_CLIENT_SECRET',
  GOOGLE_SECRET: 'YOUR_GOOGLE_CLIENT_SECRET',
  GITHUB_SECRET: 'YOUR_GITHUB_CLIENT_SECRET',
  INSTAGRAM_SECRET: 'YOUR_INSTAGRAM_CLIENT_SECRET',
  LINKEDIN_SECRET: 'YOUR_LINKEDIN_CLIENT_SECRET',
  TWITCH_SECRET: 'YOUR_TWITCH_CLIENT_SECRET',
  WINDOWS_LIVE_SECRET: 'YOUR_MICROSOFT_CLIENT_SECRET',

  // OAuth 1.0
  TWITTER_KEY: 'YOUR_TWITTER_CONSUMER_KEY',
  TWITTER_SECRET: 'YOUR_TWITTER_CONSUMER_SECRET'

};

function EnsureAuthenticated(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
  }
  var token = req.headers.authorization.split(' ')[1];

  var payload = null;
  try {
    payload = jwt.decode(token, Config.TOKEN_SECRET);
  }catch (err) {
    return res.status(401).send({ message: err.message });
  }

  req.user = payload;
  next();
}

export {
  Config,
  EnsureAuthenticated
};
