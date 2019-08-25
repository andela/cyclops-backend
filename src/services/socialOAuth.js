import passport from 'passport';
import GooglePassport from 'passport-google-oauth20';
import FacebookPassport from 'passport-facebook';
import { config } from 'dotenv';

config();

const GoogleStrategy = GooglePassport.Strategy;
const FacebookStrategy = FacebookPassport.Strategy;

const userProfile = (profile) => {
  let imageUrl = '';
  let email = '';
  if (profile.emails && profile.emails.length) {
    email = profile.emails[0].value;
  }
  if (profile.photos && profile.photos.length) {
    imageUrl = profile.photos[0].value;
  }
  return {
    social_id: profile.id,
    name: profile.displayName,
    image: imageUrl,
    email,
    provider: profile.provider
  };
};

// Configure the Google strategy for use by Passport.js
passport.use('google', new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  scope: ['profile', 'email', 'openid'],
  enableProof: true,
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, cb) => cb(null, userProfile(profile))));

// Configure the Facebook strategy for use by Passport.js
passport.use('facebook', new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  scope: ['email', 'public_profile'],
  enableProof: true,
  passReqToCallback: true,
  profileFields: ['id', 'displayName', 'photos', 'email']
}, (req, accessToken, refreshToken, profile, cb) => cb(null, userProfile(profile))));
