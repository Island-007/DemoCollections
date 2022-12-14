<!--
 * @Author: zhangpeiwen
 * @Date: 2022-10-11 09:33:08
 * @LastEditTime: 2022-11-25 11:03:48
 * @LastEditors: zhangpeiwen
 * @Description: 
 * @FilePath: \vue-echarts-demo\src\components\Map\BreadCrumb\index.vue
-->
<template>
  <div class="bread-crumb">
    <span
      class="bread-crumb-item"
      v-for="(item, index) in breadcrumbList"
      :key="index"
      @click="handleClickBreadCrumbItem(item, index)"
    >
      {{ item.name }}
      <span v-if="index !== breadcrumbList.length - 1" class="sperator">/</span>
    </span>
  </div>
</template>

<script>
export default {
  name: "BreadCrumb",
  props: {
    breadcrumbList: {
      type: Array,
      default: [],
    },
  },
  methods: {
    handleClickBreadCrumbItem(item, index) {
      console.log(item, "crumb");
      this.$emit("click-breadcrumb", item, index);
    },
  },
};
</script>

<style scoped>
.bread-crumb-item {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
}
.sperator {
  margin: 0 5px;
}
</style>
