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
    manager_mgr.allNotFullSiteInfo().then(result_data => {
      var code = result_data.code
      var data = result_data.data
      if (code === 200) {
        console.log(result_data.data)
        data.map(ret => {
          datas.push(ret);
        });
      }
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
  /**
   * 点击卡片事件
   */
  viewDetailHandler: function (event) {
    //能够获取到整个view的值
    var siteinfo_sign = event.currentTarget.dataset.sign
    console.log('场地的信息是' + siteinfo_sign)
    wx.navigateTo({
      url: '/pages/book/newbook/newbook?siteinfo_sign=' + siteinfo_sign,
    })
  },

 
})