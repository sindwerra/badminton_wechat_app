var domain = 'http://127.0.0.1:8000/book/'
var user_nickname = '用户3'
var manager_name = '用户3'

class manager_mgr {
  constructor() {
  }

  manager_letter_request(url, method, data) {
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

  //用户————创建新的场地信息
  addSiteInfo(opt) {
    var openId = wx.getStorageSync('user_openid');
    var data = {
      manager_id: '1',
      limit_number: opt['limit_number'],
      title_book: opt['title_book'],
      time_book: opt['time_book'],
      site_book: opt['site_book'],
      zone_book: opt['zone_book'],
      payment_method: opt['payment_method'],
      //这里随机填写要修改的信息，未填写的默认认为不修改
    };
    return this.manager_letter_request(domain + 'addsiteinfo/', 'POST', data)
  }

  //用+管————查看所有的场地信息
  allSiteInfo() {
    var data = {
    };
    return this.manager_letter_request(domain + 'allsiteinfo/', 'GET', data)
  }

  //用+管————查看所有未满的的场地信息 
  allNotFullSiteInfo(){
    var data = {
    };
    return this.manager_letter_request(domain + 'allnotfullsiteinfo/', 'GET', data)
  }


  //用户————查看一个场地的具体信息
  getSiteInfoDetail(opt) {
    var data = {
      siteinfo_sign: opt['siteinfo_sign']
    };
    return this.manager_letter_request(domain + 'getdetail/', 'POST', data)
  }

  //用户————提交一个预约申请
  createBookInfo(opt) {
    var data = {
      user_id: "1",
      user_avatarurl: "1",
      nickname: manager_name,
      siteinfo_sign: opt['siteinfo_sign']
    };
    return this.manager_letter_request(domain + 'booksiteinfo/', 'POST', data)
  }

  //管理员————查看所有自己发布的场地信息
  allMySiteInfo(opt) {
    var data = {
      manager_id: "1",
    };
    return this.manager_letter_request(domain + 'allmysiteinfo/', 'POST', data)
  }
  
  //管理员————查看所有未处理的预约信息
  allBookInfo() {
    var data = {
    };
    return this.manager_letter_request(domain + 'allnewbook/', 'GET', data)
  }

  //管理员————通过或拒绝一个申请
  dealBookInfo(opt) {
    var data = {
      bookinfo_sign: opt['nickname'] + opt['siteinfo_sign'],
      next_status: opt['next_status']
    };
    return this.manager_letter_request(domain + 'changebook/', 'POST', data)
  }
  
  //用户————查看自己预约过的场地信息 
  getMyBookInfo(opt) {
    var data = {
      user_nickname: user_nickname
    };
    return this.manager_letter_request(domain + 'getmybooks/', 'POST', data)
  }

  //用户————查看自己预约的总次数
  getAllBooked() {
    var data = {
      user_nickname: user_nickname
    };
    return this.manager_letter_request(domain + 'all_booked/', 'POST', data)
  }

  //用户————查看自己预约成功的总次数
  getAllPass() {
    var data = {
      user_nickname: user_nickname
    };
    return this.manager_letter_request(domain + 'allpass/', 'POST', data)
  }

  //用户————查看自己预约成功的总次数
  getAllPassBySite(opt) {
    var data = {
      siteinfo: opt['siteinfo_sign'],
      user_nickname: user_nickname
    };
    return this.manager_letter_request(domain + 'allpassbysite/', 'POST', data)
  }

  //用户————查看所有具体场地的历史发布信息次数
  getAllSiteCount() {
    var data = {
    };
    return this.manager_letter_request(domain + 'countbysite/', 'GET', data)
  }
  

}

module.exports = new manager_mgr();


//用户————创建新的场地信息  addSiteInfo
//用+管————查看所有的场地信息 allSiteInfo
//用+管————查看所有未满的的场地信息 allNotFullSiteInfo
//用户————查看一个场地的具体信息 getSiteInfoDetail
//用户————提交一个预约申请 createBookInfo
//管理员————查看所有自己发布的场地信息 allMySiteInfo
//管理员————查看所有未处理的预约信息 allBookInfo
//管理员————通过或拒绝一个申请  dealBookInfo
//用户————查看自己预约过的场地信息 getMyBookInfo
//用户————查看自己预约的总次数  getAllBooked
//用户————查看自己预约成功的总次数 getAllPass
//用户————查看自己在某个场地预约成功的总次数 all_pass_bysite
//用户————查看所有具体场地的历史发布信息次数 getAllSiteCount
