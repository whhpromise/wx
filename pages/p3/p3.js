// pages/p3/p3.js
var app=getApp()
Page({
  data: {
   arr:""
  },
  onLoad: function (options) {
    var that=this
     wx.getUserInfo({
        success:function(e){
          //  console.log(e)
           that.setData({
             arr: e.userInfo
           })
           console.log(e.userInfo)
        }
     })
  }
})