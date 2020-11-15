module.exports = {
  authenticated(req, res, next) {
    if (!req.user) return res.redirect("/login");
    next();
  },
  hideLogin(req, res, next) {
    if (req.user) return res.redirect("/");
    next();
  },
};
