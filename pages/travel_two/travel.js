// pages/travel/travel.js
var phoneUrl = getApp().globalData.wx_url_1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 开始日期
    starDate: '2016-09-01',
    starTime: '12:01',
    // 截至日期
    endDate: '2016-09-01',
    endTime: '12:01',
    // 判断车船是否选中
    selOne: false,
    // 判断住宿费是否选中
    selTwo: false,
    // 判断培训费是否选中
    selThree: false,
    // 判断其他费用是否选中
    selFour: false,
    // 判断会议费是否选中
    selFive: false,
    // 判断出差补助是否选中
    selSix: false,
    // 判断伙食补助是否选中
    selSeven: false,
    showModal: false,
    array: ['汽车', '火箭', '千里马', 'F1'],
    index: 0,
    item_list: [
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      flow_no: options.flow_no
    })
  },
  // 清空当前页面
  TodetItem: function() {
    var that = this
    console.log(this.data.flow_no)
    wx.request({
      url: phoneUrl,
      method: "POST",
      data: {
        service: "deleteTravelCostItems",
        flow_no: this.data.flow_no,
      },
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          item_list: []
        })
      }
    })
  },
  // 删除
  ToRomvo: function(e) {
    var index = e.currentTarget.dataset.index
    console.log(e.currentTarget.dataset.index)
    var dataItem = this.data.item_list
    console.log(this.data.item_list)
    dataItem.splice(index, 1)
    console.log(dataItem)
    this.setData({
      item_list: dataItem
    })
  },
  // 提交数据执行函数定义 + 跳转第三步骤
  ToBtnDown: function(e) {
    var that = this;
    let mxList = this.data.item_list
    let itemList = []
    for (let i in mxList) {
      let index = i;
      let indexI = ++index
      // 判断天数是否为空
      if (mxList[i].days == '') {
        wx.showModal({
          title: '提示',
          content: '请填写第' + index + '个天数选择框',
        })
        return
      }
      // 判断人数是否为空
      if (mxList[i].travel_place == '') {
        wx.showModal({
          title: '提示',
          content: '请填写第' + index + '个人数选择框',
        })
        return
      }
      // 判断开始时间是否选择
      if (mxList[i].start_time == '请选择开始日期' || mxList[i].starTime == '时间') {
        wx.showModal({
          title: '提示',
          content: '请填写第' + index + '个开始日期或时间选择框',
        })
        return
      }
      // 判断结束日期是否选择
      if (mxList[i].end_time == '请选择结束日期' || mxList[i].endTime == '时间') {
        wx.showModal({
          title: '提示',
          content: '请填写第' + index + '个结束日期或时间选择框',
        })
        return
      }
      // 判断金额是否选择
      if (mxList[i].amount == '') {
        wx.showModal({
          title: '提示',
          content: '请填写第' + index + '个金额选择框',
        })
        return
      }
      // 判断费用说明是否选择
      if (mxList[i].mark == ''&& mxList[i].type == '5') {
        wx.showModal({
          title: '提示',
          content: '请填写第' + index + '个费用说明选择框',
        })
        return
      }
      if (mxList[i].type == '6') {
        var standard = this.data.foodAllowance
      }
      if (mxList[i].type == '7') {
        var standard = this.data.travelAllowance
      }
      console.log(mxList[i])
      var temp = {
        "type": mxList[i].type || '',
        'days': mxList[i].days || '',
        'vehicle': mxList[i].vehicle || '',
        'travel_place': mxList[i].travel_place || '',
        'start_time': mxList[i].start_time + ' ' + mxList[i].starTime || '',
        'end_time': mxList[i].end_time + ' ' + mxList[i].endTime || '',
        'standard': standard || '',
        'amount': mxList[i].amount || '',
        'mark': mxList[i].mark || ''
      }
      itemList.push(temp)
    }
    console.log(itemList)
    wx.request({
      url: phoneUrl,
      method: "POST",
      data: {
        service: "submitTravelCostTwo",
        flow_no: this.data.flow_no,
        item_list: itemList
      },
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        console.log(res.data)
        if (res.data.result_desc == "提交成功") {
          wx.navigateTo({
            url: "/pages/travel_three/travel?flow_no=" + res.data.flow_no + "&" + "lowerCaseTotal=" + res.data.lowerCaseTotal + "&" + "capitalTotal=" + res.data.capitalTotal,

          })
        }
      }
    })

  },
  // 点击费用明细出险弹出层
  addDet: function() {
    this.setData({
      showModal: true,
      // 判断车船是否选中
      selOne: false,
      // 判断住宿费是否选中
      selTwo: false,
      // 判断培训费是否选中
      selThree: false,
      // 判断其他费用是否选中
      selFour: false,
      // 判断会议费是否选中
      selFive: false,
      // 判断出差补助是否选中
      selSix: false,
      // 判断伙食补助是否选中
      selSeven: false,
    })
  },
  // 弹出层里面的弹窗
  addOk: function() {
    console.log(this.data.selTwo)
    let itemList = this.data.item_list
    let selOne = this.data.selOne;
    let selTwo = this.data.selTwo
    let selThree = this.data.selThree
    let selFour = this.data.selFour
    let selFive = this.data.selFive
    let selSix = this.data.selSix
    let selSeven = this.data.selSeven
    console.log(selOne)
    // 车船费
    if (selOne) {
      let temp = {
        // 补助类型：1-7
        'type': '1',
        // 交通工具
        'vehicle': '汽车',
        // 人数
        'travel_place': '',
        // 开始时间
        'start_time': '请选择开始日期',
        'starTime': '时间',
        // 结束时间
        'end_time': '请选择结束日期',
        'endTime': '时间',
        // 金额
        'amount': '',
      }
      itemList.push(temp)
    }
    // 住宿费
    if (selTwo) {
      let temp = {
        // 补助类型：1-7
        'type': '2',
        // 人数
        'travel_place': '',
        // 开始时间
        'start_time': '请选择开始日期',
        'starTime': '时间',
        // 结束时间
        'end_time': '请选择结束日期',
        'endTime': '时间',
        // 金额
        'amount': '',
      }
      itemList.push(temp)
    }
    // 会议费
    if (selThree) {
      let temp = {
        // 补助类型：1-7
        'type': '3',
        // 人数
        'travel_place': '',
        // 开始时间
        'start_time': '请选择开始日期',
        'starTime': '时间',
        // 结束时间
        'end_time': '请选择结束日期',
        'endTime': '时间',
        // 金额
        'amount': '',
      }
      itemList.push(temp)
    }
    // 培训费
    if (selFour) {
      let temp = {
        // 补助类型：1-7
        'type': '4',
        // 人数
        'travel_place': '',
        // 开始时间
        'start_time': '请选择开始日期',
        'starTime': '时间',
        // 结束时间
        'end_time': '请选择结束日期',
        'endTime': '时间',
        // 金额
        'amount': '',
      }
      itemList.push(temp)
    }
    // 其他费用
    if (selFive) {
      let temp = {
        // 补助类型：1-7
        'type': '5',
        // 人数
        'travel_place': '',
        // 开始时间
        'start_time': '请选择开始日期',
        'starTime': '时间',
        // 结束时间
        'end_time': '请选择结束日期',
        'endTime': '时间',
        // 金额
        'amount': '',
        // 费用说明
        'mark': ''
      }
      itemList.push(temp)
    }
    // 出差补助
    if (selSix) {
      let temp = {
        // 补助类型：1-7
        'type': '6',
        // 开始时间
        'start_time': '请选择开始日期',
        'starTime': '时间',
        // 结束时间
        'end_time': '请选择结束日期',
        'endTime': '时间',
        // 标准
        'standard': '',
        // 金额
        'amount': '',
        // 天数
        'days': ''
      }
      itemList.push(temp)
    }
    // 伙食补助
    if (selSeven) {
      let temp = {
        // 补助类型：1-7
        'type': '7',
        // 开始时间
        'start_time': '请选择开始日期',
        'starTime': '时间',
        // 结束时间
        'end_time': '请选择结束日期',
        'endTime': '时间',
        // 标准
        'standard': '',
        // 金额
        'amount': '',
        // 天数
        'days': ''
      }
      itemList.push(temp)
    }
    console.log(itemList)
    this.setData({
      item_list: itemList,
      showModal: false
    })
  },
  // 点击弹出之后的选择
  // 类型一状态
  selOne: function() {
    this.setData({
      selOne: true
    })
  },
  // 类型二状态
  selTwo: function() {
    this.setData({
      selTwo: true
    })
  },
  // 类型三状态
  selThree: function() {
    this.setData({
      selThree: true
    })
  },
  // 类型四状态
  selFour: function() {
    this.setData({
      selFour: true
    })
  },
  // 类五状态
  selFive: function() {
    this.setData({
      selFive: true
    })
  },
  // 类型六状态
  selSix: function() {
    this.setData({
      selSix: true
    })
  },
  // 类型七状态
  selSeven: function () {
    this.setData({
      selSeven: false
    })
  },
  // 监听人数输入框
  ToOneNum: function(e) {
    console.log(e)
    let itemList = this.data.item_list
    // 当前操作的索引
    let index = e.currentTarget.dataset.index;
    // 修改后的值
    let new_travel_place = e.detail.value;
    // 替换第index个数组
    this.data.item_list[index].travel_place = new_travel_place
    console.log(this.data.item_list)
  },
  // 监听天数输入框
  ToDays: function(e) {
    console.log(e)
    let itemList = this.data.item_list
    // 当前操作的索引
    let index = e.currentTarget.dataset.index;
    // 修改后的值
    let new_travel_place = e.detail.value;
    // 替换第index个数组
    this.data.item_list[index].days = new_travel_place
    console.log(this.data.item_list)
  },
  // 监听金额输入框
  ToPlace: function(e) {
    console.log(this.data)
    let itemList = this.data.item_list
    // 当前操作的索引
    let index = e.currentTarget.dataset.index;
    // 修改后的值
    let new_travel_place = e.detail.value;
    // 替换第index个数组
    this.data.item_list[index].amount = new_travel_place
    console.log(this.data.item_list)
  },
  // 监听选择开始日期
  bindStarDateChange: function(e) {
    // 获取当前点击索引
    let index = e.currentTarget.dataset.index
    // 获取修改后的值
    let new_star_date = e.detail.value
    // 替换第index个数组
    this.data.item_list[index].start_time = new_star_date
    this.setData({
      item_list: this.data.item_list
    })
  },
  // 监听选择结束日期
  bindEndDateChange: function(e) {
    // 获取当前点击索引
    let index = e.currentTarget.dataset.index
    // 获取修改后的值
    let new_star_date = e.detail.value
    // 替换第index个数组
    this.data.item_list[index].end_time = new_star_date
    this.setData({
      item_list: this.data.item_list
    })
  },
  // 监听选择开始时间
  bindStarTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(e.currentTarget.dataset.index)
    // 获取当前点击索引
    let index = e.currentTarget.dataset.index
    // 获取修改后的值
    let new_star_date = e.detail.value
    // 替换第index个数组
    this.data.item_list[index].starTime = new_star_date
    this.setData({
      item_list: this.data.item_list
    })
  },
  // 监听选择结束时间
  bindEndTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(e.currentTarget.dataset.index)
    // 获取当前点击索引
    let index = e.currentTarget.dataset.index
    // 获取修改后的值
    let new_star_date = e.detail.value
    // 替换第index个数组
    this.data.item_list[index].endTime = new_star_date
    this.setData({
      item_list: this.data.item_list
    })
  },
  //监听交通工具下拉框
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e)
    let index = e.currentTarget.dataset.index
    // 当前选择数组的索引
    let i = e.detail.value;
    // 交通工具列表
    let vehicleList = this.data.array;
    // 新获取的值
    let newVehicle = vehicleList[i];
    // 替换第index个数组
    this.data.item_list[index].vehicle = newVehicle;
    this.setData({
      item_list: this.data.item_list
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  // 进入页面遍历执行是否有原始数据
  itemTwo: function() {
    var that = this
    wx.request({
      url: phoneUrl,
      method: "POST",
      data: {
        service: "selectItemsTwo",
        flow_no: this.data.flow_no,
      },
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        console.log(res)
        var itemList = res.data.itemsList
        if (itemList != '') {
          console.log('2')
          var detList = []
          for (var i in itemList) {
            // 获取出差截至日期
            var returnTimeStr = itemList[i].endTimeStr
            var timeStr = returnTimeStr.split(" ")
            // 获取出差开始日期
            var setOffTimeStr = itemList[i].startTimeStr
            var timeEnd = setOffTimeStr.split(" ")
            var temp = {
              type: itemList[i].type,
              travel_place: itemList[i].travelPlace,
              type: itemList[i].type,
              vehicle: itemList[i].vehicle,
              amount: itemList[i].amount,
              mark: itemList[i].mark,
              start_time: timeEnd[0],
              starTime: timeEnd[1],
              end_time: timeStr[0],
              endTime: timeStr[1]
            }
            detList.push(temp)
          }
          console.log(detList)
          that.setData({
            item_list: detList
          })
        }
        // item_list: [{
        //   // 补助类型：1-7
        //   'type': '1',
        //   // 交通工具
        //   'vehicle': '汽车',
        //   // 人数
        //   'travel_place': '',
        //   // 开始时间
        //   'start_time': '请选择开始日期',
        //   'starTime': '时间',
        //   // 结束时间
        //   'end_time': '请选择结束日期',
        //   'endTime': '时间',
        //   // 金额
        //   'amount': '',
        // }]

      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    // 获取缓存内的餐补
    wx.getStorage({
      key: "foodAllowance",
      success: function(res) {
        that.setData({
          foodAllowance: res.data
        })
      }
    })
    // 获取缓存内的出差补助
    wx.getStorage({
      key: "travelAllowance",
      success: function(res) {
        that.setData({
          travelAllowance: res.data
        })
      }
    })
    // 获取缓存内的出差补助
    wx.getStorage({
      key: "flow_no",
      success: function(res) {
        that.setData({
          flow_no: res.data
        })
      }
    })
    // 进入页面遍历执行
    that.itemTwo()

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