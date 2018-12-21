// pages/travel_one/travel.js
var phoneUrl = getApp().globalData.wx_url_1;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 事由
    causeNum: '',
    // 姓名
    personNum: '',
    // 职位
    positionNum: '',
    // 出差地点
    region: [

    ],
    // 地点需要索引
    index: 0,
    // 开始日期
    starDate: '请选择开始日期',
    starTime: '时间',
    // 截至日期
    endDate: '请选择结束日期',
    endTime: '时间',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取缓存内数据 user部分
    var that = this
    wx.getStorage({
      key: "user",
      success: function(res) {
        that.setData({
          user: res.data,
          personNum: res.data.user_name,
          positionNum: res.data.role
        })
      }
    })
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
  // 选择出差地点
  bindRegionChange: function(e) {
    // 新获取的原始数据值
    var dqList = e.detail.value
    // data原始数据
    var regionList = this.data.region;
    // 新获取的值经过处理
    var newRegion = (dqList.join(",")).split(',').join('')
    // 当前点击的索引
    var index = e.currentTarget.dataset.index
    // 删除当前项，然后添加new获取项目
    regionList.splice(index, 1, newRegion)
    // 把新数组设置到data
    this.setData({
      region: regionList
    })
  },
  // 添加出差地址
  addRegion: function(e) {
    var regionList = this.data.region;
    var newList = "请选择出差地点"
    regionList.push(newList)
    this.setData({
      region: regionList
    })
  },
  // 删除出差地址
  remvoRegion: function(e) {
    console.log(e.currentTarget.dataset.index)
    // 当前点击索引
    var index = e.currentTarget.dataset.index;
    // data原始数据
    var regionList = this.data.region;
    regionList.splice(index, 1)
    this.setData({
      region: regionList
    })
  },
  // 监听出差事由
  causeNum: function(event) {
    this.setData({
      causeNum: event.detail.value
    })
  },
  // 进入页面遍历-函数定义
  nameAndRole: function() {
    var that = this;
    wx.request({
      url: phoneUrl,
      method: "POST",
      data: {
        service: "selectTravelCostOne",
        user_id: this.data.user.user_id,
      },
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        console.log(res)
        if (res.data.result_desc != "暂无数据") {
          // 获取出差地点
          var travelPlaceAre = res.data.approval.travelPlace
          var ardress = travelPlaceAre.split(",")
          ardress.pop()
          // 获取出差截至日期
          var returnTimeStr = res.data.approval.returnTimeStr
          var timeStr = returnTimeStr.split(" ")
          // 获取出差开始日期
          var setOffTimeStr = res.data.approval.setOffTimeStr
          var timeEnd = setOffTimeStr.split(" ")
          // 获取时间事由
          var travelReason = res.data.approval.travelReason
          that.setData({
            flow_no: res.data.approval.flowNo,
            flow_id: res.data.approval.flowId,
            // 出差地点
            region: ardress,
            // 截至日期
            endDate: timeStr[0],
            endTime: timeStr[1],
            // 开始日期
            starDate: timeEnd[0],
            starTime: timeEnd[1],
            // 出差事由
            causeNum: travelReason
          })
        }

      }
    })
  },
  // 提交数据执行函数定义 + 跳转第二步骤
  ToTapSub: function(e) {
    // 姓名
    var traName = this.data.personNum;
    // 职位
    var traPosition = this.data.positionNum;
    // 开始时间
    var tarStarDate = this.data.starDate + " " + this.data.starTime;
    // 判断开始日期和时间是否输入
    if (tarStarDate == '请选择开始日期 时间') {
      wx.showModal({
        title: '提示',
        content: '请填写第开始日前和时间',
      })
      return
    }
    // 结束时间
    var tarEndDate = this.data.endDate + " " + this.data.endTime
    // 判断结束日期和时间是否输入
    if (tarEndDate == '请选择结束日期 时间') {
      wx.showModal({
        title: '提示',
        content: '请填写第结束日前和时间',
      })
      return
    }
    // 出差地点
    var tarRegion = this.data.region;
    // 判断出差地点是否为空
    if (tarRegion == []) {
      wx.showModal({
        title: '提示',
        content: '请添加出差地点',
      })
      return

    }
    // 判断出差地点是否为完善
    for (var i in tarRegion) {
      if (tarRegion[i] == '请选择出差地点') {
        wx.showModal({
          title: '提示',
          content: '请完善出差地点',
        })
        return
      }
    }
    // 出差事由
    var tarCauseNum = this.data.causeNum
    if (tarCauseNum == '') {
      wx.showModal({
        title: '提示',
        content: '请输入出差事由',
      })
      return
    }
    console.log(tarRegion)
    var that = this;
    wx.request({
      url: phoneUrl,
      method: "POST",
      data: {
        service: "submitTravelCostOne",
        user_id: this.data.user.user_id,
        start_date: tarStarDate,
        end_date: tarEndDate,
        travel_place_list: tarRegion,
        travel_reason: tarCauseNum,
        flow_id: this.data.flow_id || '',
        flow_no: this.data.flow_no||''
      },
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        console.log(res)
        // 把订单id放进本地缓存
        wx.setStorage({
          key: "flow_no",
          data: res.data.flow_no
        })
        if (res.data.result_desc == "提交成功") {
          wx.navigateTo({
            url: "/pages/travel_two/travel?flow_id=" + res.data.flow_id + "&" + "flow_no=" + res.data.flow_no,
          })
        }
      }
    })
  },
  // 清空当前页面删除
  Todelete: function() {
    var that = this
    wx.request({
      url: phoneUrl,
      method: "POST",
      data: {
        service: "deleteTravelCostApproval",
        flow_id: this.data.flow_id
      },
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          // 事由
          causeNum: '',
          // 出差地点
          region: [],
          // 地点需要索引
          index: 0,
          // 开始日期
          starDate: '请选择开始日期',
          starTime: '时间',
          // 截至日期
          endDate: '请选择结束日期',
          endTime: '时间',
        })
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
        // 进入页面获取数据 - 函数执行
        that.nameAndRole()
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