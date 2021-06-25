// Specify whether to use production or development keys

// heroku has an environment variable called NODE_ENV that tells us what environment we're in
if (process.env.NODE_ENV === 'production') {
  // we're in production environment, return prod keys
  module.exports = require('./prod')
} else {
  // we're in development environment, return dev keys
  module.exports = require('./dev');
}
