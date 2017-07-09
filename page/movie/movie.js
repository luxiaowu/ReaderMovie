// movie.js
var app = getApp(),
  util = require('../../utils/util.js');
Page({
  data: {
    in_theaters: {},
    coming_soon: {},
    top250: {},
    original: true,
    search_result: false,
    search_cancel: false,
    movies: {}
  },
  onLoad: function () {
    var _this = this;
    wx.request({
      url: app.douban+'in_theaters?count=3',
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        var data = res.data,
          subjects = data.subjects,
          in_theaters = {
            title: data.title,
            type: 'in_theaters',
            subjects: []
          };
        subjects.forEach(function (subject) {
          in_theaters.subjects.push({ id: subject.id, title: subject.title, image: subject.images.large, average: subject.rating.average, stars: util.convertNumberToArray(subject.rating.stars) });
        });
        _this.setData({ 'in_theaters': in_theaters });
      }
    });
    wx.request({
      url: app.douban+'coming_soon?count=3',
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        var data = res.data,
          subjects = data.subjects,
          coming_soon = {
            title: data.title,
            type: 'coming_soon',
            subjects: []
          };
        subjects.forEach(function (subject) {
          coming_soon.subjects.push({ id: subject.id, title: subject.title, image: subject.images.large, average: subject.rating.average, stars: util.convertNumberToArray(subject.rating.stars) });
        });
        _this.setData({ 'coming_soon': coming_soon });
      }
    });
    wx.request({
      url: app.douban+'/top250?count=3',
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        var data = res.data,
          subjects = data.subjects,
          top250 = {
            title: data.title,
            type: 'top250',
            subjects: []
          };
        subjects.forEach(function (subject) {
          top250.subjects.push({ id: subject.id, title: subject.title, image: subject.images.large, average: subject.rating.average, stars: util.convertNumberToArray(subject.rating.stars) });
        });
        _this.setData({ 'top250': top250 });
      }
    });
  },
  getData: function (type) {
    var _this = this;
    util.http
    wx.request({
      url: app.douban + type + '?count=3',
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        var data = res.data,
          subjects = data.subjects,
          three_data = {};
        three_data[type] = {
          title: data.title,
          subjects: []
        }
        subjects.forEach(function (subject) {
          three_data[type].subjects.push({ id: subject.id, title: subject.title, image: subject.images.large, average: subject.rating.average });
        });
        _this.setData({ three_data });
      }
    })
  },
  onMoreTap: function (event) {
    var type = event.currentTarget.dataset.type,
      title = event.currentTarget.dataset.title;
    wx.navigateTo({
      url: 'movie-more/movie-more?type=' + type + '&title=' + title
    })
  },
  onFocus: function () {
    this.setData({
      original: false,
      search_result: true,
      search_cancel: true
    })
  },
  onCancel: function () {
    this.setData({
      original: true,
      search_result: false,
      search_cancel: false
    })
  },
  onConfirm: function (e) {
    var text = e.detail.value;
    util.http(app.douban+'search?q=' + text, this.processData);
    wx.showNavigationBarLoading();
  },
  processData: function (data) {
    var subjects = data.subjects,
      movies = [];
    subjects.forEach(function (subject) {
      movies.push({ id: subject.id, title: util.shortName(subject.title), image: subject.images.large, average: subject.rating.average, stars: util.convertNumberToArray(subject.rating.stars) });
    })
    // if (this.data.movies.length > 0) {
    //   movies = this.data.movies.concat(movies);
    // }
    this.setData({ movies: movies });
    // this.data.total += 20;
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },
  onMovieTap: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id=' + id
    })
  }
})