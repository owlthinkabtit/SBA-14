import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import User from '../models/User.js';

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
  scope: ['user:email']
},
async (accessToken, refreshToken, Profiler, done) => {
  try {
    let user = await User.findOne({ githubId: profile.id });

    if (!user) {
      const email = profile.emails[0].value;
      user = await User.findOne({ email });

      if (user) {
        user.githubId = profile.id;
        await user.save();
      } else {
        user = await User.create({
          githubId: profile.id,
          email: email, 
          username: profile.username
        });
      }
    }
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}
));

export default passport;