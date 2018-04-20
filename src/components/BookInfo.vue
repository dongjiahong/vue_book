<template>
<section class="book-info-section" v-if="book !== null">
    <div class="book-detail">
        <img class="book-cover fl" :src="cover" :alt="book.title">
        <div class="book-desc">
            <h2 class="book-title">{{ book.title }}</h2>
            <p class="book-meta red">{{ book.author }}</p>
            <p class="book-meta">{{ book.majorCate }}/{{ book.minorCate }}</p>
            <p class="book-meta">{{ wordCount }}字
                <span class="split-line">|</span>{{ book.isSerial ? '连载中' : '完结' }}
            </p>
        </div>
    </div>
    <div class="book-reader">
        <p class="reader-item"><span class="title">追人气</span><span class="content">{{ book.latelyFollower }}</span></p>
        <p class="reader-item"><span class="title">读者留存</span><span class="content">{{ book.retentionRatio }}%</span></p>
        <p class="reader-item"><span class="title">日更新数/天</span><span class="content">{{ serializeWordCount }}</span></p>
    </div>
    <div class="book-intro" @click="spreadIntro" :class="{ part: isPart }">
        <p class="long-intro">{{ book.longIntro }}</p>
        <svg class="icon" aria-hidden="true" v-show="isPart">
            <use xlink:href="#icon-back"></use>
        </svg>
    </div>
    <div class="book-menu">
        <router-link :to="{ name: 'read', params: { id: book._id }, query: { menu: true } }">
            <div class="menu-title fl">目录</div>
            <p class="menu-content fr gray">
                {{ book.updated | time }}
                <span class="split-dot">.</span>{{ book.lastChapter }}
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-back"></use>
                </svg>
            </p>
        </router-link>
    </div>
</section>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import api from "../fetch/api";
import moment from "moment";
import { staticPath } from "../util/util";

export default {
  name: "bookInfo",

  data() {
    return {
      book: null,
      isPart: true
    };
  },

  filters: {
    time(update) {
      return moment(update).format("YYYY-MM-DD");
    }
  },

  computed: {
    ...mapState(["curBook"]),
    cover() {
      return staticPath + this.book.cover;
    },
    wordCount() {
      return this.book.wordCount > 10000
        ? parseInt(this.book.wordCount / 10000) + "万"
        : this.book.wordCount;
    },
    serializeWordCount() {
      return this.book.serializeWordCount < 0
        ? 0
        : this.book.serializeWordCount;
    }
  },

  created() {
    api.getBook(this.curBook.id).then(data => {
      this.book = data;

      let tmpBook = this.curBook;
      tmpBook.title = data.title;
      tmpBook.cover = staticPath + data.cover;
      tmpBook.author = data.author;
      tmpBook.lastChapter = data.lastChapter;
      tmpBook.updated = data.updated;
      this.SET_CUR_BOOK(tmpBook);
      this.$nextTick(function() {
        // $emit用来触发自定义事件
        this.$emit("load-result");
      });
    });
  },

  methods: {
    ...mapMutations(["SET_CUR_BOOK"]),
    spreadIntro: function(e) {
      this.isPart = !this.isPart;
    }
  }
};
</script>

<style lang="scss">
.book-info-section {
  position: relative;
  height: 100%;
  overflow: hidden;
  padding-top: 20%;
}

.split-line {
  padding: 0 2px;
}

.split-dot {
  padding: 0 1px;
}

.book-detail {
  overflow: hidden;
  padding: 0 15px;

  .book-cover {
    // inline-block 行内布局
    display: inline-block;
    width: 64px;
    height: 92px;
    margin-right: 10px;
  }

  .book-desc {
    // relative表示相对布局
    position: relative;

    .book-title {
      color: #333;
      line-height: 1;
      margin: 3px 0 5px;
      font-weight: 500;
    }

    .book-meta {
      font-size: 13px;
      line-height: 1.8;
    }
  }
}

.book-reader {
  display: flex;
  text-align: center;
  padding: 10px 0;
  border-top: 1px solid #ebebeb;

  .reader-item {
    flex: 1; // flex弹性布局的权重
    span {
      // block: 显示为块级元素和inline相对性的行级元素的区别是，block是独立的块，会有换行，而inline
      // 不会换行，知道排满
      display: block;
      line-height: 1.5;

      // 这里&.title是sass的父选择器，会被渲染为span:title,这里&代表为她的父选择器即：span
      &.title {
        font-size: 12px;
        color: #999;
      }

      &.content {
        font-size: 16px;
        font-weight: 400;
        color: #222;
      }
    }
  }
}

.book-intro {
  position: relative;
  padding: 10px 15px 0;
  font-size: 14px;
  line-height: 1.5;
  /* text-align: 规定元素中的文本水平对齐方式
      left: 左对齐
      right: 右对齐
      center: 中间对齐
      justify: 两端对齐
  */
  text-align: justify;
  border-top: 1px solid #ebebeb;

  .icon {
    position: absolute;
    bottom: 0;
    right: 15px;
    font-size: 16px;
    transform: rotate(270deg);
    z-index: 99;
    color: #999;
    background: rgba(255, 255, 255, 0.8);
  }

  &.part {
    /* overflow: 定义内容溢出元素时发生的情况
        visible: 默认值，内容显示在元素框外
        hidden: 内容被修剪，并且其余内容不可见
        scroll: 内容被修剪，但是浏览器会显示滚动条以便查看
        auto: 如果内容被修剪，则浏览器显示滚动条以便查看
    */
    overflow: hidden;
    /* text-overflow: 设置文本溢出时发生的事情
        clip: 修剪文本
        ellipsis: 显示省略号
    */
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
}

.book-menu {
  position: relative;
  margin-top: 10px;
  padding: 0 15px;
  border-top: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
  box-sizing: border-box;
  overflow: hidden;

  a {
    display: block;
  }

  .menu-title {
    font-size: 16px;
    line-height: 36px;
    font-weight: 400;
  }

  .menu-content {
    position: relative;
    font-size: 12px;
    line-height: 36px;
    width: 70%;
    text-align: right;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-right: 15px;

    .icon {
      position: absolute;
      top: 10px;
      right: 0;
      font-size: 16px;
      color: #999;
      transform: rotate(180deg);
    }
  }
}
</style>