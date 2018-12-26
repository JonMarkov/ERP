// pages/approval_contract/approval_contract_edit.js
var phoneUrl = getApp().globalData.wx_url_1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SQRQdate: '2016-09-01',
    SQRQtime: '12:02',
    SQRY: '',
    JFFZR: '',
    YFFZR: '',
    XMMC: '',
    HTJE: '',
    QYJF: '',
    QYYF: '',
    JFFZR: '',
    JFFZR: '',
    HTH: ''
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
  // 项目名称
  ToXMMC: function(e) {
    console.log(e.detail.value)
    this.setData({
      XMMC: e.detail.value
    })
  },
  // 合同金额
  ToHTJE: function(e) {
    console.log(e.detail.value)
    this.setData({
      HTJE: e.detail.value
    })
  },
  // 签约甲方
  ToQYJF: function(e) {
    console.log(e.detail.value)
    this.setData({
      QYJF: e.detail.value
    })
  },
  // 甲方负责人
  ToJFFZR: function(e) {
    console.log(e.detail.value)
    this.setData({
      JFFZR: e.detail.value
    })
  },
  // 乙方负责人
  ToYFFZR: function(e) {
    console.log(e.detail.value)
    this.setData({
      YFFZR: e.detail.value
    })
  },
  // 签约乙方
  ToQYYF: function(e) {
    console.log(e.detail.value)
    this.setData({
      QYYF: e.detail.value
    })
  },
  // 合同号
  ToHTH: function(e) {
    console.log(e.detail.value)
    this.setData({
      HTH: e.detail.value
    })
  },
  // 提交
  TJht: function() {
    if (this.data.XMMC == '') {
      wx.showModal({
        title: '提示',
        content: '请填写项目名称',
      })
      return
    }
    if (this.data.HTJE == '') {
      wx.showModal({
        title: '提示',
        content: '请填写合同金额',
      })
      return
    }
    if (this.data.QYJF == '') {
      wx.showModal({
        title: '提示',
        content: '请填写签约甲方',
      })
      return
    }
    if (this.data.JFFZR == '') {
      wx.showModal({
        title: '提示',
        content: '请填写甲方负责人',
      })
      return
    }
    if (this.data.YFFZR == '') {
      wx.showModal({
        title: '提示',
        content: '请填写已方负责人',
      })
      return
    }
    if (this.data.QYYF == '') {
      wx.showModal({
        title: '提示',
        content: '请填写签约乙方',
      })
      return
    }
    if (this.data.HTH == '') {
      wx.showModal({
        title: '提示',
        content: '请填写合同号',
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
    wx.request({
      url: phoneUrl,
      method: "POST",
      data: {
        service: "submitContractApproval",
        user_id: this.data.user.user_id,
        apply_id: this.data.SQRY,
        project_name: this.data.XMMC,
        contract_amount: this.data.HTJE,
        sign_party_a: this.data.QYJF,
        person_in_charge_a: this.data.JFFZR,
        person_in_charge_b: this.data.YFFZR,
        sign_party_b: this.data.QYYF,
        contract_no: this.data.HTH

      },
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
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
      success: function(res) {
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