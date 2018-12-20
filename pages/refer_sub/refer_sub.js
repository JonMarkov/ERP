// pages/refer_sub/refer_sub.js
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
  // 出差旅费报销单-跳转
  ToOutBx: function() {
    wx.navigateTo({
      url: '/pages/travel_one/travel',
    })
  },
  // 出差审批单-跳转
  ToOutSp: function() {
    wx.navigateTo({
      url: '/pages/approval_out/approval_out_edit',
    })
  },
  // 业务招待单-跳转
  ToEntertainSp: function() {
    wx.navigateTo({
      url: '/pages/approval_entertain/approval_entertain_edit',
    })
  },
  // 合同审批-跳转
  ToContractSp: function() {
    wx.navigateTo({
      url: '/pages/approval_contract/approval_contract_edit',
    })
  },
  // 公车使用审批
  ToBusSp:function(){
    wx.navigateTo({
      url: '/pages/approval_bus/approval_bus_edit',
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