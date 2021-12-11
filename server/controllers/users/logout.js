const { isAuthorized } = require("../tokenFunctions");

module.exports = async (req, res) => {
  try {
    const accessTokenData = isAuthorized(req);
<<<<<<< HEAD

    if (!accessTokenData) {
      res.clearCookie("refreshToken");
      return res.status(403).json({ message: "you are not logged in" });
    }
=======
    // console.log(req);
    if (!accessTokenData) {
      return res.status(401).json({ message: 'You\'re not logged in' });
    }
    res.setHeader('authorization', '');
>>>>>>> 9f262f38378a9c13f7a337254238a232646f51e1

    res.status(205).json({ message: "logged out successfully" });
  } catch {
    res.status(400).json({ message: "error" });
  }
};
