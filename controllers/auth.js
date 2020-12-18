class Auth {
  static getLogin(req, res) {
    const error = { message: Auth.getSessionMsg(req) }
    res.render("login", { error })
  }

  static getLogout(req, res) {
    req.logout()
    res.redirect("/login")
  }

  static getSessionMsg(req) {
    const messages = req.session.messages
    if (!messages) return null
    req.session.messages = []
    if (!messages.length) return null
    return messages[0]
  }
}

module.exports = Auth
