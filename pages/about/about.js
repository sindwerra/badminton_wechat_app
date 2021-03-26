/** 解忧杂货铺的关于界面
 * 
 */
var INFO = wx.getSystemInfoSync();

const app = getApp();
Page({
  data: {
    WIDTH: INFO.windowWidth,
    HEIGH: INFO.windowHeight,
    SHOW_CAIDAN: false,
    CAIDAN_ANIMATION: {},
    CAIDAN_TITLE_ANIMATION: {},
    CAIDAN_HEART_ANIMATION: {},
    CAIADN_BODY_ANIMATION: {},
    HEIGHT: INFO.screenHeight,
    STATUS_HEIGHT: INFO.statusBarHeight
  },
  onLoad: function () {
    
  },

  
});
