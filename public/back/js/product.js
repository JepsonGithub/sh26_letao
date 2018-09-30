/**
 * Created by Jepson on 2018/9/30.
 */
$(function() {

  var currentPage = 1;  // 当前页
  var pageSize = 5;  // 每页多少条

  // 一进入页面发送请求, 获取数据渲染
  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/product/queryProductDetailList",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        var htmlStr = template("productTpl", info);
        $('tbody').html( htmlStr );

        // 进行分页初始化
        $('#paginator').bootstrapPaginator({
          // 指定版本号
          bootstrapMajorVersion: 3,
          // 总条数
          totalPages: Math.ceil( info.total / info.size ),
          // 当前页
          currentPage: info.page,
          // 给页码添加点击事件
          onPageClicked: function( a, b, c, page ) {
            // 更新当前页
            currentPage = page;
            // 让页面重新渲染
            render();
          }
        })

      }
    })
  }


})