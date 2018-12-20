// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginPhone:'',
    loginPassword:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //密码- 监听输入
  watchPassWord: function (event) {
    this.setData({
      loginPassword: event.detail.value
    })
  },
  //手机号-监听输入
  watchPhone: function (event){
    this.setData({
      loginPhone: event.detail.value
    })
  },
  // 登录
  subLogin:function(){
    console.log(this.data)
    var phoneUrl = getApp().globalData.wx_url_1;
    var loginPhone = this.data.loginPhone;
    var loginPassword = this.data.loginPassword;
    var that = this
    wx.request({
      url: phoneUrl,
      method: "POST",
      data: {
        service: "login",
        login_name: loginPhone,
        password: loginPassword
      },
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        console.log(res.data)
        // 再本地缓存设置参数
        wx.setStorage({
          key: "user",
          data: res.data
        })
        wx.switchTab({
          url: '/pages/home/home',
        })
      }
    })
  },
  // 跳转验证码登录
  ToCode:function(){
    wx.navigateTo({
      url: '/pages/indexCode/indexCode',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})