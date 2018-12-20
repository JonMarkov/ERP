// pages/home/home.js
let Charts = require('../../utils/wxcharts.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    txtlist: [
      '这是第一条公告内容',
      '小程序上下滚动效果总结',
      '这是一行上下滚动的文字，文字最好短点，超过一行省略'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  // 待我审批-跳转
  ToPending: function() {
    wx.navigateTo({
      url: '/pages/appList/appList',
    })
  },
  // 我发起的-跳转
  ToLaunch: function() {
    wx.navigateTo({
      url: '/pages/launchList/LaunchList',
    })
  },
  // 我审批的
  ToApproval: function() {
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