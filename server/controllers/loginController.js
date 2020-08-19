const { google } = require('googleapis');

const loginController = {};

loginController.oAuth = async (req, res, next) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.Client_ID,
    process.env.Client_Secret,
    'http://localhost:3000/api/login/google'
  );

  const scopes = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/classroom.profile.photos',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/calendar.events',
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    response_type: 'code',
    prompt: 'consent',
  });

  res.locals.url = url;
  return next();
};
//creates Oauth token
loginController.afterConsent = (req, res, next) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.Client_ID,
    process.env.Client_Secret,
    'http://localhost:3000/api/login/google'
  );

  oauth2Client
    .getToken(req.query.code)
    .then((data) => {
      const { tokens } = data;
      oauth2Client.setCredentials(tokens);
      res.locals.token = tokens.id_token;
      return next();
    })
    .catch((err) => {
      if (err) console.log('afterConsent .catch block: ', err);
    });
};

module.exports = loginController;
