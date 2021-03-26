// app.js
const app = getApp();
var manager_mgr = require('./utils/manager_mgr.js');
var account_mgr = require('./utils/account_mgr.js');
App({
  manager_mgr,
  account_mgr,
  onLaunch() {
    wx.hideTabBar();
    var that = this;
    that.getSystemInfo();

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;

        this.globalData.navBarHeight = e.statusBarHeight,
          this.globalData.customBarHeight = e.platform == 'android' ? e.statusBarHeight + 50 : e.statusBarHeight + 45,
          this.globalData.titleBarHeight = e.platform == 'android' ? 50 : 45;
      }
    })

    //进入页面获取是否授权----------------------------
    wx.getSetting({
      success(res) {//authSetting用户授权结果
        // console.log(res.authSetting);
        //scope.userInfo
        if (res.authSetting['scope.userInfo']) {//授权过
          // console.log('之前已经授权过信息');
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: function (res) {
              // console.log('之前授权的用户信息是下面一行'); 
              // console.log(res.userInfo);
              wx.setStorageSync('user_profile', res.userInfo)
              // wx.getStorage({
              //   key: 'user_info',
              //   success(res) {
              //     console.log('之前授权的用户信息是' + res.data)
              //     wx.setStorageSync('user_info', data)
              //   }
              // })
              //上面将其存储到本地
              that.globalData.userInfo = res.userInfo;
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          console.log('没有授权')
        }
      }
    })
  },

  getSystemInfo: function () {
    let t = this;
    wx.getSystemInfo({
      success: function (res) {
        t.globalData.systemInfo = res;
      }
    });
  },

  editTabbar: function () {
    let tabbar = this.globalData.tabBar;
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1];
    let pagePath = _this.route;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for (let i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    _this.setData({
      tabbar: tabbar
    });
  },
  globalData: {
    navBarHeight: '',
    customBarHeight: '',
    titleBarHeight: '',
    systemInfo: null,//客户端设备信息
    tabBar: {
      "backgroundColor": "#ffffff",
      "color": "#979795",
      "selectedColor": "#1c1c1b",
      "list": [
        {
          "pagePath": "/pages/index/index",
          "iconPath": "/components/tabbarComponent/icon/icon_home.png",
          "selectedIconPath": "/components/tabbarComponent/icon/icon_home_HL.png",
          "text": "首页"
        },
        {
          "pagePath": "/pages/book/create/create",
          "iconPath": "/components/tabbarComponent/icon/icon_release.png",
          "isSpecial": true,
          "text": "发布"
        },
        {
          "pagePath": "/pages/mine/mine",
          "iconPath": "/components/tabbarComponent/icon/icon_mine.png",
          "selectedIconPath": "/components/tabbarComponent/icon/icon_mine_HL.png",
          "text": "我的"
        }
      ]
    },
    ColorList: [{
      title: '嫣红',
      name: 'red',
      color: '#e54d42'
    },
    {
      title: '桔橙',
      name: 'orange',
      color: '#f37b1d'
    },
    {
      title: '明黄',
      name: 'yellow',
      color: '#fbbd08'
    },
    {
      title: '橄榄',
      name: 'olive',
      color: '#8dc63f'
    },
    {
      title: '森绿',
      name: 'green',
      color: '#39b54a'
    },
    {
      title: '天青',
      name: 'cyan',
      color: '#1cbbb4'
    },
    {
      title: '海蓝',
      name: 'blue',
      color: '#0081ff'
    },
    {
      title: '姹紫',
      name: 'purple',
      color: '#6739b6'
    },
    {
      title: '木槿',
      name: 'mauve',
      color: '#9c26b0'
    },
    {
      title: '桃粉',
      name: 'pink',
      color: '#e03997'
    },
    {
      title: '棕褐',
      name: 'brown',
      color: '#a5673f'
    },
    {
      title: '玄灰',
      name: 'grey',
      color: '#8799a3'
    },
    {
      title: '草灰',
      name: 'gray',
      color: '#aaaaaa'
    },
    {
      title: '墨黑',
      name: 'black',
      color: '#333333'
    },
    {
      title: '雅白',
      name: 'white',
      color: '#ffffff'
    },
    ]
  },


  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
})
