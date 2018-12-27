// pages/launchList/LaunchList.js
var phoneUrl = getApp().globalData.wx_url_1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    statusTxt: '全部',
    statusType: false,
    status: '',
    status_tpye: '',
    fromList: [
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  // 点击费用明细出险弹出层
  addDet: function() {
    this.setData({
      showModal: true,
    })
  },
  // 点击弹出之后的选择
  // 类型一状态
  selOne: function(e) {
    var status = e.currentTarget.dataset.i
    var type = this.data.type
    this.setData({
      showModal: false,
      statusTxt: '全部',
      status: status
    })
    this.applyErgodi(type,status)

  },
  // 类型二状态
  selTwo: function(e) {
    var type = this.data.type
    var status = e.currentTarget.dataset.i
    this.setData({
      showModal: false,
      statusTxt: '待审核',
      status: status
    })
    this.applyErgodi(type,status)
  },
  // 类型三状态
  selThree: function(e) {
    var type = this.data.type
    var status = e.currentTarget.dataset.i
    this.setData({
      showModal: false,
      statusTxt: '已通过',
      status: status
    })
    this.applyErgodi(type,status)
  },
  // 类型四状态
  selFour: function(e) {
    var type = this.data.type
    var status = e.currentTarget.dataset.i
    this.setData({
      showModal: false,
      statusTxt: '审核中',
      status: status
    })
    this.applyErgodi(type,status)
  },
  // 类五状态
  selFive: function(e) {
    var type = this.data.type
    var status = e.currentTarget.dataset.i
    this.setData({
      showModal: false,
      statusTxt: '已驳回',
      status: status
    })
    this.applyErgodi(type,status)
  },
  // 类型六状态
  selSix: function(e) {
    var type = this.data.type
    var status = e.currentTarget.dataset.i
    this.setData({
      showModal: false,
      statusTxt: '已撤回',
      status: status
    })
    this.applyErgodi(type, status)
  },
  // 跳转审批详情，按照状态跳转
  ToPendingDet: function(e) {
    console.log(this.data)
    console.log(e)
    var index = e.currentTarget.dataset.index;
    var flowId = e.currentTarget.dataset.flowid;
    var username = e.currentTarget.dataset.username
    // 出差审批单
    if (index == 2) {
      wx.navigateTo({
        url: '/pages/approval_out/approval_out?flow_id=' + flowId + '&operateUserName=' + username,
      })
      // 公车使用单
    } else if (index == 4) {
      wx.navigateTo({
        url: '/pages/approval_bus/approval_bus?flow_id=' + flowId + '&operateUserName=' + username,
      })
      // 合同审批单
    } else if (index == 5) {
      wx.navigateTo({
        url: '/pages/approval_contract/approval_contract?flow_id=' + flowId + '&operateUserName=' + username,
      })
      // 业务招待
    } else if (index == 3) {
      wx.navigateTo({
        url: '/pages/approval_entertain/approval_entertain?flow_id=' + flowId + '&operateUserName=' + username,
      })
      // 差旅
    } else if (index == 1) {
      wx.navigateTo({
        url: '/pages/travel_one/travel_see?flow_id=' + flowId + '&operateUserName=' + username,
      })
    }
  },
  // 遍历
  applyErgodi: function(type,status) {
    var that = this
    wx.request({
      url: phoneUrl,
      method: "POST",
      data: {
        service: "myApprovalList",
        user_id: this.data.user.user_id,
        current_page: 1,
        page_size: 10,
        // 查询全部
        status: status,
        // 升序
        type: type
      },
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        console.log(res)
        var MyList = res.data.approvalList;
        var FromList = [];
        for (var i in MyList) {
          let flow_name = MyList[i].flow_name;
          let operate_user_name = MyList[i].operate_user_name;
          let apply_time = that.timestampToTime(MyList[i].apply_time);
          let flow_no = MyList[i].flow_no;
          let wf_id = MyList[i].wf_id;
          let flow_id = MyList[i].flow_id
          // 右侧 1未通过  2为驳回
          let p_status = MyList[i].p_status
          // 下册
          let status = MyList[i].status
          let temp = {
            flow_name: flow_name,
            operate_user_name: operate_user_name,
            apply_time: apply_time,
            flow_no: flow_no,
            p_status: p_status,
            status: status,
            wf_id: wf_id,
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
  addTime: function (e) {
    console.log(e.currentTarget.dataset.i)
    var type = e.currentTarget.dataset.i
    var status = this.data.status
    // 判断状态
    var status_type = this.data.statusType
    if (status_type) {
      this.setData({
        statusType: false,
        tpye: type
      })
    } else {
      this.setData({
        statusType: true,
        tpye: type
      })
    }
    this.applyErgodi(type, status)
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
        // 遍历页面
        var status = -1
        var type = 1
        that.applyErgodi(type,status)
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