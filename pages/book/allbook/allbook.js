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

  onShow() {
    var that = this;
    app.onShow();
    this.loadData();
  },

  /**
   * 
   */
  loadData: function () {
    var datas = [];
    manager_mgr.allBookInfo().then(result_data => {
      var code = result_data.code
      var data = result_data.data
      if (code === 200) {
        console.log(result_data.data)
        data.map(ret => {
          ret['style'] = this.getRandomColor();
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


  /**
   * 点击卡片事件
   */
  viewDetailHandler: function (event) {
    //能够获取到整个view的值
    var siteinfo_sign = event.currentTarget.dataset.sign
    var user_nickname = event.currentTarget.dataset.name
    // console.log('场地的信息是' + siteinfo_sign)
    wx.navigateTo({
      url: '/pages/book/dealbook/dealbook?user_nickname=' + user_nickname + '&siteinfo_sign=' + siteinfo_sign,
    })
  },

  // 获取随机颜色
  getRandomColor: function () {
    // 随机颜色列表
    var COLORS = [
      ['#B4EC51', '#429321'],
      ['#FAD961', '#F76B1C'],
      ['#F5515F', '#9F041B'],
      ['#C86DD7', '#3023AE'],
      ['#2C82CD', '#1DAF7A'],
      ['#2AF598', '#009EFD'],
      ['#667eea', '#764ba2'],
      ['#30cfd0', '#330867'],
      ['#fee140', '#fa709a'],
      ['#434343', '#000000'],

      ['#BAC8E0', '#6A85B6'],
      ['#F43B47', '#453A94'],
      ['#f78ca0', '#fe9a8b'],
      ['#FFB199', '#FF0844'],
      ['#3CBA92', '#0BA360']
    ];
    var randomNum = parseInt(Math.random() * COLORS.length);
    var color = COLORS[randomNum] || COLORS[0];
    return 'background-image: linear-gradient(135deg, ' + color[0] + ' 0%, ' + color[1] + ' 100%);';
  }
})