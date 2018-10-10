/**
 * Created by Jepson on 2018/10/10.
 */

$(function() {

  // 一进入页面, 请求当前用户的所有购物车信息
  // 发送请求
  // (1) 用户未登陆, 拦截到登录页
  // (2) 用户已登录, 才进行购物车的渲染

  function render() {
    setTimeout(function() {
      $.ajax({
        type: "get",
        url: "/cart/queryCart",
        dataType: "json",
        success: function( info ) {
          console.log( info )
          if ( info.error === 400 ) {
            // 未登录状态, 拦截到登录页
            location.href = "login.html";
          }

          else {
            // 已登录, 返回当前的所有购物车数据, 通过模板引擎动态渲染
            var htmlStr = template( "tpl", { list: info } )
            $('.lt_main .mui-scroll').html( htmlStr );


            // 在数据回来, 重新渲染页面后, 关闭下拉刷新,
            // 天坑: mui文档, 下拉刷新结束 api 没更新, 需要打印原型, 查看原型上的方法
            //      endPulldownToRefresh 结束下拉刷新
            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
          }

        }
      });
    }, 500);
  }



  mui.init({
    // 配置下拉刷新或者上拉加载
    pullRefresh : {
      container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      // 配置下拉刷新
      down : {
        auto: true, // 一进入页面, 默认刷新一次
        callback : function() {
          render();
          console.log( "下拉刷新了, 需要请求数据, 重新渲染" );

        }//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      }
    }
  });


})
