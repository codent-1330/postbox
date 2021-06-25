const passport = require('passport');

module.exports = (app) => {
  app.get(
  	'/auth/google',
  	passport.authenticate('google', {
  		scope: ['profile', 'email']
  	})
  );

  app.get('/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
    );

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

// lambda expr uses args request, response
// sends user log out info when done
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};


// ***************** DOCUMENTATION *****************************************
/*
// since we are using passport library, we must require it and store in const
const passport = require('passport');

// Since the app object isn't defined in this file (it's in index.js), we
  // have to find a way to get the app.get methods into index.js
  // We export the methods and ASSUME that it will receive an app arg
  // then in index.js, we require this file
module.exports = (app) => {
  app.get(
  	'/auth/google',
  	passport.authenticate('google', {
  		scope: ['profile', 'email']
  	})
  );


  // Step 15: Route Handler to handle auth/google/callback and code
    // the code in the URL tells passport.authenticate that user isn't logging in for
    // the first time. So they must be trying to turn the code into a user profile.
  app.get('/auth/google/callback', passport.authenticate('google'));

  // lambda expr uses args request, response
  // sends user log out info when done
    app.get('/api/logout', (req, res) => {
      res.logout();
      res.send(req.user);
    });

};

*/
