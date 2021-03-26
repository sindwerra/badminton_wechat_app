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
    siteinfo_sign: '',
    user_nickname:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var { siteinfo_sign, user_nickname} = options;
    that.data.siteinfo_sign = siteinfo_sign
    that.data.user_nickname = user_nickname
    manager_mgr.getSiteInfoDetail({
      siteinfo_sign: siteinfo_sign
    })
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

  //同意该申请
  AgreeBookInfo: function (event) {
    var that = this
    var user_nickname = that.data.user_nickname
    var siteinfo_sign = that.data.siteinfo_sign
    console.log('同意' + user_nickname + siteinfo_sign)
    manager_mgr.dealBookInfo({
      nickname: user_nickname,
      siteinfo_sign: siteinfo_sign,
      next_status: '2'
    }).then(result_data => {
      var code = result_data.code
      var data = result_data.data
      console.log(code)
      console.log(data)
      if (code === 200) {
        that.setData({
          modalName: 'ToastModel',
          modalContent: '已通过',
          modalTitle: '处理申请',
        })
      }
    });
  },

  //拒绝该申请
  RejectBookInfo: function (event) {
    var that = this
    var user_nickname = that.data.user_nickname
    var siteinfo_sign = that.data.siteinfo_sign
    console.log('拒绝' + user_nickname + siteinfo_sign)
    manager_mgr.dealBookInfo({
      nickname: user_nickname,
      siteinfo_sign: siteinfo_sign,
      next_status: '3'
    }).then(result_data => {
      var code = result_data.code
      var data = result_data.data
      console.log(code)
      console.log(data)
      if (code === 200) {
        that.setData({
          modalName: 'ToastModel',
          modalContent: '已通过',
          modalTitle: '处理申请',
        })
      }
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