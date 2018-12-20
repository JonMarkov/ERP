// pages/indexCode/indexCode.js
var phoneUrl = getApp().globalData.wx_url_1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fun_id: 2,
    time: '获取验证码', //倒计时 
    currentTime: 60,
    loginPhone: '',
    loginPassword: ''
  },
  // 获取验证码-请求接口
  getVerificationCode: function(options) {
    // 改变this指向
    var that = this;
    // 获取当前输入的手机号
    var loginPhone = this.data.loginPhone
    // 如果手机号输入不等于11位则不会成功调取接口
    if (loginPhone.length != 11) {
      console.log('请输入正确的手机号')
    } else {
      // 请求获取验证码接口
      wx.request({
        url: phoneUrl,
        method: "POST",
        data: {
          service: "sendSMSCode",
          login_name: loginPhone,
        },
        header: {
          "content-type": "application/json"
        },
        success: function(res) {
          console.log(res.data)
        }
      })
      // 倒计时时间
      var currentTime = that.data.currentTime
      // 定时器，每秒减一
      var interval = setInterval(function() {
        currentTime--;
        that.setData({
          disabled: true,
          time: currentTime + '秒'
        })
        // 如果倒计时时间小于等于0则回归初始状态
        if (currentTime <= 0) {
          clearInterval(interval)
          that.setData({
            time: '获取验证码',
            currentTime: 60,
            disabled: false
          })
        }
      }, 1000)
    }

  },
  // 登录
  subLogin: function() {
    console.log(this.data)
    var phoneUrl = getApp().globalData.wx_url_1;
    var loginPhone = this.data.loginPhone;
    var loginPassword = this.data.loginPassword;
    var that = this
    wx.request({
      url: phoneUrl,
      method: "POST",
      data: {
        service: "messageLogin",
        login_name: loginPhone,
        identifyCode: loginPassword
      },
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        console.log(res.data)
      }
    })
  },
  //密码- 监听输入
  watchPassWord: function(event) {
    this.setData({
      loginPassword: event.detail.value
    })
  },
  //手机号-监听输入
  watchPhone: function(event) {
    this.setData({
      loginPhone: event.detail.value
    })
  },
  ToLogin:function(){
    wx.navigateTo({
      url: '/pages/index/index',
    })
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