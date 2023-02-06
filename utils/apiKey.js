'use strict';
require('dotenv').config();
const jwt = require('jsonwebtoken');

(function () {
  const token = jwt.sign(
    {
      app: 'MOVIE LIBRARY',
      creator: 'Brian Etaghene',
      year: 2023,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: new Date(
        Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
    }
  );
  console.log('API KEY=========', token);
})();
