<template>
  <el-menu default-active="1-4-1" :collapse="isCollapse">
    <section v-for="(item,index) in permissionRoutes" :key="{index}">
      <el-submenu v-if="item.children" :index="item.path">
        <template slot="title">
          <i class="el-icon-location"></i>
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
        <i class="el-icon-menu"></i>
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
  constructor() {
    super();
    this.permissionRoutes = [
      {
        name: "设置",
        path: "/setting",
        children: [{ name: "个人中心", path: "profile" }]
      },
      { name: "仪表盘", path: "/dashboard" },
      {
        name: "文章",
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