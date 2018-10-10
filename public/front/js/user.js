/**
 * Created by Jepson on 2018/10/10.
 */


$(function() {


  // 1. 用户基本信息渲染
  //    一进入页面发送 ajax 请求, 获取用户信息
  //    后台自己判断用户登陆状态
  //    (1) 如果用户未登录, 拦截到登录页
  //    (2) 如果用户已登录, 返回用户信息

  $.ajax({
    type: 'get',
    url: "/user/queryUserMessage",
    dataType: "json",
    success: function( info ) {
      console.log( info );
      if ( info.error === 400 ) {
        location.href = "login.html";
      }
      else {
        // 得到了用户信息, 通过模板引擎渲染
        var htmlStr = template("userTpl", info);
        $('#userInfo').html( htmlStr );
      }
    }

  })


  // 2. 退出功能
  $('#logout').click(function() {
    $.ajax({
      type: "get",
      url: "/user/logout",
      dataType: "json",
      success: function( info ) {
        console.log( info );
        if ( info.success ) {
          // 退出成功, 跳转到登录页
          location.href = "login.html";
        }
      }
    })
  })



})