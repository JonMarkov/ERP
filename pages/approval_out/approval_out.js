// pages/approval_out/approval_out.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,
    //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框  
  },
  //点击按钮痰喘指定的hiddenmodalput弹出框  
  modalinput: function() {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消按钮  
  cancel: function() {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认  
  confirm: function() {
    this.setData({
      hiddenmodalput: true
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