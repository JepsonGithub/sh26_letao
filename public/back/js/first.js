/**
 * Created by Jepson on 2018/9/29.
 */
$(function() {
  var currentPage = 1; // 当前页
  var pageSize = 5; // 每页多少条


  // 1. 一进入页面, 发送ajax请求, 请求一级分类全局数据, 通过模板引擎渲染
  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        // 通过 template 方法生成 htmlStr 进行渲染
        var htmlStr = template("tpl", info);
        $('tbody').html( htmlStr );

        // 分页初始化
        $('#paginator').bootstrapPaginator({
          // 版本号 3
          bootstrapMajorVersion: 3,
          // 总页数
          totalPages: Math.ceil( info.total / info.size ),
          // 当前页
          currentPage: info.page,
          // 给页码添加点击事件
          // event 是插件包装过的对象
          // originalEvent 是原始的事件对象
          // type 指代当前点击的页码类型, page普通页码, first, last, next, prev
          // page 指代当前点击按钮对应的页码
          onPageClicked: function(event, originalEvent, type, page) {
            console.log( page );
            // 更新当前页
            currentPage = page;
            // 重新渲染
            render();
          }
        })
      }
    });
  }


  // 2. 点击添加分类按钮, 显示添加模态框
  $('#addBtn').click(function() {
    // 显示添加模态框
    $('#addModal').modal("show");
  })




});
