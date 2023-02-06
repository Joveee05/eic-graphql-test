const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

exports.verifyApiKey = (req, res, next) => {
  try {
    let token = req.headers['x-api-key'];
    if (!token) {
      return res.status(401).json({
        status: 'ERROR',
        statusCode: 401,
        message: 'No API Key supplied.',
        errors: [],
      });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: 'ERROR',
          statusCode: 401,
          message: 'Invalid API Key .',
          errors: [err.message],
        });
      } else {
        next();
      }
    });
  } catch (error) {
    console.log(error);
  }
};
