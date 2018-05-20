// pages/p1/p1.js
Page({
  data: {
    arr: [],
    curren: 0,
  },
  
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: 'http://huanqiuxiaozhen.com/wemall/goodstype/typebrandList',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res)
        // console.log(res.data[0].tree.nodes[0].tree.logo)
        that.setData({
          arr: res.data
        })
     }
})
  },
  clk: function (e) {
     console.log(e)
    this.setData({
      curren: e.target.dataset.id
    })
  }
})