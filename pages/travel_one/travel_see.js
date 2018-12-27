// pages/travel_one/travel_see.js
var phoneUrl = getApp().globalData.wx_url_1;
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
    console.log(options)
    this.setData({
      flow_id: options.flow_id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  costHttp: function() {
    console.log(this.data.flow_id)
    var that = this
    wx.request({
      url: phoneUrl,
      method: "POST",
      data: {
        service: "travelCostApprovalDetail",
        flow_id: this.data.flow_id,
      },
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        console.log(res)
        that.setData({
          role: res.data.role,
          return_time: that.timestampToTime(res.data.return_time),
          set_off_time: that.timestampToTime(res.data.set_off_time),
          travel_reason: res.data.travel_reason
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    wx.getStorage({
      key: "MaStatus",
      success: function(res) {
        that.setData({
          MaStatus: res.data
        })
        that.costHttp()
      }
    })
    wx.getStorage({
      key: "user",
      success: function (res) {
        that.setData({
          user: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },
  // 时间戳转换时间
  timestampToTime: function (timestamp) {
    var date = new Date(timestamp * 1); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y + M + D + h + m + s;
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