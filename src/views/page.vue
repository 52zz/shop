<template>
 <div id="app">
    <Top />
    <img class="brand" src="@/assets/logo.png" alt="" />
    <div id="nav" :class="{navSlide:navTick}">
      <router-link to="/just-in">新款上市</router-link>
      <router-link to="/basic">热门</router-link>
      <router-link to="/clothing">服装</router-link>
      <router-link to="/graphics">内衣</router-link>
      <router-link to="/accessoires">饰品</router-link>
    </div>
    <router-view />
    
  </div>
</template>

<script>
import Icon from "@/components/Icon";
import Top from "@/components/Top";
export default {
  data(){
    return {
      navTick:false
    }
  },
  components: {
    Icon,
    Top,
  },
  mounted() {
    this.$nextTick(() => {
      document.addEventListener("scroll", (e) => {
        // 需要添加防抖，否则滚动时会一直判断
        if (e.target.documentElement.scrollTop > 90) {
          this.navTick = true;
        } else {
          this.navTick = false;
        }
      });
    });
  },
};
</script>

<style lang="less">
@import "~@/styles/color.less";
#app {
  font-family: Georgia, "Times New Roman", Times, serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: @words;
  width: 100%;
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
}
.brand {
  margin-top: 37px;
}
#nav {
  margin: 10px 0 0 0;
  padding: 10px 0 10px 0;
  a {
    font-size: 13px;
    text-decoration: none;
    padding: 0 65px;
    color: @words;

    &.router-link-exact-active {
      color: @active;
    }
  }
}
.navSlide {
  position: sticky;
  top: 35px;
  width: 100%;
  background-color: white;
  box-shadow: 0 0 0 #ffffff, 0 0 0 #ffffff, 0 0 10px #ece7e4, 0 0 0 #ffffff;
}
</style>