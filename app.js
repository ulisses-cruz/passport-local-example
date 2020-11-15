const express = require("express");
const router = require("./routes");
const hbs = require("hbs");
const cookieSession = require("cookie-session");
const passport = require("passport");

const app = express();
const PORT = process.env.PORT || 3000;

// setup the template engine
app.engine("html", hbs.__express);
app.set("view engine", "html");

// setup session
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    secret: "pleasechangethissecretkeyandmakeitsecret",
  })
);

// setup passport
app.use(passport.initialize());
app.use(passport.session());

// static folder
app.use(express.static("public"));

// routes
app.use("/", router);

app.listen(PORT, () => console.log(`Server on port ${PORT}`));
