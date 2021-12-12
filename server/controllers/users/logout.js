const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  try {
    const accessTokenData = isAuthorized(req);

    if (!accessTokenData) {
      res.clearCookie('refreshToken');
      return res.status(403).json({ message: 'you are not logged in' });
    }

    res.status(205).json({ message: 'logged out successfully' });
  } catch {
    res.status(400).json({ message: 'error' });
  }
};
