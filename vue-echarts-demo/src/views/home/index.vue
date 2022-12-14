<!--
 * @Author: zhangpeiwen
 * @Date: 2022-11-25 10:09:59
 * @LastEditTime: 2022-11-25 10:28:05
 * @LastEditors: zhangpeiwen
 * @Description: 
 * @FilePath: \vue-echarts-demo\src\views\home\index.vue
-->
<template>
  <div class="home-page">
    <Map />
  </div>
</template>

<script>
import Map from '@/components/Map';
export default {
  name:'HomePage',
  components:{
    Map
  }
}
</script>

<style scope lang="less">
.home-page {
  width: 100vw;
  height:100vh;
  background-image:linear-gradient(#131849,#101847);
}
</style>