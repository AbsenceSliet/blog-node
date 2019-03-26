<template>
    <el-breadcrumb class="app-breadcrumb" separator="/">
        <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
            <span class="no-redirect" v-if="index == levelList.length-1">{{item.meta.title}}</span>
            <a  v-else href="javascript:;"  @click.prevent="handlelink(item)">
                {{item.meta.title}}</a>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script>
export default {
    data(){
        return {
            levelList: null
        }
    },
    methods: {
        getBreadcrumb(){
            let matched = this.$route.matched.filter(item => item.name)
            let first = matched[0]
            if(first && first.name.trim().toLocaleLowerCase() !== 'Dashboard'.toLocaleLowerCase()){
                matched = [{path: '/dashboard', meta:{ title: 'dashboard' }}].concat(matched)
            }
            this.levelList = matched.filter(item => item.meta && item.meta.title )
        },
        handlelink(item){
            console.log(item)
        }
    },
    watch: {
        $route() {
            this.getBreadcrumb()
        }
    },
    created() {
        this.getBreadcrumb()
    },
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .app-breadcrumb.el-breadcrumb {
        display: inline-block;
        font-size: 14px;
        line-height: 50px;
        margin-left: 8px;
        .no-redirect {
            color: #97a8be;
            cursor: text;
        }
    }
</style>