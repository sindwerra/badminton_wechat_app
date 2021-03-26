// 获取应用实例
const app = getApp()
var { account_mgr } = getApp();

Page({
  data: {
    tabbar: {},
    isManager: false,
    userfuctions: [
      {
        title: '查看所有场地',
        name: '',
        color: 'cyan',
        icon: 'markfill',
        path: '/pages/book/allsite/allsite'
      },
      {
        title: '查看未满场地',
        name: '',
        color: 'purple',
        icon: 'write',
        path: "/pages/book/allnotfull/allnotfull"
      },
      {
        title: '场地次数排序',
        name: '',
        color: 'purple',
        icon: 'write',
        path: "/pages/book/siterank/siterank"
      },
    ],
    managerfuctions: [
      {
        title: '查看所有场地',
        name: '',
        color: 'cyan',
        icon: 'markfill',
        path: '/pages/book/allsite/allsite'
      },
      {
        title: '发布场地信息',
        name: '',
        color: 'purple',
        icon: 'write',
        path: '/pages/book/create/create'
      },
      {
        title: '待处理的预约',
        name: ' ',
        color: 'blue',
        icon: 'post',
        path: '/pages/book/allbook/allbook'
      },
      {
        title: '我发布的 ',
        name: ' ',
        color: 'mauve',
        icon: 'read',
        path: '/pages/book/allmy/allmy'
      },
    ],
  },

  onLoad() {
    var that = this;
    app.editTabbar();
    account_mgr.getIsManager().then(result_data => {
      var code = result_data.code
      var data = result_data.data
      
      if (code === 200) {
        console.log('获取到的用户信息是')
        console.log(result_data.data)
        var isManager_ = result_data.data['is_manager']
        if (isManager_ == '1'){
          that.setData({
            isManager : true
          })
        }
        console.log(that.data.isManager)

      }
    });
    
  },
  getUserInfo(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
