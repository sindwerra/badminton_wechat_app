const app = getApp();
var { manager_mgr } = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    site_payment_method: '', // 场地信息的付款方式
    date: '2021-02-10', //日期选择
    modalName: null,  //（用于弹出通知）
    site_title: '', // 场地信息的标题
    site_zone: '',// 场地信息的省市
    site_location: '', // 场地信息的具体位置
    site_time: '',// 场地信息的具体时间
    site_limit: '', // 场地信息的限制人数
    noteValue: '', // 场地信息的备注信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //场地标题的输入
  titleInput(e) {
    this.setData({
      site_title: e.detail.value
    })
  },
  //所在省市的输入
  zoneInput(e) {
    this.setData({
      site_zone: e.detail.value
    })
  },
  //具体位置的输入
  locationInput(e) {
    this.setData({
      site_location: e.detail.value
    })
  },
  //具体时间的输入
  timeInput(e) {
    this.setData({
      site_time: e.detail.value
    })
  },
  //限制人数的输入
  limitInput(e) {
    this.setData({
      site_limit: e.detail.value
    })
  },
  //备注信息的输入
  noteInput(e) {
    this.setData({
      noteValue: e.detail.value
    })
  },
  //付款方式的输入
  payment_methodInput(e) {
    this.setData({
      site_payment_method: e.detail.value
    })
  },
  //日期选择
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },

  CreateSiteInfo(e) {
    var that = this;
    console.log('获取要新创建场地的信息')
    console.log(that.data.date + that.data.site_time)
    console.log(that.data.site_title)
    console.log(that.data.site_zone)
    console.log(that.data.site_location)
    console.log(that.data.site_limit)
    console.log(that.data.noteValue)
    console.log(that.data.site_payment_method)
    //请求更新网络数据
    manager_mgr.addSiteInfo({
      limit_number: that.data.site_limit,
      title_book: that.data.site_title,
      time_book: that.data.date + ' ' + that.data.site_time,
      site_book: that.data.site_location,
      zone_book: that.data.site_zone,
      payment_method: that.data.site_payment_method,
    }).then(result_data => {
      var code = result_data.code
      if (code === 200) {
        console.log('--------创建新场地成功！')
        that.setData({
          modalName: 'ToastModel',
          modalContent: '创建新场地成功！~',
          modalTitle: '创建新场地',
        })

      }
      else if (code == 201) {
        that.setData({
          modalName: 'ToastModel',
          modalContent: '创建新场地失败喔',
          modalTitle: '创建新场地',
        })
        console.log('--------创建新场地失败喔')
      }
    }).catch(err => {
      console.log('请检查哪里出错了！！！' + err)
    });
  },


  hideModal(e) {
    this.setData({
      modalName: null
    })
    wx.navigateBack({
      changed: true
    }); //返回上一页 
  },
})