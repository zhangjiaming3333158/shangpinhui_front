<template>
  <el-carousel type="card" height="56px" :autoplay="false">
    <el-carousel-item v-for="(sil,index) in skuImageList" :key="sil.id">
      <img :src="sil.imgUrl" :class="{active:currentIndex==index}" @click="changeCurrentIndex(index)">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: 'ImageList',
  data() {
    return {
      currentIndex: 0,
    }
  },
  props: ['skuImageList'],
  methods: {
    changeCurrentIndex(index) {
      //修改响应式数据
      this.currentIndex = index
      //通知兄弟组件：当前的索引值为几
      this.$bus.$emit('getIndex', this.currentIndex)
    },
  },
}
</script>

<style lang="less" scoped>
.el-carousel__container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .el-carousel__item {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.el-carousel__indicators {
  display: none;
}
</style>