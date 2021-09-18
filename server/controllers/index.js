module.exports = {
  signup: require("./users/singup"),
  login: require("./users/login"),
  logout: require("./users/logout"),
  song: require("./songs/song"),
  comment: require("./comments/comment"),
  editComment: require("./comments/editComment"),
  deleteComment: require("./comments/deleteComment"),
  hitHashtag: require("./hashtags/hitHashtag"),
  deleteHashtag: require("./hashtags/deleteHashtag"),
  hitLike: require("./likes/hitLike"),
  deleteLike: require("./likes/deleteLike"),
  title: require("./search/title"),
  artist: require("./search/artist"),
  userInfo: require("./mypage/userInfo"),
  editUserInfo: require("./mypage/editUserInfo"),
  withdrawal: require("./mypage/withdrawal"),
  myLike: require("./mypage/myLike"),
  deleteMyLike: require("./mypage/deleteMyLike"),
};
