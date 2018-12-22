// pages/approval_entertain/approval_entertain_edit.js
var phoneUrl = getApp().globalData.wx_url_1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SQRQdate: '2016-09-01',
    SQRQtime: '12:02',
    SQRY: '',
    LFDW: '',
    CCSY: '',
    YCDD: '',
    ZSDD: '',
    LFRS: '',
    LFRS_1: '',
    PTRS: '',
    PTRY: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  // 申请人员
  ToSQRY: function(e) {
    console.log(e.detail.value)
    this.setData({
      SQRY: e.detail.value
    })
  },
  // 来访单位
  ToLFDW: function(e) {
    console.log(e.detail.value)
    this.setData({
      LFDW: e.detail.value
    })
  },
  // 出差事由
  ToCCSY: function(e) {
    console.log(e.detail.value)
    this.setData({
      CCSY: e.detail.value
    })
  },
  // 用餐地点
  ToYCDD: function(e) {
    console.log(e.detail.value)
    this.setData({
      YCDD: e.detail.value
    })
  },
  // 住宿地点
  ToZSDD: function(e) {
    console.log(e.detail.value)
    this.setData({
      ZSDD: e.detail.value
    })
  },
  // 来访人数
  ToLFRS_1: function(e) {
    console.log(e.detail.value)
    this.setData({
      LFRS_1: e.detail.value
    })
  },
  // 来访人员
  ToLFRS: function(e) {
    console.log(e.detail.value)
    this.setData({
      LFRS: e.detail.value
    })
  },
  // 陪同人数
  ToPTRS: function(e) {
    console.log(e.detail.value)
    this.setData({
      PTRS: e.detail.value
    })
  },
  // 陪同人员
  ToPTRY: function(e) {
    console.log(e.detail.value)
    this.setData({
      PTRY: e.detail.value
    })
  },
  // 提交
  TJywzd: function() {
    console.log(this.data)
    if (this.data.SQRY == '') {
      wx.showModal({
        title: '提示',
        content: '请填写申请人员',
      })
      return
    }
    if (this.data.LFDW == '') {
      wx.showModal({
        title: '提示',
        content: '请填写来访单位',
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
    if (this.data.YCDD == '') {
      wx.showModal({
        title: '提示',
        content: '请填写用餐地点',
      })
      return
    }
    if (this.data.ZSDD == '') {
      wx.showModal({
        title: '提示',
        content: '请填写住宿地点',
      })
      return
    }
    if (this.data.LFRS == '') {
      wx.showModal({
        title: '提示',
        content: '请填写来访人数',
      })
      return
    }
    if (this.data.LFRS_1 == '') {
      wx.showModal({
        title: '提示',
        content: '请填写来访人员',
      })
      return
    }
    if (this.data.PTRS == '') {
      wx.showModal({
        title: '提示',
        content: '请填写陪同人数',
      })
      return
    }
    if (this.data.PTRY == '') {
      wx.showModal({
        title: '提示',
        content: '请填写陪同人员',
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
    // 提交
    wx.request({
      url: phoneUrl,
      method: "POST",
      data: {
        service: "submitEntertainApproval",
        user_id: this.data.user.user_id,
        apply_id: this.data.SQRY,
        visit_reason: this.data.CCSY,
        visit_unit:this.data.LFDW,
        eat_place:this.data.YCDD,
        sleep_place:this.data.ZSDD,
        visit_sum:this.data.LFRS,
        visiter:this.data.LFRS_1,
        escort_sum:this.data.PTRS,
        Escorter:this.data.PTRY,

      },
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
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