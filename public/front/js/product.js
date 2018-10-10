/**
 * Created by Jepson on 2018/10/10.
 */

$(function() {

  // 1. 一进入页面, 需要获取地址栏传递过来的 productId, 发送ajax请求,
  //    获取该商品数据, 进行渲染
  var productId = getSearch("productId");

  $.ajax({
    type: "get",
    url: "/product/queryProductDetail",
    data: {
      id: productId
    },
    dataType: "json",
    success: function( info ) {
      console.log( info )
      // 结合模板动态渲染
      var htmlStr = template( "productTpl", info );
      $('.lt_main .mui-scroll').html( htmlStr );

      // 手动初始化轮播图
      // 获得slider插件对象
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
      });


      // 手动初始化数字框
      mui(".mui-numbox").numbox()
    }
  })



  // 2. 添加购物车功能
  // (1) 添加点击事件
  // (2) 获取尺码和数量, 发送加入购物车请求
  //     后台自己检测用户是否登陆了
  //     a. 如果没登陆, 直接返回, 提示当前用户未登陆, 拦截到登陆页
  //     b. 如果登陆了, 进行添加购物车操作, 返回添加的结果
  $('#addCart').click(function() {
    // 获取尺码和数量
    var size = $('.lt_size span.current').text();
    var num = $('.mui-numbox-input').val();

    if ( !size ) {
      // 没取到 size, 提示用户选择尺码
      mui.toast("请选择尺码");
      return;
    }


    // 根据用户选择的尺码和数量, 发送添加购物车的请求
    $.ajax({
      type: "post",
      url: "/cart/addCart",
      data: {
        productId: productId,
        size: size,
        num: num
      },
      dataType: "json",
      success: function( info ) {
        // (1) 如果没登陆, 返回未登陆的错误信息
        // (2) 如果登陆了, 返回加入购物车的结果
        console.log( info )
        if ( info.error === 400 ) {
          // 没登陆, 跳转到登录页, 将来在登陆页登陆, 登录成功需要跳转回来, 需要知道当前页的地址
          // 考虑通过地址栏传参, 将当前页的地址传递给登录页
          location.href = "login.html?retUrl=" + location.href;
          return;
        }

        if ( info.success ) {
          console.log( "加入购物车成功" );

          // 加入购物车成功的情况, 弹出一个确认框
          mui.confirm("添加成功", "温馨提示", ["去购物车", "继续浏览"], function( e ) {

            // e.index 指点击的按钮的索引
            if ( e.index === 0 ) {
              location.href = "cart.html";
            }

          })
        }

      }
    })
  })


  // 给尺码添加可选的点击功能
  $('.lt_main').on("click", ".lt_size span", function() {
    // 给当前的尺码加上 current 类, 并且移除其他的 current类
    $(this).addClass("current").siblings().removeClass("current");
  })



})