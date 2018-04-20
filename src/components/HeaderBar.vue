<template>
  <header class="header-bar">
		<h2 class="header-logo">{{ headerTitle }}</h2>
		<nav class="nav-group" v-if="isShow">
			<h3 :class="['nav-item', { active: sexType === 'male' }]" @click="changeSex('male')">男生</h3>
			<h3 :class="['nav-item', { active: sexType === 'female' }]" @click="changeSex('female')">女生</h3>
		</nav>
		
		<div class="header-search">
			<router-link :to="{name: 'search'}">
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-search"></use>
				</svg>
			</router-link>
		</div>
  </header>
</template>

<!-- 所有的vue组件同时也是vue实例，所以可接受相同的选项对象，并提供相同的生命周期钩子 -->

<script>
import { mapState } from "vuex";
import { FEATURED_PAGE, RANK_PAGE } from "../util/util";
export default {
  name: "headerBar",
  // 在vue中，父子组件的关系可以总结为prop向下传递，事件向上传递。父组件通过prop给子组件下发数据，
  // 子组件通过事件给父组件发送消息
  props: {
    sex: {
      // 用来接收父组件传递的消息
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapState(["headerTitle", "headerType"])
  },
  data() {
    return {
      isShow: false,
      sexType: ""
    };
  },
  created() {
    if (this.headerType === FEATURED_PAGE || this.headerType === RANK_PAGE) {
      this.isShow = true;
    }
    this.sexType = this.sex;
  },
  methods: {
    changeSex: function(sex) {
      this.sexType = sex;
      this.$emit("change-sex", sex);
    }
  }
};
</script>

<style lang="scss">
.header-bar {
  // postion: 位置，fixed是相对于浏览器窗口的绝对定位，这里是上、左、右都是0
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 40px;
  overflow: hidden;
  color: #fff;
  background-color: #ed424b;
  box-sizing: border-box;
  z-index: 99;

  h2.header-logo {
    position: absolute;
    top: 12px;
    left: 15px;
    color: #fff;
    line-height: 20px;
  }
  .nav-group {
    margin: 10px auto;
    display: table;
    border: 1px solid #fff;
    border-radius: 4px;

    .nav-item {
      display: table-cell;
      font-weight: 400;
      line-height: 20px;
      padding: 0 10px;
      color: #fff;

      &.active {
        color: #666;
        background-color: #fff;
      }
    }
  }

  .header-search {
    position: absolute;
    display: inline-block;
    top: 12px;
    right: 15px;

    .icon {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
