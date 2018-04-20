import Vue from 'vue'
import Router from 'vue-router'
import Shelf from '@/pages/shelf'
import Featured from '@/pages/featured'
import Category from '@/pages/category'
//import CatList from '@/pages/catlist'
import Rank from '@/pages/rank'
import List from '@/pages/list'
import Book from '@/pages/book'
import Read from '@/pages/read'
import Search from '@/pages/search'


//如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能
//如果使用全局的 script 标签，则无须如此（手动安装）
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'shelf',
      component: Shelf
    },
    {
      path: '/featured',
      name: 'featured',
      component: Featured
    },
    {
      path: '/category',
      name: 'category',
      component: Category
    },
    //  {
    //    path: '/catlist/:major',
    //    name: 'catlist',
    //    component: CatList
    //  },
    {
      path: '/rank',
      name: 'rank',
      component: Rank
    },
    {
      path: '/list/:id',
      name: 'list',
      component: List
    },
    {
      path: '/book/:id',
      name: 'book',
      component: Book
    },
    {
      path: '/read/:id',
      name: 'read',
      component: Read
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})
