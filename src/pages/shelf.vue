<template>
  <section class="shelf">
      <header-bar></header-bar>
      <shelf-list v-if="shelfBookList.length > 0"></shelf-list>
      <empty v-else></empty>
      <tabbar></tabbar>
      <page-loading v-if="isShowPageLoading"></page-loading>
  </section>
</template>

<script>
// 引入其他组件
import { mapState, mapMutations } from "vuex";
import empty from "@/components/Empty";
import tabbar from "@/components/Tabbar";
import headerBar from "@/components/HeaderBar";
import shelfList from "@/components/ShelfList";
import pageLoading from "@/components/PageLoading";
import { SHELF_PAGE } from "../util/util";

export default {
  name: "shelf",
  components: {
    empty,
    tabbar,
    headerBar,
    shelfList,
    pageLoading
  },
  // 计算属性和方法不同，计算属性是基于他们的依赖缓存的，只有在依赖发生改变时才会重新求值
  computed: {
    // ...是对象展开运算符
    ...mapState([
      // mapState辅助函数，不用每个属性都写一个computed来获取，当计算的属性名字和state的字节点名字相同，可以直接如下写法
      "shelfBookList" // 这里就是获取shelfBookList
    ])
  },
  // 组件的data必须是函数, 而vue实例的data可以是对象，这里注意区别
  data() {
    return {
      isShowPageLoading: true,
      bookList: []
    };
  },
  // 在实例创建完成后被立即调用，这时已经完成了数据观测、属性、方法运算和watch/event事件回调;挂载还没有开始
  created() {
    this.SET_HEADER_INFO({
      // 调用set_header_info事件
      title: "我的资源",
      type: SHELF_PAGE
    });
    this.isShowPageLoading = false;
  },
  // 参考上面的计算属性, 这里是为了获取SET_HEADER_INFO事件对象，然后方便上面的created节点下的this调用(待确定)
  methods: {
    ...mapState(["SET_HEADER_INFO"])
  }
};
</script>

<style lang="scss">
.shelf {
  // margin外框边距： 上50px，右0px，下70px，左
  margin: 50px 0 70px;
}
</style>

