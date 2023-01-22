const { constants } = require('../constants')

const errorHandler = (err, req, res, next) => {
  const { message } = err
  const statusCode = res.statusCode ? res.statusCode : 500
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({ title: 'Validation Failed', message, stackTrace: err.stack })
      break;

    case constants.UNAUTHORIZED:
      res.json({ title: 'Unauthorized', message, stackTrace: err.stack })
      break

    case constants.FORBIDDEN:
      res.json({ title: 'Forbidden', message, stackTrace: err.stack })
      break

    case constants.NOT_FOUND:
      res.json({ title: 'Not Found', message, stackTrace: err.stack })
      break

    case constants.FORBIDDEN:
      res.json({ title: 'Server Error', message, stackTrace: err.stack })

    default:
      console.log('No Error, All Good!')
      break;
  }
}

module.exports = errorHandler