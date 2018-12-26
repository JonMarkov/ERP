// pages/approval_bus/approval_bus_edit.js
var phoneUrl = getApp().globalData.wx_url_1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SQRQdate: '2016-09-01',
    SQRQtime: '12:02',
    SQRY:'',
    CLXH:'',
    CPH:'',
    CCSY:'',
    MDD:'',
    TCRY:'',
    JSY:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 申请日期
  bindSQRQDATEChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      SQRQdate: e.detail.value
    })
  },
  // 申请时间
  bindSQRQTIMEChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      SQRQtime: e.detail.value
    })
  },
  // 申请人员
  ToSQRY: function (e) {
    console.log(e.detail.value)
    this.setData({
      SQRY: e.detail.value
    })
  },
  // 车辆型号
  ToCLXH: function (e) {
    console.log(e.detail.value)
    this.setData({
      CLXH: e.detail.value
    })
  },
  // 车牌号
  ToCPH: function (e) {
    console.log(e.detail.value)
    this.setData({
      CPH: e.detail.value
    })
  },
  // 出差事由
  ToCCSY: function (e) {
    console.log(e.detail.value)
    this.setData({
      CCSY: e.detail.value
    })
  },
  // 目的地
  ToMDD: function (e) {
    console.log(e.detail.value)
    this.setData({
      MDD: e.detail.value
    })
  },
  // 同车人员
  ToTCRY: function (e) {
    console.log(e.detail.value)
    this.setData({
      TCRY: e.detail.value
    })
  },
  // 驾驶员
  ToJSY: function (e) {
    console.log(e.detail.value)
    this.setData({
      JSY: e.detail.value
    })
  },
  // 提交
  TJgc:function(){
    console.log(this.data)
    if (this.data.CLXH =='') {
      wx.showModal({
        title: '提示',
        content: '请填写车辆型号',
      })
      return
    }
    if (this.data.CPH == '') {
      wx.showModal({
        title: '提示',
        content: '请填写车牌号',
      })
      return
    }
    if (this.data.CCSY == '') {
      wx.showModal({
        title: '提示',
        content: '请填写出差事由',
      })
      return
    }
    if (this.data.MDD == '') {
      wx.showModal({
        title: '提示',
        content: '请填写目的地',
      })
      return
    }
    if (this.data.TCRY == '') {
      wx.showModal({
        title: '提示',
        content: '请填写同车人员',
      })
      return
    }
    if (this.data.JSY == '') {
      wx.showModal({
        title: '提示',
        content: '请填写驾驶员',
      })
      return
    }
    if (this.data.SQRQdate == '' || this.data.SQRQtime == '') {
      wx.showModal({
        title: '提示',
        content: '请选择日期或时间',
      })
      return
    }
    // 提交接口
    var SQTime = this.data.SQRQdate + " " + this.data.SQRQtime;
    wx.request({
      url: phoneUrl,
      method: "POST",
      data: {
        service: "submitBusApproval",
        apply_id: this.data.SQRY,
        apply_time: SQTime,
        car_type:this.data.CLXH,
        plate_number:this.data.CPH,
        destination: this.data.MDD,
        reason:this.data.CCSY,
        together: this.data.TCRY,
        driver:this.data.JSY,
        user_id: this.data.user.user_id
      },
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        console.log(res)
        if (res.data.result_desc == "申请提交成功") {
          wx.switchTab({
            url: '/pages/refer_sub/refer_sub'
          })
        }
      }
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
    var that = this;
    // 获取本地缓存内的uesr
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