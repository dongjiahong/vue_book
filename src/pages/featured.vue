<template>
  <div class="featured">
      <!-- 下面:sex是v-bind:sex的缩写，用来动态的将prop绑定到父组件的数据，每当父组件数据变化时候，改变化会传递给子组件 -->
      <!-- 这里<hander-bar></hander-bar>是子组件 -->
      <header-bar :sex="sex" v-on:change-sex="changeSex"></header-bar>
      <div class="featured-book-list" ref="featuredBookList">
          <!-- 动态窗口 -->
          <swiper></swiper>
          <section class="book-list-section" v-for="module in modules" v-if="module.type === 0" :key="module._id">
              <div class="book-list-top">
                  <h2 class="book-list-title">{{ module.title }}</h2>
                  <!-- fr是css的新的长度单位,具体需要百度 -->
                  <div class="book-list-more fr">
                      <router-link :to="{ name: 'list', params: {id: module._id} }" class="red">更多</router-link>
                  </div>
              </div>
              <home-list :book-info="{ id: module._id }" @load-result="loadResult"></home-list>
          </section>
      </div>
      <tabbar></tabbar>
      <page-loading v-if="isShowPageLoading"></page-loading>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import api from "../fetch/api";
import headerBar from "@/components/HeaderBar";
import swiper from "@/components/Swiper";
import homeList from "@/components/HomeList";
import tabbar from "@/components/Tabbar";
import pageLoading from "@/components/PageLoading";
import { FEATURED_PAGE } from "../util/util";

export default {
  // 组件的名字
  name: "featured",

  // 组件拥有的子组件
  components: {
    headerBar,
    swiper,
    homeList,
    tabbar,
    pageLoading
  },

  // 组件的属性
  data() {
    return {
      isShowPageLoading: true,
      sex: "male", // 默认为男生
      modules: [],
      loadModules: []
    };
  },

  watch: {
    loadModules: function() {
      if (this.loadModules.length === 0) {
        this.isShowPageLoading = false;
      }
    }
  },

  created: function() {
    this.SET_HEADER_INFO({
      title: "精选",
      type: FEATURED_PAGE
    });
    this.fetchData();
  },

  methods: {
    ...mapMutations(["SET_HEADER_INFO"]),
    fetchData: function() {
      api.getFeatureData().then(data => {
        data = Array.from(data).sort((a, b) => {
          return a.order - b.order;
        });

        let sexOrder = this.sex === "male" ? [2, 5, 7, 9] : [1, 4, 6, 8];
        data = data.filter(obj => {
          return sexOrder.includes(obj.order) && obj.type === 0;
        });

        this.modules = data;
        this.loadModules = Array.from(data, value => value._id);
      });
    },

    changeSex: function(sex) {
      this.isShowPageLoading = true;
      document.body.scrollTop = 0;
      this.sex = sex;
      this.fetchData();
    },

    loadResult: function(id) {
      this.loadModules.splice(this.loadModules.indexOf(id), 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.featured-book-list {
  margin: 40px 0 60px;
}

.book-list-section {
  position: relative;
  border-bottom: 10px solid #f6f7f9;
  padding: 15px 0 0 15px;
  background: #fff;
}

.book-list-top {
  position: relative;
  margin-bottom: 5px;
  overflow: hidden;

  .book-list-title {
    font-weight: 400;
    display: inline-block;
    color: #33373d;
    line-height: 1;
    border-left: 2px solid #ed424b;
    padding-left: 8px;
  }

  .book-list-more {
    display: inline-block;

    a {
      position: absolute;
      top: 2px;
      right: 15px;
      font-size: 13px;

      &::after {
        content: ">";
        display: inline-block;
        margin-left: 3px;
      }
    }
  }
}
</style>


