<!--
 * @Author: zhangpeiwen
 * @Date: 2022-10-10 11:26:24
 * @LastEditTime: 2022-11-25 10:34:27
 * @LastEditors: zhangpeiwen
 * @Description: 
 * @FilePath: \vue-echarts-demo\src\App.vue
-->
<template>
  <div id="app">
    <HomePage />
  </div>
</template>

<script>
import HomePage from './views/home';
export default {
  name: 'App',
  components: {
    HomePage
}
}
</script>

<style>
@import url(@/assets/common.less);
</style>
