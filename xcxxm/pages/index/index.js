// 引入用来发送请求的方法  
import { request } from "../../request/index.js"
wx - Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数组
    swiperList: [],
    // 导航  数组
    catesList:[],
    // 楼层数据
    floorList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  wx.request({
    // url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    // success: (result) => {
    // console.log(result);
    // this.setData({
    // swiperList:result.data.message
    // })
    // },
    // });
    this.getSwiperList();
    this.getCatesList();
    this.getFloorList();
  },
  // 获取轮播图数据
  getSwiperList() {
    request({ url: "/home/swiperdata" })
      .then(result => {
        this.setData({
          swiperList: result
        })
      })
  },
  // 获取 导航  数据 
  getCatesList() {
    request({ url: "/home/catitems" })
      .then(result => {
        this.setData({
          catesList: result
        })
      })
  },
  // 获取楼层数据
  getFloorList() {
    request({ url: "/home/floordata" })
      .then(result => {
        this.setData({
          floorList: result
        })
      })
  }
})
