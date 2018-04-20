import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
  // curBook对象包含的字段：
  // id: '',         // 书籍id
  // title: '',      // 书名
  // cover: '',      // 封面
  // author: '',     // 作者
  // lastChapter: '',// 已更新的最新章节
  // updated: '',    // 更新时间
  // readChapter: '',// 已读章节
  // isInShelf: false,// 是否在书架
  // sort: false,    // 目录顺序， false：正序， true：倒序

  curBook: null, // 当前查看的书籍对象
  headerTitle: '牛逼', // 头部标题
  headerType: '', // 头部类型： featured:精选, rank:排行榜
  shelfBookList: [], // 书架书籍数组
  nightMode: false, // 是否夜间模式
  skinColor: '', // 阅读页面背景色
  fontSize: 14, // 页面字体大小
  searchHistory: [] // 搜索历史
}


export default new Vuex.Store({
  // 需要记录的属性状态
  state,

  /* getter可以认为是store的属性，就像计算属性一样，他会根据依赖被缓存起来，且只有当
    依赖改变他才会重新计算，往往把多个组件都用到的属性放在这里，可以减少到处复制
  */
  getters,

  /* mutation是用来改变vuex中状态,使用store.commit('xxx')来提交，
    每个mutation都有一个字符串事件类型和一个回调函数，该函数就是用来更改状态的
    地方，接受state作为第一个参数。
    一般使用常量替代mutation事件类型
  */
  mutations,
  actions
})
