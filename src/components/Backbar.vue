<template>
  <section class="back-bar">
      <!-- 在导航历史记录中向前或者向后多少步 router.go(1)向前一步 -->
      <span class="back" @click="$router.go(-1)">
          <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-back"></use>
          </svg>
      </span>
      <h2>{{ title }}</h2>
  </section>
</template>

<script>
export default {
  name: "backbar",
  props: {
    title: String
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.back-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  overflow: hidden;
  color: #fff;
  background-color: #ed424b;
  z-index: 1;

  .back {
    position: absolute;
    top: 8px;
    left: 5px;
    text-align: center;

    .icon {
      width: 24px;
      height: 24px;
    }
  }

  h2 {
    width: 70%;
    margin: 0 auto;
    line-height: 40px;
    text-align: center;
  }
}
</style>


