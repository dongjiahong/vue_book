<template>
  <section class="tabbar">
      <router-link :to="{ name: 'shelf' }" class="tab-item" exact>
          <div class="tab-item-icon">
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-shelf"></use>
              </svg>
          </div>
          <p class="tab-item-label">书架</p>
      </router-link>
      <router-link :to="{ name: 'featured' }" class="tab-item" exact>
          <div class="tab-item-icon">
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-jingxuan"></use>
              </svg>
          </div>
          <p class="tab-item-label">精选</p>
      </router-link>
      <router-link :to="{ name: 'category' }" class="tab-item" exact>
          <div class="tab-item-icon">
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-fenlei"></use>
              </svg>
          </div>
          <p class="tab-item-label">分类</p>
      </router-link>
      <router-link :to="{ name: 'rank' }" class="tab-item" exact>
          <div class="tab-item-icon">
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-paihang"></use>
              </svg>
          </div>
          <p class="tab-item-label">排行</p>
      </router-link>
  </section>
</template>

<script>
export default {
  name: "tabbar",
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.tabbar {
  /*
  position: 位置属性
    fixed: 生成绝对定位的元素，相对于浏览器窗口定位
    absolute: 生成绝对定位元素，相对于static定位以外的第一个父元素进行定位
    relative: 生成相对定位元素，相对于其正常位置进行定位
    static: 默认值，没有定位，元素出现在正常流中
    inherit: 规定应该从父元素继承position属性的值
  */
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  /*
  z-index: 属性设置元素的堆叠顺序。拥有更高堆叠顺序的元素总是会处于堆叠顺序较低的元素前面
    auto: 默认，堆叠顺序与父元素相等
    number: 设置元素的堆叠顺序
    inherit: 规定应该从父元素继承z-index属性的值
  */
  z-index: 1;
  /*
  display: 用于定义建立布局时元素生成的显示框类型
    none: 该元素不会显示
    block: 元素将显示为块级元素，此元素前后会有带有换行符
    inline: 默认，会被显示为内联元素，元素前后没有换行符
    flex: 弹性布局，相对复杂(自己百度)
  */
  display: flex;
  height: 60px;
  background-color: #fff;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  /*
  box-sizing: 属性运行您以特定的方式定义匹配某个区域的特定元素
    border-box: 为元素设定的宽度和高度决定了元素的边框盒
    content-box: 宽高和高度分别应用到元素的内容框
  */
  box-sizing: border-box;

  .tab-item {
    display: block;
    flex: 1;
    padding: 10px 0;

    &.router-link-exact-active {
      color: #ed424b;
    }
  }

  .tab-item-icon {
    width: 24px;
    height: 24px;
    margin: 0 auto 4px;

    .icon {
      width: 24px;
      height: 24px;
    }
  }

  .tab-item-label {
    text-align: center;
    font-size: 12px;
  }
}
</style>
