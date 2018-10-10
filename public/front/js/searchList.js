/**
 * Created by Jepson on 2018/10/9.
 */


$(function() {

  // 要进行搜索功能, 首先要获取地址栏传递过来的搜索关键字

  // 功能1: 将搜索关键字, 设置给 input
  var key = getSearch("key");
  $('.search_input').val( key );

  // 一进入页面, 根据关键字, 发送 ajax请求, 获取数据进行渲染
  render();


  function render() {

    // 清空原有数据, 显示成 loading 效果
    $('.lt_product').html('<div class="loading"></div>');


    // 三个必传的参数
    var params = {};
    params.proName = $('.search_input').val();
    params.page = 1;
    params.pageSize = 100;

    // 两个可传的参数 price, num
    // (1) 根据是否有高亮的 a, 判断是否需要排序, 价格或者库存
    // (2) 根据箭头的方向, 判断是升序还是降序, 1 升序, 2 降序
    var $current = $('.lt_sort a.current');

    if ( $current.length > 0 ) {
      // 有高亮的 a, 需要进行排序
      console.log( "需要排序" );
      // 获取传递给后台的键
      var sortName = $current.data("type");   // price
      // 获取传递给后台的值
      var sortValue = $current.find("i").hasClass("fa-angle-down") ? 2 : 1;

      // 拼接到 params 参数中
      params[ sortName ] = sortValue;
    }

    console.log( params );

    setTimeout(function() {
      $.ajax({
        type: "get",
        url: "/product/queryProduct",
        data: params,
        dataType: "json",
        success: function( info ) {
          console.log( info );

          // 得到数据, 通过模板引擎渲染
          var htmlStr = template("tpl", info);
          $('.lt_product').html( htmlStr );
        }
      });
    }, 500);
  }

  // 功能2: 点击搜索功能
  // (1) 添加点击事件
  // (2) 获取搜索关键字, 发送ajax请求, 进行页面重新渲染
  $('.search_btn').click(function() {
    // 调用 render 重新根据关键字渲染即可
    render();
  });



  // 功能3: 实现排序功能
  // (1) 给需要排序的按钮, 添加点击事件
  // (2) 如果当前按钮没有current类, 加上 current类, 其他的移除(排他)
  // (3) 如果当前按钮有 current类, 切换箭头方向即可
  $('.lt_sort a[data-type]').click(function() {

    // 判断类
    if ( $(this).hasClass("current") ) {
      // 如果有, 应该切换箭头方向, 切换的字体图标的类
      $(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
    }
    else {
      // 没有, 加上 current 类, 并且移除到其他的 current
      $(this).addClass("current").siblings().removeClass("current");
    }

    // 所有的排序参数处理, 在 render 函数中, 是根据高亮的 a 以及 上下箭头来判断的
    // 在 render 函数中, 以及设置好了参数了
    render();
  });



});