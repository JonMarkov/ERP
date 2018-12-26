// pages/notice/Notice.js
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
        console.log(res)
        var txtlist = []
        var detList = res.data.notice_list
        for (var i in detList) {
          var temp = {
            id: detList[i].id,
            name: detList[i].name,
            content: detList[i].content,
            createDate: that.timestampToTime(detList[i].createDate)
          }
          txtlist.push(temp)
        }
        that.setData({
          txtlist: txtlist
        })
      }
    })
  },
  ToNotice: function(e) {
    console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/notice_det/Notice_det?index=' + index,
    })
  },
  // 时间戳转换时间
  timestampToTime: function(timestamp) {
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