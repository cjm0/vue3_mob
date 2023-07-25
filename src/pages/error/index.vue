<script setup lang="ts">

</script>

<template>
  <div class="error_index">
    <p class="text">页面不存在，请检查路径~</p>
    <!-- <van-empty>
      <p class="text">页面不存在，请检查路径~</p>
      <van-button class="btn" round type="info" @click="goHome">去首页
      </van-button>
    </van-empty> -->
  </div>
</template>

<style scoped lang="less">
.error_index {
  text-align: center;
  .text {
    margin-bottom: 20px;
    font-size: 16px;
  }
  .btn {
    width: 100px;
    height: 30px;
  }
}
</style>

