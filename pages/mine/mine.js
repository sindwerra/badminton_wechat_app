const app = getApp();
var { manager_mgr } = getApp();

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
    app.editTabbar();

  },

  //关于小程序介绍
  about: function (e) {
    console.log('点击了关于小程序界面')
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  
  //我预约成功的
  myBooked: function (e) {
    wx.navigateTo({
      url: '/pages/mine/mybooks/mybooks',
    })
  },

  //总的预约次数——不论被同意或拒绝
  AllBooked: function (e) {
    var that = this;
    manager_mgr.getAllBooked().then(result_data => {
      var code = result_data.code
      var msg = result_data.msg
      if (code === 200) {
        console.log('--------总预约次数')
        that.setData({
          modalName: 'ToastModel',
          modalContent: '总共预约' + msg + '次',
          modalTitle: '总预约次数',
        })

      }
    }).catch(err => {
      console.log('请检查哪里出错了！！！' + err)
    });
  },

  //预约成功次数
  BookedSuccess: function (e) {
    var that = this;
    manager_mgr.getAllPass().then(result_data => {
      var code = result_data.code
      var msg = result_data.msg
      if (code === 200) {
        console.log('--------预约成功次数')
        that.setData({
          modalName: 'ToastModel',
          modalContent: '总共成功预约' + msg + '次',
          modalTitle: '预约成功次数',
        })

      }
    }).catch(err => {
      console.log('请检查哪里出错了！！！' + err)
    });
  },

  hideModal(e) {
    this.setData({
      modalName: null
    })
  }
   

})