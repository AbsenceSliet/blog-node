<template>
  <div class="layout">
    <SideBar class="sidebar">侧边栏</SideBar>
    <section class="container">
      <header>头部</header>
      <router-view></router-view>
    </section>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SideBar from "@/components/sideBar.vue";
@Component({
  components: {
    SideBar
  }
})
export default class Layout extends Vue {}
</script>
<style lang="scss" scoped>
@import "@/style/mixin";
.layout {
  @include relative;
  .sidebar {
    float: left;
    width: 210px;
    background-color: $main_color;
    height: 100%;
  }
  .container {
    margin-left: 210px;
    height: 100%;
    overflow-y: scroll;
    color: #fff;
  }
}
</style>