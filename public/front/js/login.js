/**
 * Created by Jepson on 2018/10/10.
 */
$(function() {

  // 登陆操作
  // 1 给登录按钮添加点击事件
  // 2 获取用户名和密码
  // 3 发送请求, 进行登陆
  //   如果登陆成功
  //      (1) 如果是从商品详情拦截过来的, 需要跳回去
  //      (2) 如果是直接访问登陆页, 跳转到个人中心页
  //   如果登陆失败
  //      提示用户: 用户名或者密码错误

  $('#loginBtn').click(function() {

    var username = $('#username').val(); // 用户名
    var password = $('#password').val(); // 密码

    if ( username.trim() === "" ) {
      mui.toast("请输入用户名");
      return;
    }

    if ( password.trim() === "" ) {
      mui.toast("请输入密码");
      return;
    }

    $.ajax({
      type: "post",
      url: "/user/login",
      data: {
        username: username,
        password: password
      },
      dataType: "json",
      success: function( info ) {
        console.log( info )
        // 登陆失败
        if ( info.error === 403 ) {
          mui.toast("用户名或者密码错误");
          return;
        }

        // 登陆成功
        // (1) 有传参, 有retUrl, 需要解析出 retUrl, 将来跳回去
        // (2) 没有传参, 没有 retUrl, 跳转到个人中心
        if ( location.search.indexOf("retUrl") != -1 ) {
          // 解析出 retUrl, 跳转回去
          location.href = location.search.replace("?retUrl=", "");
        }
        else {
          location.href = "user.html";
        }

      }
    })

  })



})
