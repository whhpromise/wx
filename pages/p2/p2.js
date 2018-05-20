// pages/p2/p2.js
var sum, pay, list;
Page({
  data: {
    arr2: [],
    yc1: false,
    yc2:false,
    pay:0
  },
  onLoad: function (options) {
    
  },
  onShow:function(){
    var that = this
     list = wx.getStorageSync("cart")
     sum=0;
     pay=0;
    //把合计算出来
     for(var i=0;i<list.length;i++){
       sum+=list[i].price*list[i].times;
       pay+= list[i].times;
     }
    if (list.length>0) {
      try {
        if (list) {
          that.setData({
            arr2: list,
            yc1:false,
            yc2:true,
            sum:sum,
            pay:pay
          })
        }
      } catch (e) {
        console.log(e)
      }
    } else {
      that.setData({
        yc1: true,
        yc2: false
      })
    }
  },
  clk: function (e) {
   //获取当前盒子的索引
   var i=e.target.dataset.id;
   sum=0;
   pay=0;
   list[i].times++;
   for (var i = 0; i < list.length; i++) {
     sum += list[i].price * list[i].times;
     pay += list[i].times;
   }
   this.setData({
       arr2:list,
       sum:sum,
       pay:pay
   })
  },
  clk2:function(e){
    var i = e.target.dataset.id;
    if(list[i].times>1){
      sum = 0;
      pay = 0;
      list[i].times--;
      for (var i = 0; i < list.length; i++) {
        sum += list[i].price * list[i].times;
        pay += list[i].times;
      }
      this.setData({
        arr2: list,
        sum: sum,
        pay: pay
      })

    }
  },
  dele:function(e){
    var i = e.target.dataset.id;
    sum = 0;
    pay = 0;
    list.splice(i, 1);
    for (var i = 0; i < list.length; i++) {
      sum += list[i].price * list[i].times;
      pay += list[i].times;
    }
    this.setData({
      arr2: list,
      sum: sum,
      pay: pay
    })
    try {
      wx.setStorageSync("cart", list)
    } catch (e) {
      console.log(e)
    }
    if(this.data.arr2.length==0){
      this.setData({
        yc1:true,
        yc2:false
      })
    }  
  },
  //下拉刷新
  onPullDownRefresh: function () {
    this.onShow()
    console.log(5)
  },
})