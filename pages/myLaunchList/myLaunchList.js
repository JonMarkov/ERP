// pages/launchList/LaunchList.js
var phoneUrl = getApp().globalData.wx_url_1;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 跳转审批详情，按照状态跳转
  ToPendingDet: function (e) {
    console.log(this.data)
    console.log(e)
    var index = e.currentTarget.dataset.index;
    var flowId = e.currentTarget.dataset.flowid;
    var username = e.currentTarget.dataset.username
    if (index == 2) {
      wx.navigateTo({
        url: '/pages/approval_out/approval_out?flow_id=' + flowId + '&operateUserName=' + username,
      })
    } else if (index == 4) {
      wx.navigateTo({
        url: '/pages/approval_bus/approval_bus?flow_id=' + flowId + '&operateUserName=' + username,
      })
    } else if ('合同审批') {
      wx.navigateTo({
        url: '/pages/approval_contract/approval_contract?flow_id=' + flowId + '&operateUserName=' + username,
      })
    } else {
      console.log('业务招待')
      wx.navigateTo({
        url: '/pages/approval_entertain/approval_entertain?flow_id=' + flowId + '&operateUserName=' + username,
      })
    }
  },
  // 遍历
  applyErgodi: function () {
    var that = this
    wx.request({
      url: phoneUrl,
      method: "POST",
      data: {
        service: "hasApprovalList",
        user_id: this.data.user.user_id,
        current_page: 1,
        page_size: 1,
        // 查询全部
        status:-1,
        // 升序
        type:1
      },
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        console.log(res)
        var MyList = res.data.approvalList;
        var FromList = [];
        for (var i in MyList) {
          let flow_name = MyList[i].flow_name;
          let operate_user_name = MyList[i].operate_user_name;
          let apply_time = that.timestampToTime(MyList[i].apply_time);
          let flow_no = MyList[i].flow_no;
          let wf_id = MyList[i].wf_id;
          let worker_name = MyList[i].worker_name
          let p_list = MyList[i].p_list
          // 右侧 1未通过  2为驳回
          let p_status = MyList[i].p_status
          // 下册
          let status = MyList[i].status
          let flow_id = MyList[i].flow_id
          let temp = {
            flow_name: flow_name,
            operate_user_name: operate_user_name,
            apply_time: apply_time,
            flow_no: flow_no,
            p_status: p_status,
            status: status,
            wf_id: wf_id,
            worker_name: worker_name,
            p_list: p_list,
            flow_id: flow_id
          }
          FromList.push(temp)
        }
        that.setData({
          fromList: FromList
        })
      }
    })
  },
  // 时间戳转换时间
  timestampToTime: function (timestamp) {
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
        // 遍历页面
        that.applyErgodi()
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