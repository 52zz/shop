<template>
  <i class="iconfont icon-container" :class="fontClass"></i>
</template>

<script>
const classMap = {
  car:"icon-iconfontcart",
  close:"icon-close",
  arrowUp:"icon-arrowup",
  heart:"icon-heart",
  menu:"icon-menulines",
  search:"icon-search",
  expand:"icon-zoomin",
  arrowLeft:"icon-zuojian",
  arrowRight:"icon-youjian",
  toTop:"icon-zhiding"
};
export const types=Object.keys(classMap);
export default {
    props:{
        type:{
            type:String,
            required:true
        }
    },
    computed:{
        fontClass(){
            return classMap[this.type]
        }
    }
};
</script>

<style scoped>

@import "//at.alicdn.com/t/font_2895274_gg7lrv0s825.css";
.iconfont {
  color: inherit;
  font-size: inherit;
  cursor:pointer
}
</style>