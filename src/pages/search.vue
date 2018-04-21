<template>
<section class="search">
  <section class="search-header">
    <span class="search-back" @click="$router.go(-1)">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-search-back"></use>
      </svg>
    </span>
    <div class="search-input-section">
      <input type="text" class="search-input" ref="searchInput" placeholder="请输入您要搜索的关键字" @keyup.enter="searchByKeyword">
      <span class="search-icon" @click="searchBooks">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-search"></use>
        </svg>
      </span>
    </div>
  </section>
  <book-list :book-list="searchBooks" v-if="searchBooks.length > 0"></book-list>
  <template v-else>
    <section class="search-hot search-section">
      <h4>热门搜索</h4>
      <ul class="search-keyword-list">
        <li class="search-keyword" v-for="hot in hotKeywords" :key="hot.word">{{ hot.word }}</li>
      </ul>
    </section>
    <section class="search-history search-section">
      <h4>历史搜索<span class="clear-all" @click="clearAll">清空</span></h4>
      <ul class="search-keyword-list">
        <li class="search-keyword" v-for="history in searchHistory" :key="history">{{ history }}</li>
      </ul>
    </section>
  </template>
</section>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import bookList from "@/components/BookList";
import api from "../fetch/api";

export default {
  name: "search",
  components: {
    bookList
  },

  data() {
    return {
      hotKeywords: [],
      searchBooks: []
    };
  },

  computed: {
    ...mapState(["searchHistory"])
  },

  created: function() {
    api.getSearchHotKeywords().then(data => {
      this.hotKeywords = data;
    });
  },

  methods: {
    ...mapMutations(["SET_SEARCH_HISTORY", "CLEAR_SEARCH_HISTORY"]),

    searchByKeyword: function() {
      let keyword = this.$refs.searchInput.value;
      this.SET_SEARCH_HISTORY(keyword);
      api.searchByKeyword(keyword).then(data => {
        this.searchBooks = data;
      });
    },

    clearAll: function() {
      this.CLEAR_SEARCH_HISTORY();
    }
  }
};
</script>

<style lang="scss">
.search {
  position: relative;
  overflow: hidden;
  background-color: #f6f7f9;

  .search-header {
    position: relative;
    height: 40px;
    width: 100%;
    background-color: #ed424b;

    .search-back {
      position: absolute;
      top: 10px;
      left: 5px;
      width: 20px;
      height: 20px;

      .icon {
        font-size: 20px;
        color: #fff;
      }
    }

    .search-input-section {
      padding: 8px 15px 7px 35px;
      overflow: hidden;
    }

    .search-input {
      width: 100%;
      height: 25px;
      color: rgb(237, 178, 177);
      background-color: #ed424b;
      border: none;
      border-bottom: 1px solid #fff;
      outline: none;
    }

    ::-webkit-input-placeholder {
      color: rgb(237, 178, 177);
    }

    .search-icon {
      position: absolute;
      top: 10px;
      right: 15px;
      width: 20px;
      height: 20px;

      .icon {
        font-size: 20px;
        color: #fff;
      }
    }
  }

  .search-section {
    position: relative;
    padding: 10px 10px 20px;
    overflow: hidden;
    margin-bottom: 10px;
    background-color: #fff;

    h4 {
      line-height: 30px;
      border-bottom: 1px solid rgb(198, 199, 201);

      span.clear-all {
        float: right;
      }
    }

    .search-keyword-list {
      padding: 10px;

      .search-keyword {
        display: inline-block;
        font-size: 12px;
        margin: 5px;
        padding: 5px;
        color: rgb(140, 140, 140);
        border: 1px solid rgb(198, 199, 201);
        border-radius: 20px;
      }
    }
  }
}
</style>
