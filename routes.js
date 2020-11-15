const router = require("express").Router();
const bodyParser = require("body-parser");
const passport = require("./config/passport.config");

const Auth = require("./controllers/auth");
const { authenticated, hideLogin } = require("./middlewares/auth");

// setup body-parser
router.use(bodyParser.urlencoded({ extended: false }));

// protected route
router.get("/", authenticated, (req, res) => res.render("home"));

// login routes
router.get("/login", hideLogin, Auth.getLogin);

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: "Invalid credentials.",
    successRedirect: "/",
  })
);

// logout
router.get("/logout", Auth.getLogout);

module.exports = router;
