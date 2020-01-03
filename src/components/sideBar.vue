<template>
  <el-menu default-active :collapse="isCollapse" :unique-opened="false" :collapse-transition="false">
    <section v-for="(item,index) in permissionRoutes" :key="index">
      <el-submenu v-if="item.children" :index="item.path">
        <template slot="title">
          <svg-icon :iconClass="item.icon" />
          <span slot="title">{{item.name}}</span>
        </template>
        <nav>
          <el-menu-item
            :index="item.path"
            v-for="(child,key) in item.children"
            :key="key"
          >{{child.name}}</el-menu-item>
        </nav>
      </el-submenu>
      <el-menu-item index="2" v-else>
        <svg-icon :iconClass="item.icon" />
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
    </section>
  </el-menu>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
interface PermissionRouteItem {
  name: string;
  path: string;
  children?: PermissionRouteItem[];
  icon?: string;
}
@Component
export default class SideBar extends Vue {
  private permissionRoutes: PermissionRouteItem[];
  private isCollapse: boolean;
  constructor() {
    super();
    this.isCollapse = true;
    this.permissionRoutes = [
      {
        name: "设置",
        path: "/setting",
        icon: "setting",
        children: [{ name: "个人中心", path: "profile" }]
      },
      { name: "仪表盘", path: "/dashboard", icon: "dashboard" },
      {
        name: "文章",
        icon: "article",
        path: "/articles",
        children: [
          { name: "新建文章", path: "/create" },
          { name: "评论", path: "/comment" }
        ]
      }
    ];
  }
}
</script>

