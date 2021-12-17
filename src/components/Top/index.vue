<template>
  <div class="Top">
    <div class="top-container">
      <div class="head">
        <div class="top-left">
          <div class="top-heart">
            <Icon type="heart" />
          </div>
          <div>
            <em class="top-word">满150元免运费！</em>
          </div>
        </div>
        <div class="top-right">
          <div v-show="searchTick">
            <input type="text" placeholder="全店搜索..." />
          </div>
          <div class="rSearch" @click="searchTick = !searchTick">
            <Icon type="search" />
          </div>
          <div
            class="rMenu"
            @mouseenter="rMenuTick = !rMenuTick"
            @mouseleave="rMenuTick = !rMenuTick"
          >
            <Icon type="menu" />
            <div class="rMenu-list">
              <ul v-show="rMenuTick">
                <li>
                  <router-link to="/customer-service">客户服务</router-link>
                </li>
                <li>
                  <router-link to="/address">地址</router-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="rLogin">
            <router-link :to="{path:'/login'}" > 登录 </router-link>
          </div>
          <div class="rCar">
            <Icon type="car" />
          </div>
        </div>
      </div>
      <div class="slogo" v-show="this.slogoTick">
        <img src="@/assets/logo.png" alt="vue slogo" />
      </div>
      <div class="nav"></div>
    </div>
  </div>
</template>

<script>
import Icon from "../Icon";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      slogoTick: false,
      searchTick: false,
      rMenuTick: false,
      scrollTop: 0,
    };
  },
  methods: {
    handleClick() {
      this.$store.state.dialogFormVisible = true;
      console.log(this.$store.state.dialogFormVisible);
    },
  },
  mounted() {
    this.$nextTick(() => {
      document.addEventListener("scroll", (e) => {
        if (e.target.documentElement.scrollTop > 48) {
          if (this.slogoTick) return;
          this.slogoTick = true;
        } else {
          this.slogoTick = false;
        }
      });
    });
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";
body {
  margin: 0;
  padding: 0;
}
.top-container {
  width: 100%;
  // height: 32px;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #fff;
  font-family: Georgia, "Times New Roman", Times, serif;
  z-index: 99;
  .head {
    display: flex;
    width: 900px;
    height: 32px;
    justify-content: space-between;
    white-space: nowrap;
  }
  .top-left {
    display: flex;
    padding-top: 7px;
    .top-heart {
      font-size: 16px;
      padding-left: 20px;
      color: pink;
    }
    .top-word {
      color: @gray;
      font-size: 14px;
      margin-left: 8px;
    }
  }
  .top-right {
    display: flex;
    font-size: 12px;
    color: @words;
    .rSearch,
    .rMenu,
    .rLogin,
    .rCar {
      padding-right: 22px;
    }
    .rSearch,
    .rMenu,
    .rCar {
      padding-top: 9px;
      font-size: 15px;
    }
    .rLogin {
      padding-top: 11px;
      a {
        color: @words;
        text-decoration: none;
      }
      a:hover {
        color: @active;
      }
    }

    .rMenu-list {
      position: absolute;
      margin-left: -5px;
      ul {
        // opacity: 0;
        margin: 5px 0 0 -5px;
        padding: 0;
        list-style: none;
        width: 158px;
        border: 1px solid #ece7e4;
        li {
          width: 100%;
          height: 20px;
          line-height: 20px;
          text-align: left;
          font-size: 12px;
        }
        a {
          text-decoration: none;
          padding: 0 10px;
          color: @words;
        }
        li:hover {
          background-color: #ece7e4;
        }
      }
    }

    input {
      color: @active;
      font-style: italic;
      font-size: 12px;
      font-weight: 400;
      background-color: @back;
      border: #fff;
      height: 21px;
      width: 245px;
      margin: 6px 5px 0 0;
      padding: 2px 6px;
    }
    .rLogin {
      cursor: pointer;
    }
  }
  .slogo {
    position: absolute;
    // display: none;
    z-index: -1;
    height: 32px;
    line-height: 32px;
    transform: scale(0.5, 0.5);
  }
}
</style>