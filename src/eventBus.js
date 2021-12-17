import Vue from "vue";
// export default new Vue({});
Vue.prototype.$bus=new Vue({});//将事件总线放入原型
/**
 * 事件名：mainScroll
 * 含义：主区域滚动条位置变化后触发该事件（由ref设置主区域）
 * 参数：
 * - 滚动的dom元素
 */