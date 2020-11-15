const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

// you should use a database instead
// this is just for exemplification
const db = [
  {
    id: 1,
    email: "email@example.com",
    password: bcrypt.hashSync("secret", 10),
  },
];

passport.use(
  new localStrategy({ usernameField: "email" }, (email, password, done) => {
    // check if email exists
    const user = db.find((u) => u.email === email);
    if (!user) return done(null, false);

    // if email exists check password
    if (!bcrypt.compareSync(password, user.password)) {
      return done(null, false);
    }

    done(null, user);
  })
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  const user = db.find((u) => u.id == id);
  done(null, user);
});

module.exports = passport;
