//index.js
//获取应用实例
const app = getApp()
var getMusic=require("../../libs/request.js")

var key1;
Page({
  data: {
   arr:["护肤","服装","香水","个人护理"],
   curren:0,
   interval:3000,
   // banner
   imgUrls: [
     'http:\/\/mz.djmall.xmisp.cn\/files\/banner\/20161219\/148211980641.png',
     'http:\/\/mz.djmall.xmisp.cn\/files\/banner\/20161222\/148238831285.png',
     'http:\/\/mz.djmall.xmisp.cn\/files\/banner\/20161222\/14823895573.png'
   ],
   goodslist: [
     {
       id: "001",
       imgUrl: "http://img5.imgtn.bdimg.com/it/u=2906541843,1492984080&fm=23&gp=0.jpg",
       name: "女装T恤中长款大码摆裙春夏新款",
       price: "65.00"
     },
     {
       id: "002",
       imgUrl: "http://img4.imgtn.bdimg.com/it/u=1004404590,1607956492&fm=23&gp=0.jpg",
       name: "火亮春秋季 男青年修身款圆领男士T恤",
       price: "68.00"
     },
     {
       id: "003",
       imgUrl: "http://img1.imgtn.bdimg.com/it/u=2305064940,3470659889&fm=23&gp=0.jpg",
       name: "新款立体挂脖t恤女短袖大码宽松条纹V领上衣显瘦休闲春夏",
       price: "86.00"
     },
     {
       id: "004",
       imgUrl: "http://img4.imgtn.bdimg.com/it/u=3986819380,1610061022&fm=23&gp=0.jpg",
       name: "男运动上衣春季上新品 上衣流行装青年",
       price: "119.00"
     },
     {
       id: "005",
       imgUrl: "http://img1.imgtn.bdimg.com/it/u=3583238552,3525141111&fm=23&gp=0.jpg",
       name: "时尚字母三角露胸t恤女装亮丝大码宽松不规则春夏潮",
       price: "69.00"
     },
     {
       id: "006",
       imgUrl: "http://img2.imgtn.bdimg.com/it/u=1167272381,3361826143&fm=23&gp=0.jpg",
       name: "新款立体挂脖t恤短袖大码宽松条纹V领上衣显瘦休闲春夏",
       price: "86.00"
     },
     {
       id: "007",
       imgUrl: "http://img0.imgtn.bdimg.com/it/u=789486313,2033571593&fm=23&gp=0.jpg",
       name: "时尚字母三角露胸t恤女装亮丝大码宽松不规则春夏潮",
       price: "119.00"
     },
     {
       id: "008",
       imgUrl: "http://img2.imgtn.bdimg.com/it/u=3314044863,3966877419&fm=23&gp=0.jpg",
       name: "男运动上衣春季上新品 上衣流行装青年",
       price: "69.00"
     }
   ],
   searchContent: "",
   content: 0, //初始页数为第一页
   gequ:[],
   datahide:true,
   bottomhide: true
  },
  sarchFn:function(e){
    // 拿到input中的数据
    console.log(e);
    //把获取到的内容存放在data中
    this.setData({
      searchContent:e.detail.value
    })
    console.log(this.data.searchContent)
  },
  searchMusic:function(){
     this.setData({
       bottomhide:false,
        gequ: [],
        content:0
     })
     this.mt();
     this.bottom();
     //收回模态加载框
    //  wx.hideToast();                                                                                                                      
  },
  bottom: function () {
    console.log(1)
    var that = this;
    //为方便书写,将相应的参数保存在变量里
    var name = this.data.searchContent;
    var content = this.data.content+1;//请求在前一次的基础上加一页
    var max = 15;
    console.log(content)
    this.setData({
      content: content
    })
    //请求qq音乐数据
    getMusic.getSearchMusic(name, content, max, function (e) {
      console.log(e.data.song.list)
      if(e.data.song.list.length>0){
        //将数据绑定数组,在页面中显示
        key1 = that.data.gequ.concat(e.data.song.list)
        that.setData({
          gequ: key1
        })
      }else{
        that.setData({
          datahide:false,
          bottomhide:true,
        })
      }   
    })
    },
  onLoad: function () {

  },
  clk: function (e) {
     this.setData({
       curren:e.target.dataset.id
     })
  },
  //模态加载组件
  mt:function(){
    wx.showToast({
      //弹窗显示的文字
      title: '加载中',
      //弹窗显示的图标样式
      icon: "loading",
      duration: 1000
    });
  },
  //下拉刷新
  onPullDownRefresh: function () {
    
  },
  //购物车事件
    add:function(e){
      var fa=false;  //定义节流阀
      var clkid = e.target.dataset.id; //定义需要的id
      var goodslist=this.data.goodslist; //定义需要的数据
      for(var i=0;i<goodslist.length;i++){  //遍历整个数据
        if (goodslist[i].id == clkid){  //   
          console.log(goodslist[i])
            goodslist[i].times=1;
            var arr1=wx.getStorageSync("cart")||[];
              if(arr1.length>0){
                //循环arr1看内部是否存在点击过的数据
                for (var j = 0; j < arr1.length; j++) {
                  if (arr1[j].id == clkid) {
                    arr1[j].times += 1
                    fa=true;
                  }
                }
                //存在的添加次数
                //没存在的直接添加进去
              }
              // else{
              //   arr1.unshift(goodslist[i]);
              //   fa=true;
              // }
              if(!fa){
                arr1.unshift(goodslist[i]);
                fa = false;
           }
        }
      }
       try {
          wx.setStorageSync("cart", arr1)
       } catch (e) {
          console.log(e)
       }
    }
})
