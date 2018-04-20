<template>
  <section class="swiper-banner">
      <swiper :options="swiperOption">
          <swiper-slide v-for="slide in swiperSlides" :key="slide._id" v-if="slide.type === 'c-bookdetail'">
              <router-link :to="{ name: 'book', params: { id: slide.link } }">
                  <img :src="slide.img" :alt="slide.title">
              </router-link>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
  </section>
</template>

<script>
// 轮播图
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

import api from "../fetch/api";
export default {
  name: "swipers",
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperSlides: [],
      swiperOption: {
        autoplay: true,
        pagination: {
          el: ".swiper-pagination",
          type: "progressbar",
          clickable: true
        }
      }
    };
  },

  created() {
    api.getSwiperPictures().then(data => {
      this.swiperSlides = data;
    });
  }
};
</script>

<style lang="scss">
.swiper-banner {
  width: 100%;
  height: 120px;

  .swiper-container {
    height: 100%;
    width: 100%;
  }

  img {
    height: 100%;
    width: 100%;
  }
}
</style>
