var post_list = require('../../data/post-data.js')
Page({
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
    /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var localReading = wx.getStorageSync('post_reading');
    for (let k in post_list) {
      post_list[k].localReading = localReading[k] || 0;
    }
    this.setData({ post_list: post_list })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    // console.log('onShareAppMessage')
  },
  onTapItem: function (event) {
    var postId = event.currentTarget.dataset.postId;
    wx.navigateTo({
      url: 'post-detail/post-detail?postId='+postId
    })
  },
  onSwiperTap: function (event) {
    var postId = event.target.dataset.postId;
    console.log(postId);
    wx.navigateTo({
      url: 'post-detail/post-detail?postId=' + postId
    })
  }
})