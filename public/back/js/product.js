/**
 * Created by Jepson on 2018/9/30.
 */
$(function() {

  var currentPage = 1;  // 当前页
  var pageSize = 2;  // 每页多少条

  var picArr = [];  // 维护所有用于提交的图片

  // 1. 一进入页面发送请求, 获取数据渲染
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
          },

          // 控制按钮显示的文字
          // itemTexts 是一个函数, 每个按钮在初始化的时候, 都会调用该函数
          // 将该函数的返回值, 作为按钮的文本
          // type: 按钮的类型, page, first, last, prev, next
          // page: 表示点击按钮跳转的页码
          // current: 当前页
          itemTexts: function(type, page, current) {
            switch ( type ) {
              case "page":
                return page;
              case "first":
                return "首页";
              case "last":
                return "尾页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
            }
          },
          // 每个按钮在初始化的时候, 都会调用一次该函数
          // 将该函数的返回值, 作为按钮的 title 提示文本
          tooltipTitles: function(type, page, current) {
            switch ( type ) {
              case "page":
                return "前往第" + page + "页";
              case "first":
                return "首页";
              case "last":
                return "尾页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
            }
          },

          // 使用 bootstrap 的提示框组件
          useBootstrapTooltip: true
        })

      }
    })
  }



  // 2. 点击添加商品, 显示添加模态框
  $('#addBtn').click(function() {
    // 显示模态框
    $('#addModal').modal("show");

    // 发送 ajax 请求, 获取全部的二级分类数据, 进行渲染下拉框
    // 通过分页接口模拟,获取全部数据的接口, 传page=1, pageSize=100
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: "json",
      success: function( info ) {
        console.log( info )
        var htmlStr = template( "dropdownTpl", info );
        $(".dropdown-menu").html( htmlStr );
      }
    })
  });


  // 3. 给下拉列表的 a 标签添加点击事件(通过事件委托注册)
  //    (1) 可以给动态生成的元素, 添加点击事件
  //    (2) 可以批量注册事件, 且执行效率高, 给大量子元素注册事件, 只需要给父元素注册一次即可
  $('.dropdown-menu').on("click", "a", function() {
    // 获取文本, 设置给按钮
    var txt = $(this).text();
    $('#dropdownTxt').text( txt );

    // 获取 id, 设置给隐藏域
    var id = $(this).data("id");
    $('[name="brandId"]').val( id );
  });


  // 4. 进行文件上传初始化
  //    多文件上传, 进行多次文件的上传的请求
  //    插件, 会遍历选中的所有的文件, 发送多次文件上传的请求, 将来会有多次响应

  $('#fileupload').fileupload({
    dataType: "json",
    // 文件上传, 响应回来时调用的回调函数
    done: function(e, data) {
      // 后台返回的结果
      console.log( data.result );
      // 将图片对象(名称和地址)存储在数组中, 往前面追加
      picArr.unshift( data.result );

      // 图片地址
      var picUrl = data.result.picAddr;

      // 一旦响应得到图片地址, 就将图片渲染给用户看
      $('#imgBox').prepend('<img src="'+ picUrl +'" width="100" height="100" alt="">');

      // 如果数组长度大于 3, 就需要移除最后一张
      // (1) dom 结构中, 移除最后一张图片
      // (2) 数组中, 移除最后一项
      if ( picArr.length > 3 ) {
        // 找imgBox中最后一个img类型的元素, 让其自杀
        $('#imgBox img:last-of-type').remove();
        // 数组移除最后一项
        picArr.pop();
      }

    }
  })



})