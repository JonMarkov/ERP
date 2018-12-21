// pages/travel_three/travel.js
var phoneUrl = getApp().globalData.wx_url_1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['餐饮票', '车船票', '火车票', '机票'],
    invoice: [{
      index: 0,
      id: 0,
      type: '1',
      images: [],
      imagesBase: []
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      capitalTotal: options.capitalTotal,
      flow_no: options.flow_no,
      lowerCaseTotal: options.lowerCaseTotal

    })
  },
  // 添加
  ToAddList: function() {
    var inList = this.data.invoice
    var temp = {
      index: 0,
      id: inList.length,
      type: '',
      images: [],
      imagesBase: []
    }
    inList.push(temp)
    console.log(inList)
    var invoList = this.data.invoice;
    this.setData({
      invoice: invoList
    })
  },
  // 添加图片
  bindChooiceProduct: function(e) {
    // 点击的当前索引
    var index = e.currentTarget.dataset.index
    // 当前的发票数据列表
    var invoiceList = this.data.invoice
    // 需要操作的当前图片列表
    var imgList = invoiceList[index].images
    wx.chooseImage({
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        // 新的图片列表
        var newImgList = imgList.concat(res.tempFilePaths)
        // 把新值赋给原值
        invoiceList[index].images = newImgList
        // data数据
        var invoiceData = this.data.invoice
        // 把数据重新渲染一遍
        this.setData({
          invoice: invoiceData
        })
        // 获取原始数组中的base数组列表
        var imgBase = this.data.invoice[index].imagesBase;
        for (var i in res.tempFilePaths) {
          wx.getFileSystemManager().readFile({
            filePath: res.tempFilePaths[i], //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: res => { //成功的回调
              // 把每一次转换的base64值放进原始数组
              imgBase.push(res.data)
              // 原始数组赋予新值
              this.data.invoice[index].imagesBase = imgBase
              // data数据
              var invoBase = this.data.invoice
              // 把数据重新渲染一遍
              this.setData({
                invoice: invoBase
              })
              // 打印出每次的base64值
              console.log('data:image/png;base64,' + res.data)
            }
          })
        }
        //以下两行注释的是同步方法
        //let base64 = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], 'base64') 
        //console.log(base64)
      }
    })


  },

  // 删除图片
  removeImage(e) {
    console.log(e.currentTarget.dataset.idx)
    console.log(e.currentTarget.dataset.index)
    // 大索引
    var oneIdx = e.currentTarget.dataset.idx
    // 小索引
    var twoIndex = e.currentTarget.dataset.index
    // 删除图片列表中当前项目
    this.data.invoice[oneIdx].images.splice(twoIndex, 1)
    // 删除base64图片列表当前项
    this.data.invoice[oneIdx].imagesBase.splice(twoIndex, 1)
    var removeInvoice = this.data.invoice
    console.log(removeInvoice)
    this.setData({
      invoice: removeInvoice
    })
  },

  // 下拉选择
  bindPickerChange: function(e) {
    //  当前点击索引
    var index = e.currentTarget.dataset.index;
    // 新值
    var new_index = e.detail.value;
    // 给旧值赋新值
    this.data.invoice[index].index = Number(new_index);
    var inIndex = this.data.invoice;
    console.log(inIndex)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      invoice: inIndex
    })
  },
  ToTapSub: function() {
    console.log(this.data)
    var ListImg = this.data.invoice
    var pic_list = []
    for (var i in ListImg) {
      console.log(i)
      var typeWZ = this.data.array[ListImg[i].index]
      var temp = {
        pic_str: ListImg[i].imagesBase,
        type: typeWZ
      }
      pic_list.push(temp)
    }
    console.log(pic_list)
    wx.request({
      url: phoneUrl,
      method: "POST",
      data: {
        service: "submitTravelCostThree",
        flow_no: this.data.flow_no,
        user_id: this.data.user.user_id,
        m_list: pic_list
      },
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        console.log(res.data)
        if (res.data.result_desc == "提交成功") {
          // wx.navigateTo({
          //   url: "/pages/travel_three/travel?flow_no=" + res.data.flow_no + "&" + "lowerCaseTotal=" + res.data.lowerCaseTotal + "&" + "capitalTotal=" + res.data.capitalTotal,

          // })
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
    var that = this
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