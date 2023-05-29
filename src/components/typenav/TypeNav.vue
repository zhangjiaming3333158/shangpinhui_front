<template>
  <!-- 三级联动组件 -->
  <div class="type-nav">
    <!-- deleteIndex包括移除索引和搜索页面隐藏侧边栏 -->
    <!-- showList展示侧边栏 -->
    <div class="container" @mouseleave="deleteIndex" @mouseover="showList">
      <h2 class="all">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <!-- transition动画展示 -->
      <transition name="sort">
        <div class="sort" v-show="show">
          <div class="all-sort-list2" @click="goSearch">
            <!-- 用js实现mouseover变色 -->
            <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{cur:currentIndex==index}">
              <h3 @mouseover="changeIndex(index)">
                <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
              </h3>
              <div class="item-list clearfix">
                <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                  <dl class="fore">
                    <dt>
                      <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'

export default {
  name: 'TypeNav',
  data() {
    return {
      //鼠标当前索引
      currentIndex: -1,
      show: true,
    }
  },
  mounted() {
    // vuex传值
    // this.$store.dispatch('categoryList')
    // 组件加载时判断路径决定是否显示
    if (this.$route.path != '/home') {
      this.show = false
    }
  },
  methods: {
    //更改索引
    // changeIndex(index){
    //   this.currentIndex=index
    // },
    //防抖函数throttle
    changeIndex: _.throttle(function (index) {
      this.currentIndex = index
    }, 50),
    //初始化索引，隐藏侧边栏
    deleteIndex() {
      this.currentIndex = -1
      if (this.$route.path != '/home') {
        this.show = false
      }
    },
    //展示侧边栏
    showList() {
      if (this.$route.path != '/home') {
        this.show = true
      }
    },
    goSearch(event) {
      //event.target:获取到的是出发事件的元素(div、h3、a、em、dt、dl)
      let node = event.target
      //给a标签添加自定义属性data-categoryName,全部的字标签当中只有a标签带有自定义属性，别的标签名字----dataset纯属扯淡
      let { categoryname, category1id, category2id, category3id } = node.dataset
      //第二个问题解决了：点击的到底是不是a标签（只要这个标签身上带有categoryname）一定是a标签
      //当前这个if语句：一定是a标签才会进入
      if (categoryname) {
        //准备路由跳转的参数对象
        let loction = { name: 'search' }
        let query = { categoryName: categoryname }
        //一定是a标签：一级目录
        if (category1id) {
          query.category1Id = category1id
          //一定是a标签：二级目录
        } else if (category2id) {
          query.category2Id = category2id
          //一定是a标签：三级目录
        } else {
          query.category3Id = category3id
        }
        //判断：如果路由跳转的时候，带有params参数，捎带脚传递过去
        if (this.$route.params) {
          loction.params = this.$route.params
          //动态给location配置对象添加query属性
          loction.query = query
          //路由跳转
          this.$router.push(loction)
        }
      }
    },
  },
  computed: {
    //state:他是咱们大仓库中的state（包含home|search）
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }

        .cur {
          background: skyblue;
        }
      }
    }

    //名字为name=sort
    // transition动画enter表示开始
    .sort-enter{
      height: 0;
    }
    // transition动画enter-to表示结束
    .sort-enter-to{
      height: 461px;
    }
    // 动画过程参数设置
    .sort-enter-active{
      transition: all .2s linear;
    }
  }
}
</style>