// pages/changePass/changePass.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fun_id: 2,
    time: '获取验证码', //倒计时 
    currentTime: 60,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  // 监听输入新密码
  watchNewphone: function(event) {
    this.setData({
      Newphone: event.detail.value
    })
  },
  // 监听确认新密码
  watchTwoNewPhone: function(event) {
    this.setData({
      TwoNewPhone: event.detail.value
    })
  },
  // 监听手机号
  watchPhone: function(event) {
    this.setData({
      Phone: event.detail.value
    })
  },
  // 监听验证码
  watchCode: function(event) {
    this.setData({
      Code: event.detail.value
    })
  },
  // 提交
  subLogin: function() {
    console.log(this.data)
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