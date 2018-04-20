<template>
  <section class="cat">
      <h3 class="cat-title">{{ category.title }}</h3>
      <!-- 
        ul:无序列表, ol:有序列表
            无序列表始于<ul>标签，每个列表项始于<li>
            有序列表始于<ol>标签，每个列表项始于<li> 
      -->
      <ul class="cat-list">
          <li v-for="cat in category.catList" class="cat-item" :key="cat.name">
            <router-link :to="{ name: 'catlist', params: { major: cat.name }, query: { gender: category.gender }}">
                <p class="cat-name">{{ cat.name }}</p>
                <p class="cat-count">{{ cat.bookCount }}</p>
            </router-link>
          </li>
      </ul>
  </section>
</template>
 
<script>
export default {
  name: "cat",
  props: {
    category: Object
  },

  data() {
    return {};
  }
};
</script>

<style lang="scss">
.cat {
  position: relative;
  background: #fff;

  .cat-title {
    // 上下：0，左右10px
    padding: 0 10px;
    height: 60px;
    line-height: 60px;
    font-weight: 400;
  }

  .cat-list {
    position: relative;
    overflow: hidden;
  }

  .cat-item {
    display: inline-block;
    width: 33.33%;
    box-sizing: border-box;
    text-align: center;
    padding: 10px 0;

    //  :nth-child(n)选择器匹配属于其父元素的第N个子元素，不论元素类型，n可以使数字关键字和公式
    //  :nth-child(an+b)，an+b表示周期长度，n是计数器（从0开始）,b是偏移量，
    //  这里我们指定了下标是3的倍数的所有元素的右、下线框
    &:nth-child(3n + 1) {
      border-right: 1px solid #f0f0f0;
      border-bottom: 1px solid #f0f0f0;
    }

    &:nth-child(3n + 2) {
      border-right: 1px solid #f0f0f0;
      border-bottom: 1px solid #f0f0f0;
    }

    &:nth-child(3n + 3) {
      border-right: 1px solid #f0f0f0;
      border-bottom: 1px solid #f0f0f0;
    }

    &:nth-child(1) {
      border-top: 1px solid #f0f0f0;
    }

    &:nth-child(2) {
      border-top: 1px solid #f0f0f0;
    }

    &:nth-child(3) {
      border-top: 1px solid #f0f0f0;
    }

    p {
      line-height: 22px;
    }

    .cat-name {
      font-size: 16px;
      color: #333;
    }

    .cat-count {
      font-size: 12px;
      color: #ccc;
    }
  }
}
</style>
