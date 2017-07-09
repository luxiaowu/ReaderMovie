// movie-more.js
var app = getApp(),
  util = require('../../../utils/util.js');
Page({
  data: {
    movies: {},
    total: 0
  },
  onLoad: function (options) {
    var type = options.type,
      title = options.title,
      _this = this;
    wx.setNavigationBarTitle({
      title: title
    });
    this.data.type = type;
    util.http(app.douban + type, this.processData)
    wx.showNavigationBarLoading();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.data.movies = {};
    this.data.total = 0;
    util.http(app.douban + this.data.type, this.processData)
    wx.showNavigationBarLoading();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    util.http(app.douban + this.data.type + '?start=' + this.data.total + '&count=20', this.processData);
    wx.showNavigationBarLoading();
  },
  processData: function (data) {
    var subjects = data.subjects,
      movies = [];
    subjects.forEach(function (subject) {
      var temp = {
        id: subject.id,
        title: util.shortName(subject.title),
        image: subject.images.large,
        average: subject.rating.average,
        stars: util.convertNumberToArray(subject.rating.stars)
      }
      movies.push(temp);
    })
    if (this.data.movies.length > 0) {
      movies = this.data.movies.concat(movies);
    }
    this.setData({ movies: movies });
    this.data.total += 20;
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onMovieTap: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + id
    })
  }
})