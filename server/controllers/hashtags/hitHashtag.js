const { song, songuserhashtaglike, hashtaglike } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  try {
    // 곡의 id, hashtag 네임
    const { id, name } = req.body;
    const accessTokenData = isAuthorized(req);

    // 로그인 된 유저인지 확인
    if (!accessTokenData) {
      return res.status(401).json({ message: "You're not logged in" });
    } else {
      const songId = await song.findOne({
        where: {
          id: id
        }
      });

      // 해당 해시태그의 id를 찾기 위함 -> hashtag.datavalues.id
      const hashtag = await hashtaglike.findOne({
        where: { name: name }
      });

      // 해당 유저가 해시태그 3개이상 금지
      const exsHashtag = await songuserhashtaglike.findAll({
        where: {
          userId: accessTokenData.id,
          songId: songId.dataValues.id,
          hashtagId: [2, 3, 4, 5, 6, 7, 8]
        }
      });

      if (name !== '좋아요' && exsHashtag.length >= 3) {
        return res.status(400).json({ message: 'You cannot choose over 3 hashtags' });
      }

      // 해시태그를 중복해서 선택하였을 경우
      const userHashtag = await songuserhashtaglike.findOne({
        where: {
          userId: accessTokenData.id,
          songId: songId.dataValues.id,
          hashtagId: hashtag.dataValues.id
        }
      });

      if (userHashtag) {
        return res.status(400).json({ message: 'already hit the hashtag' });
      }

      await songuserhashtaglike.create({
        userId: accessTokenData.id,
        songId: songId.dataValues.id,
        hashtagId: hashtag.dataValues.id
      });

      return res.status(200).json({ message: 'ok' });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'error' });
  }
};
