const app = getApp();
var { manager_mgr } = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    site_payment_method: '', // 场地信息的付款方式
    modalName: null,  //（用于弹出通知）
    site_title: '', // 场地信息的标题
    site_zone: '',// 场地信息的省市
    site_location: '', // 场地信息的具体位置
    site_time: '',// 场地信息的具体时间
    site_limit: '', // 场地信息的限制人数
    noteValue: '', // 场地信息的备注信息
    siteinfo_sign:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var siteinfo_sign = options;
    that.data.siteinfo_sign = siteinfo_sign
    manager_mgr.getSiteInfoDetail(siteinfo_sign)
    .then(result_data => {
      var code = result_data.code
      var data = result_data.data
      console.log(code)
      console.log(data)
      if (code === 200) {
        that.setData({
          site_payment_method: data['payment_method'],
          site_title: data['title_book'],
          site_zone: data['zone_book'],
          site_location: data['site_book'],
          site_time: data['time_book'],
          site_limit: data['limit_number'],
          noteValue: data['payment_method']
        })
      }
    });
  },
  
  //预约该场地
  CreateBookInfo(e) {
    var that = this;
    console.log('获取要新预约场地的信息')
    //请求更新网络数据
    manager_mgr.createBookInfo(that.data.siteinfo_sign).then(result_data => {
      var code = result_data.code
      var msg = result_data.msg
      that.setData({
        modalName: 'ToastModel',
        modalContent: msg,
        modalTitle: '预约新场地',
      })

    }).catch(err => {
      console.log('请检查哪里出错了！！！' + err)
    });
  },

  //查询我在这个场地预约过的次数
  QueryNumber(e) {
    var that = this;
    //请求更新网络数据
    manager_mgr.getAllPassBySite(that.data.siteinfo_sign).then(result_data => {
      var code = result_data.code
      var msg = result_data.msg
      that.setData({
        modalName: 'ToastModel',
        modalContent: '我在这里总共成功预约' + msg + '次',
        modalTitle: '查看预约次数',
      })

    }).catch(err => {
      console.log('请检查哪里出错了！！！' + err)
    });
  },

  //查看场地图片
  ViewImage(e) {
    wx.navigateTo({
      url: '/pages/book/pic/pic',
    })
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