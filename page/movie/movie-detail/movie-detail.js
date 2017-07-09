// movie-detail.js
import { Movie } from 'class/Movie';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // detail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id,
      movie = new Movie(app.douban+'subject/' + id);
    movie.getData(detail => {
      this.setData(detail);
    })
  },
  onPreviewImage: function (e) {
    console.log(e);
    var src = e.currentTarget.dataset.src;
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    })
  }
})