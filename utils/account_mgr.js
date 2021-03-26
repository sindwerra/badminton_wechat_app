var domain = 'http://127.0.0.1:8000/account/'
var user_nickname = '用户3'


class account_mgr {
  constructor() {
  }
  
  user_account_request(url, method, data) {
    return new Promise((RES, REJ) => {
      wx.request({
        url: url,
        method: method,
        header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
        data: data,
        success: ret => {
          try {
            var data = ret.data
            var json_data = JSON.stringify(data)
            var result_data = JSON.parse(json_data)
            var code = result_data.code
            var msg = result_data.msg
            var data = result_data.data
            return RES(result_data)
          } catch (e) {
            return REJ(e);
          }
        }
      })
    })
  }

  //判断登录用户是否是管理员
  getIsManager() {
    var data = {
      nickname: user_nickname
    };
    return this.user_account_request(domain + 'get_user_profile/', 'POST', data)
  }
 
  
}


module.exports = new account_mgr();
