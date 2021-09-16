module.exports = {
  searchTest: require("./test/searchTest"),
  signup: require("./users/singup"),
  login: require("./users/login"),
  logout: require("./users/logout"),
  song: require("./songs/song"),
  comment: require("./songs/comment"),
  editComment: require("./songs/editComment"),
  deleteComment: require("./songs/deleteComment"),
  hitHashtag: require("./songs/hitHashtag"),
  deleteHashtag: require("./songs/deleteHashtag"),
  searchTest: require("./test/searchTest"),
  title: require("./search/title"),
  artist: require("./search/artist"),
  userInfo: require("./mypage/userInfo"),
  editUserInfo: require("./mypage/editUserInfo"),
  withdrawal: require("./mypage/withdrawal"),
  myLike: require("./mypage/myLike"),
  deleteMyLike: require("./mypage/deleteMyLike"),
};
