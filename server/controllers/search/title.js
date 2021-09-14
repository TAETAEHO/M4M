const { song } = require('../../models');
const Sequelize = require('sequelize');
require('sequelize-values')(Sequelize);
const Op = Sequelize.Op;

module.exports = {
  // 예시(http 환경일 때): http://localhost:80/title?query=말해줘
  // 예시(https 환경일 때): https://localhost:80/title?query=말해줘
  findAllTitle: async (req, res) => {
    try {
      if (req.query.query !== undefined) {
        console.log(req.query.query);

        // 쿼리가 비어있을 때
        if (req.query.query.length === 0) {
          return res.status(400).json({
            message: 'Please enter a search term'
          });
        }

        let songInfo = await song.findAll({
          where: {
            title: {
              [Op.like]: '%' + req.query.query + '%'
            }
          }
        });

        if (songInfo.length === 0) {
          res.status(400).json({
            message: 'Title not found'
          });
        } else {
          songInfo = Sequelize.getValues(songInfo);
          songInfo = songInfo.map((song) => {
            song.artist = song.artist.replace(/[|]/g, ',');

            return {
              id: song.id,
              title: song.title,
              artist: song.artist,
              album_art: song.album_art,
              date: song.date
            };
          });
          console.log(songInfo);
          res.status(200).json({
            data: songInfo,
            message: 'ok'
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
};
