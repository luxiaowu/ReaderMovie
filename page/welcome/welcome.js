// welcome.js
Page({
  onLoad: function () {
    wx.getUserInfo({
      success: res => {
        var userInfo = res.userInfo,
          nickName = userInfo.nickName,
          avatarUrl = userInfo.avatarUrl;
          this.setData({nickName: nickName, avatarUrl: avatarUrl});
      },
      fail: () => {
        this.setData({ nickName: "游客同学", avatarUrl: '/image/avatar.jpg'})
      }
    })
  },
  onTap: function () {
    wx.switchTab({
      url: '/page/post/post',
    })
  }
})