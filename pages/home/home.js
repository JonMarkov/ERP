// pages/home/home.js
let Charts = require('../../utils/wxcharts.js')
var phoneUrl = getApp().globalData.wx_url_1;
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
  // 查询公告
  httpNotice: function() {
    var that = this
    wx.request({
      url: phoneUrl,
      method: "POST",
      data: {
        service: "noticeList",
      },
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        console.log(res.data.notice_list)
        var detList = res.data.notice_list
        that.setData({
          txtlist: detList
        })
        console.log(that.data)
      }
    })
  },
  // 公告详情
  ToNotice: function(e) {
    console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/notice_det/Notice_det?index=' + index,
    })
  },
  // 公告列表
  ToNoticeList: function() {
    wx.navigateTo({
      url: '/pages/notice/Notice',
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
    this.httpNotice()
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