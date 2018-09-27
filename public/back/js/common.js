/**
 * Created by Jepson on 2018/9/27.
 */

// 想要实现进度条功能, 使用 NProgress 插件

//// 开启进度条 start
//NProgress.start();
//
//setTimeout(function() {
//  // 关闭进度条 done
//  NProgress.done();
//}, 2000);



// ajax 全局事件
// .ajaxComplete()  当每个 ajax 完成时进行调用 (不管成功还是失败, 都调用)
// .ajaxError()     当每个 ajax 请求失败时, 进行调用
// .ajaxSuccess()   当每个 ajax 请求成功时, 进行调用
// .ajaxSend()      在每个 ajax 请求发送之前调用

// .ajaxStart()     在第一个 ajax 请求发送时调用
// .ajaxStop()      在所有的 ajax 请求完成时调用

// 需求: 在发送第一个ajax的时候, 开启进度条, 在全部的ajax回来的时候, 结束进度条
$(document).ajaxStart(function() {
  // 开启进度条
  NProgress.start();
});

$(document).ajaxStop(function() {

  // 模拟网络延迟
  setTimeout(function() {
    // 关闭进度条
    NProgress.done();
  }, 500);

});

