<template>
  <!-- 走马灯 -->
  <div class="block">
    <el-carousel height="1000px">
      <el-carousel-item v-for="item in imgList" :key="item.id">
        <img :src="item.url" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgList: [
        {
          id: 0,
          url: "https://alicdn.brandymelvilleonline.com.cn/media//home_slider/01.jpg",
        },
        {
          id: 1,
          url: "https://alicdn.brandymelvilleonline.com.cn/media//home_slider/homepage-20201030-02.jpg",
        },
        {
          id: 2,
          url: "https://alicdn.brandymelvilleonline.com.cn/media//home_slider/homepage-20201030-03.jpg",
        },
      ],
    };
  },
};
</script>
