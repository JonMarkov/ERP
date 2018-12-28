// pages/vip_center/vip_center.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  // 我发起的-跳转
  ToLaunch: function() {
    // 把跳转信息本地缓存
    wx.setStorage({
      key: "MaStatus",
      data: 0
    })
    wx.navigateTo({
      url: '/pages/launchList/LaunchList',
    })
  },
  // 待我审批-跳转
  ToPending: function() {
    // 把跳转信息本地缓存
    wx.setStorage({
      key: "MaStatus",
      data: 1
    })
    wx.navigateTo({
      url: '/pages/appList/appList',
    })
  },

  // 我审批的
  ToApproval: function() {
    // 把跳转信息本地缓存
    wx.setStorage({
      key: "MaStatus",
      data: 2
    })
    wx.navigateTo({
      url: '/pages/myLaunchList/myLaunchList',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    // 获取本地缓存内的uesr
    wx.getStorage({
      key: "user",
      success: function(res) {
        that.setData({
          user: res.data
        })
      }
    })
    wx.getStorage({
      key: "count",
      success: function (res) {
        that.setData({
          count: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})