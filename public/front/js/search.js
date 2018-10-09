/**
 * Created by Jepson on 2018/10/9.
 */

$(function() {
  // 要进行搜索历史记录管理, 要进行本地存储操作, 所以我们需要约定一个键名
  // 专门用于历史记录管理, 键名: search_list

  // 下面 3 行代码, 用于在控制台执行, 进行假数据初始化
  // var arr = [ "艾迪", "爱迪王", "耐克", "匡威" ];
  // var jsonStr = JSON.stringify( arr );
  // localStorage.setItem("search_list", jsonStr);


  // 功能1: 搜索历史记录渲染
  // (1) 从本地存储中读取历史记录  jsonStr
  // (2) 解析 jsonStr, 转成 数组
  // (3) 结合模板引擎渲染
  render();

  // 读取历史记录, 并且以数组的形式范围
  function getHistory() {
    // 没有数据时, 读取出来是 null, 需要做类型处理
    var jsonStr = localStorage.getItem("search_list") || '[]';
    var arr = JSON.parse( jsonStr );
    return arr;
  }

  // 读取历史记录, 得到数组, 并进行页面重新渲染
  function render() {
    var arr = getHistory();
    var htmlStr = template( "history_tpl", { arr: arr });
    $('.lt_history').html( htmlStr );
  }

  // 功能2: 清空历史记录功能
  // (1) 添加清空点击事件(事件委托绑定事件)
  // (2) 使用 removeItem() 清除本地存储的内容
  // (3) 页面重新渲染
  $('.lt_history').on("click", ".icon_empty", function() {

    // 输出提示信息
    // mui.toast("呵呵");


    // 确认框 confirm
    // 参数1: 确认框内容
    // 参数2: 标题文本
    // 参数3: 按钮文本, 数组
    // 参数4: 关闭确认框后的回调函数
    mui.confirm("你确认要清空历史记录嘛", "温馨提示", ["取消", "确认"], function( e ) {
      console.log( e );
      // e.index 指点击的按钮对应的下标
      if ( e.index === 1 ) {
        // 确认按钮
        localStorage.removeItem("search_list"); // 清空history
        render(); // 重新渲染
      }
    })




  });


  // 功能3: 删除单条历史记录: 删除是数组中的某一项
  // (1) 通过事件委托绑定点击事件
  // (2) 取出数组, 从自定义属性中读取下标, 通过下标删除数组中的对应项
  //     arr.splice(从哪开始, 删几个, 添加的项1, 添加的项2, 添加的项3, .... );
  //     arr.splice 会改变原数组
  // (3) 将修改后的数组, 转成jsonStr, 存储到本地
  // (4) 重新渲染
  $('.lt_history').on("click", ".icon_delete", function() {
    // 取出数组
    var arr = getHistory();
    // 读取下标
    var index = $(this).data("index");

    // 通过下标删除数组中的对应项
    arr.splice(index, 1);

    // 转成 jsonStr, 存储到本地
    localStorage.setItem( "search_list", JSON.stringify( arr ) );

    // 重新渲染
    render();
  });




  // 功能4: 添加历史记录功能
  // (1) 给搜索按钮添加点击事件
  // (2) 获取输入框的内容, 添加到数组的最前面
  // (3) 将修改后的数组, 存到本地中
  // (4) 重新渲染
  $('.search_btn').click(function() {
    // 获取关键字
    var key = $('.search_input').val().trim();

    if ( key == "" ) {
      // 提示用户即可
      mui.toast("请输入搜索关键字");
      return;
    }

    // 将关键字添加到数组最前面
    var arr = getHistory();

    // 需求:
    // 1. 如果已经有重复项, 删除重复项
    // 2. 如果长度超过 10, 删除最后一项(最旧的)

    // 有重复项(index!=-1), 删除重复项
    var index = arr.indexOf( key );
    if ( index != -1 ) {
      // 有重复项, 删掉
      arr.splice( index, 1 );
    }

    // 长度不能超过 10
    if ( arr.length >= 10 ) {
      arr.pop();
    }

    arr.unshift( key );

    // 转成 jsonStr, 存储到本地存储中
    localStorage.setItem( "search_list", JSON.stringify( arr ) );

    // 重新渲染
    render();

    // 清空搜索框
    $('.search_input').val("");

    // 跳转到商品列表页
    location.href = "searchList.html?key=" + key;
  });





});
