var INFO = wx.getSystemInfoSync();
var { manager_mgr } = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas: [],
    LOADING: true,
    STATUS_HEIGHT: INFO.statusBarHeight
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData();
  },

  /**
   * 加载所有的场地信息
   */
  loadData: function () {
    var datas = [];
    manager_mgr.getAllSiteCount().then(result_data => {
      var code = result_data.code
      var data = result_data.data
      if (code === 200) {
        console.log(result_data.data)
        datas = data
      }
      console.log('获取到的场地使用次数信息是')
      console.log(datas)
      setTimeout(() => {
        this.setData({
          datas,
          LOADING: false
        })
      }, 500);
    });
  },


  goBackHandler: function () {
    wx.navigateBack({

    })
  },
  


})