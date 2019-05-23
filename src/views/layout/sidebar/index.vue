<template>
    <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
            :default-active="$route.path"
            :collapse="isCollapse"
            :background-color="variables.menubg"
            :text-color="variables.menutext"
            :active-text-color="variables.menuactivetext"
            :collapse-transition="false"
            mode="vertical"
        >
            <sidebar-item v-for = "route in permission_routers" :key= "route.path" 
            :item = "route" :base-path="route.path" />
        </el-menu>
    </el-scrollbar>
</template>
<script>
import variables from '@/style/variables.scss'
import SidebarItem from  "@/components/Sidebar/sidebarItem.vue"
import {mapGetters} from  'vuex'
export default {
    name:'sidebar',
    data(){
        return{
        }
    },
    components: {
        SidebarItem
    },
    computed: {
        ...mapGetters([
            'permission_routers',
            'sidebar'
        ]),
        variables() {
            return variables
        },
        isCollapse(){
            return !this.sidebar.opened
        }
    },
}
</script>