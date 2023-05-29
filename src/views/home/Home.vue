<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <TodayRecommend style="margin-top: 50px;"></TodayRecommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from '@/views/home/listcontainer/ListContainer.vue'
import TodayRecommend from '@/views/home/todayrecommend'
import Rank from '@/views/home/rank/Rank.vue'
import Like from '@/views/home/like/Like.vue'
import Floor from '@/views/home/floor/Floor.vue'
import Brand from '@/views/home/brand/Brand.vue'

import { mapState } from 'vuex'

export default {
  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  data(){
    return{
    }
  },
  mounted() {
    //派发action,获取floor组件的数据
    this.$store.dispatch('getFloorList')
    this.$store.dispatch('getUserInfo')
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
}
</script>

<style>
</style>