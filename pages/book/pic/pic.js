// pages/book/pic/pic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pic_url_ : '',
    pic_url1: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2102165677,3954968234&fm=26&gp=0.jpg',
    pic_url2: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2685110753,26449832&fm=26&gp=0.jpg',
    pic_url3: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3997606392,659550535&fm=26&gp=0.jpg',
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  showModal(event) {
    var that = this;
    var pic_url_ = event.currentTarget.dataset.url
    that.setData({
      pic_url_: event.currentTarget.dataset.url
    })
    console.log(that.data.pic_url_)
    this.setData({
      modalName: 'Image'
    })
  },
  
  

  hideModal(e) {
    this.setData({
      modalName: null
    })
  }
})