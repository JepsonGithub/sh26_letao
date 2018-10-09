/**
 * Created by Jepson on 2018/10/9.
 */


// 只要在布局时, 给盒子设置了 transform 3d 系列属性, 就会触发 gpu硬件加速
// 可以让手机以最优的性能渲染这个盒子, 提高页面渲染效果

// 创建一个mui区域滚动实例, 就可以调用插件实例方法了
mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006,
  indicators: false //是否显示滚动条
});


// 轮播图初始化, 设置轮播周期
// 获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
  interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
});
