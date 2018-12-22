// pages/approval_out/approval_out_edit.js
var phoneUrl = getApp().globalData.wx_url_1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ZZtime: '0',
    zt_1: false,
    zt_2: false,
    zt_3: false,
    zt_4: false,
    JTGJ: '',
    SQRY: '',
    SQRQ: '',
    CCSY: '',
    SQRQdate: '2016-09-01',
    SQRQtime: '12:02',
    starDate: '2016-09-01',
    starTime: '12:01',
    endDate: '2016-09-01',
    endTime: '12:01',
    region: ['河北省', '石家庄', '裕华区'],
    region1: ['河北省', '衡水市', '武强县'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  // 选择开始日期
  bindStarDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      starDate: e.detail.value
    })
  },
  // 选择结束日期
  bindEndDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endDate: e.detail.value
    })
  },
  // 选择开始时间
  bindStarTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      starTime: e.detail.value
    })
  },
  // 选择结束时间
  bindEndTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endTime: e.detail.value
    })
  },
  // 地点选择
  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  bindRegionChange_1: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region1: e.detail.value
    })
  },
  // 监听申请人员的姓名
  ToSQRY: function(e) {
    this.setData({
      SQRY: e.detail.value
    })
  },
  // 监听出差事由
  ToCCSY: function(e) {
    this.setData({
      CCSY: e.detail.value
    })
  },
  // 申请日期
  bindSQRQDATEChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      SQRQdate: e.detail.value
    })
  },
  // 申请时间
  bindSQRQTIMEChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      SQRQtime: e.detail.value
    })
  },
  // 交通工具
  ToJTGJ_1: function(e) {
    console.log(e)
    this.setData({
      JTGJ: e._relatedInfo.anchorTargetText,
      zt_1: true,
      zt_2: false,
      zt_3: false,
      zt_4: false
    })
  },
  // 交通工具
  ToJTGJ_2: function(e) {
    console.log(e)
    this.setData({
      JTGJ: e._relatedInfo.anchorTargetText,
      zt_2: true,
      zt_1: false,
      zt_3: false,
      zt_4: false
    })
  },
  // 交通工具
  ToJTGJ_3: function(e) {
    console.log(e)
    this.setData({
      JTGJ: e._relatedInfo.anchorTargetText,
      zt_3: true,
      zt_1: false,
      zt_2: false,
      zt_4: false
    })
  },
  // 交通工具
  ToJTGJ_4: function(e) {
    console.log(e)
    this.setData({
      JTGJ: e._relatedInfo.anchorTargetText,
      zt_4: true,
      zt_1: false,
      zt_3: false,
      zt_2: false
    })
  },
  TJCC: function() {
    var regionMD = (this.data.region).join('')
    var regionTJ = (this.data.region1).join('')
    var SQTime = this.data.SQRQdate + " " + this.data.SQRQtime
    var QWTime = this.data.starDate + " " + this.data.starTime
    var FHTime = this.data.endDate + " " + this.data.endTime
    var dateQW = new Date(QWTime);
    var dateFH = new Date(FHTime);
    var time1 = dateQW.getTime();
    var time2 = dateFH.getTime();
    var ZZtime = ((time2 - time1) / 86400000).toFixed(2)
    this.setData({
      ZZtime: ZZtime
    })
 
    if (this.data.SQRY == '') {
      wx.showModal({
        title: '提示',
        content: '请填写申请人员',
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
    if (this.data.JTGJ == '') {
      wx.showModal({
        title: '提示',
        content: '请选择交通工具',
      })
      return
    }
    wx.request({
      url: phoneUrl,
      method: "POST",
      data: {
        service: "submitTravelApproval",
        transportation: this.data.JTGJ,
        apply_id: this.data.SQRY,
        apply_time: SQTime,
        travel_reason: this.data.CCSY,
        set_off_time: QWTime,
        return_time: FHTime,
        travel_day: this.data.ZZtime,
        destination: regionMD,
        way: regionTJ,
        user_id:this.data.user.user_id
      },
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        console.log(res)
      }
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