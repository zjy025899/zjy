import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    //左侧菜单栏数据
    leftMenuList: [],
    //右侧菜单栏数据
    rightContent: [],
    // 左侧菜单被点击的
    currentIndex: 0,
    // 右侧内容的滚动条距离顶部的距离
    scrollTop: 0
  },
  //接口的返回数据
  Cates: [],
  onLoad: function (options) {
    // 1.先判断本地存储中有没有旧数据
    // {time:Date.now(),data:[...]}
    // 2.没有旧数据 直接发送新请求
    // 3.有旧数据 同时 旧数据没有过期 就使用本地存储中的数据
    // web中的本地储存  和小程序的本地储存区别
    // web: 存  localStoeage.setItem("key","value")
    // 取  localStoeage.getItem("key")
    // 小程序  存 wx.setStorageSync("key","value")
    //       取  wx.getStorageSync("key")
    //  2:存的时候 有没有做类型转换
    //web: 不管存入的是什么类型的数据，最终都会先调用以下 toString(),把数据变成了字符串 再存入进去
    //小程序: 不存在 类型转换的这个操作 存什么类似的数据进去，获取的时候就是什么类型

    //1.获取本地存储中的数据 
    const Cates = wx.getStorageSync("cates");
    //2.判断 
    if (!Cates) {
      // 不存在 发送请求获取数据
      this.getCates();
    } else {
      //  有旧的数据  定义过期时间
      if (Date.now() - Cates.time > 1000 * 10) {
        // 重新发送请求
        this.getCates();
      } else {
        // 可以使用数据
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  //获取分类页面数据
  async  getCates() {
    //  request({
    //    url: "/categories"
    //  })
    //    .then(res => {
    //      this.Cates = res.data.message;
    //      // 把接口的数据存入到本地存储中
    //      wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
    //      //左侧菜单数据
    //      let leftMenuList = this.Cates.map(v => v.cat_name);
    //      // 右侧商品数据
    //      let rightContent = this.Cates[0].children;
    //      this.setData({
    //        leftMenuList,
    //        rightContent
    //      })
    //    })
    //使用Es7的 async await 来发送请求  
    const res = await request({ url: "/categories" });
    //this.Cates =  ;
    this.Cates = res;
    wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
    let leftMenuList = this.Cates.map(v => v.cat_name);
    let rightContent = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent

    })
  },
  // 左侧菜单点击事件
  handleItemTap(e) {
    //1.获取被点击的标题身上索引
    //2.给data中的currentIndex赋值
    //3.根据不同的索引来渲染右侧的商品内容
    const { index } = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      //重新设置 右侧内容的scroll-view标签的距离距离顶部的距离
      scrollTop: 0
    })
  }
})