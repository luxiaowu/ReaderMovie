var post_data = require('../../../data/post-data.js'),
  isPlayingMusic = getApp().isPlayingMusic,
  isPlayingId = getApp().isPlayingId;
Page({
  data: {
    isPlayingMusic: false
  },
  onLoad: function (options) {
    var postId = options.postId,
      post_detail = post_data[postId],
      post_collected = wx.getStorageSync('post_collected'),
      post_reading = wx.getStorageSync('post_reading'),
      _this = this;
    this.setData(post_detail);
    //查看收藏和初始化收藏缓存记录
    if (post_collected) {
      var collected = post_collected[postId];
      this.setData({
        collected: collected
      })
    } else {
      var post_collected = {};
      post_collected[postId] = false;
      wx.setStorageSync('post_collected', post_collected);
    }
    //利用storage记录查看数
    if (post_reading && post_reading[postId]) {
      post_reading[postId] ++;
    } else if (post_reading) {
      post_reading[postId] = 1;
    } else {
      var post_reading = {};
      post_reading[postId] = 1;
    }
    // if (!post_reading) {
    //   var post_reading = {};
    // }
    // if (post_reading[postId]) {
    //   post_reading[postId] ++;
    // } else {
    //   post_reading[postId] = 1;
    // }
    wx.setStorageSync('post_reading', post_reading);
    // 全局记录音乐播放状态和ID
    if (isPlayingMusic && isPlayingId == postId) {
      this.setData({ isPlayingMusic: true });
    }
    wx.onBackgroundAudioPlay(function () {
      _this.setData({ isPlayingMusic: true });
      isPlayingMusic = true;
      isPlayingId = postId;
      // this.setData({
      //   isPlayingMusic: isPlayingMusic
      // });
    });
    wx.onBackgroundAudioPause(function () {
      _this.setData({ isPlayingMusic: false });
      isPlayingMusic = false;
      isPlayingId = '';
      // this.setData({
      //   isPlayingMusic: isPlayingMusic
      // });
    });
    wx.onBackgroundAudioStop(function () {
      _this.setData({ isPlayingMusic: false });
      isPlayingMusic = false;
      isPlayingId = '';
    });
  },
  onCollectionTap: function () {
    var post_collected = wx.getStorageSync('post_collected'),
      postId = this.data.postId,
      collected = post_collected[postId];
    collected = !collected;
    post_collected[postId] = collected;
    wx.setStorageSync('post_collected', post_collected);
    this.setData({ collected: collected });
    wx.showToast({
      title: collected ? '收藏成功' : '取消收藏成功'
    });
  },
  onMusicTap: function () {
    var postId = this.data.postId,
      postMusic = post_data[postId].music;
    if (isPlayingMusic && isPlayingId == postId) {
      wx.pauseBackgroundAudio();
    } else {
      wx.playBackgroundAudio({
        dataUrl: postMusic.url,
        title: postMusic.title,
        coverImgUrl: postMusic.coverImg,
      })
    }
  }
})