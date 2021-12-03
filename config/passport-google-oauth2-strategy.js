const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: "680221469334-o8v5hu43b8fk7oe8ni1viu5m147qkkk4.apps.googleusercontent.com", // e.g. asdfghjkkadhajsghjk.apps.googleusercontent.com
        clientSecret: "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", // e.g. _ASDFA%KFJWIASDFASD#FAD-
        callbackURL: "http://localhost:8001/users/auth/google/callback",
    },

    function(accessToken, refreshToken, profile, done){
        // find a user
        console.log('inside google ');
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if (err){console.log('error in google strategy-passport', err); return;}
            // console.log(accessToken, refreshToken);
            // console.log(profile);
            // console.log(user);

            if (user){
                // if found, set this user as req.user
                return done(null, user);
            }else{
                // if not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if (err){console.log('error in creating user google strategy-passport', err); return;}

                    return done(null, user);
                });
            }

        }); 
    }


));


module.exports = passport;
