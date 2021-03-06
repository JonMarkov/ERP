// pages/approval_out/approval_out.js
var phoneUrl = getApp().globalData.wx_url_1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,
    //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框  
    reason: ''
  },
  // 点击跳转编辑页面
  ToEdit: function() {
    console.log('跳转')
    wx.navigateTo({
      url: '',
    })
  },
  ToBack: function () {
    wx.navigateBack({

    })
  },
  // 撤回申请
  ToRecall: function() {
    wx.request({
      url: phoneUrl,
      method: "POST",
      data: {
        service: "goBackForApproval",
        user_id: this.data.user.user_id,
        flow_id: this.data.flow_id,
        wf_id: this.data.wf_id

      },
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        console.log(res)
        if (res.data.result_desc == "不能撤回") {
          wx.showModal({
            title: '提示',
            content: '审批中不能撤回',
          })
        } else {
          wx.navigateTo({
            url: '/pages/launchList/LaunchList'
          })
        }

      }
    })
  },
  //点击按钮弹窗指定的hiddenmodalput弹出框  
  ToReject: function() {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput,
      status: 'reject',
      reason: ''
    })
    console.log(this.data)
  },
  ToAdopt: function(e) {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput,
      status: 'adopt',
      reason: ''
    })
  },
  //取消按钮  
  cancel: function(e) {
    console.log(this.data)
    this.setData({
      hiddenmodalput: true
    });
  },
  // 监听审核弹出输入框
  ToTestTk: function(e) {
    this.setData({
      reason: e.detail.value
    })
  },
  //确认  
  confirm: function(e) {
    var reason = this.data.reason;
    let status = this.data.status
    if (status == 'reject') {
      if (reason == '') {
        // 警告弹窗
        return
      }
      // 请求接口
      console.log('通过')
    }
    if (status == 'adopt') {
      console.log('驳回')
      // 请求接口
    }
    this.setData({
      hiddenmodalput: true,
    })
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(this.data)
    console.log(options)
    this.setData({
      flow_id: options.flow_id,
      wf_id: options.wf_id
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
  onShow: function(options) {
    var that = this;
    // 获取本地缓存内的uesr
    wx.getStorage({
      key: "user",
      success: function(res) {
        that.setData({
          user: res.data
        })
        // 遍历页面
        that.HttpDet()
      }
    })
    wx.getStorage({
      key: "MaStatus",
      success: function(res) {
        that.setData({
          MaStatus: res.data
        })
      }
    })
  },
  HttpDet: function() {
    var that = this
    var flow_id = this.data.flow_id
    wx.request({
      url: phoneUrl,
      method: "POST",
      data: {
        service: "travelApprovalDetails",
        flow_id: flow_id
      },
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        console.log(res)
        var detList = res.data.travelApproval
        var statusList = res.data.p_list
        var temp = {
          transportation: detList.transportation,
          mileage: detList.mileage || '',
          transportation: detList.transportation,
          returnTime: that.timestampToTime(detList.returnTime),
          setOffTime: that.timestampToTime(detList.setOffTime),
          way: detList.way || '',
          destination: detList.destination,
          createDate: that.timestampToTime(detList.createDate),
          travelDay: detList.travelDay || '0',
          travelReason: detList.travelReason || ''

        }
        var pList = []
        for (var i in statusList) {
          // 1为待审批  2为已审批
          var type = statusList[i].type
          var status = statusList[i].status
          if (type == 1) {
            var tempStatus = {
              operate_user_name: statusList[i].operate_user_name,
              status: "未审批",
              sta: statusList[i].status
            }
            pList.push(tempStatus)
          } else if (type == 2) {
            var tempStatus = {
              operate_user_name: statusList[i].operate_user_name,
              status: statusList[i] == 0 ? "未审批" : statusList[i] == 1 ? "已通过" : "已驳回",
              sta: statusList[i].status
            }
            pList.push(tempStatus)
          } else {
            var tempStatus = {
              operate_user_name: statusList[i].operate_user_name,
              status: "未审批",
              sta: statusList[i].status
            }
            pList.push(tempStatus)
          }
        }

        that.setData({
          detList: temp,
          pList: pList
        })
        console.log(that.data)
        that.ifBohui()
      }
    })
  },
  ifBohui: function() {
    console.log(this.data)
    var ifBo = this.data.pList
    for (var i in ifBo) {
      if (ifBo[i].sta == 2) {
        this.setData({
          editTwo: true
        })
      } else {
        editTwo: false
      }
    }
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