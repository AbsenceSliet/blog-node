<template>
    <div class="article-wrapper">
        <div class="article-list" v-if="listData">
            <el-row :gutter="10" class="article-list-header">
                <el-col :xs="8">
                    <el-button
                        size="medium"
                        type="danger"
                        @click="deleteAll()"><i class="el-icon-delete"></i>
                    </el-button>
                    <el-button
                        size="medium"
                        @click="createArticle()" icon="el-icon-plus">新建文章
                    </el-button>
                </el-col>
                <el-col :xs="16"></el-col>
            </el-row>
            <el-table :data="listData" row-key="id" border lazy @selection-change="selectionChange" 
            tooltip-effect="dark" >
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column 
                v-for="(item,index) in tableTitle" 
                :key="index" 
                :prop="item.prop" 
                :sortable="item.sortable"
                :label="item.label" ></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i></el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-row>
                <el-col class="pagination-wapper">
                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="pageSizes"
                    :page-size="pageSize"
                    background
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400"
                    >
                    </el-pagination>
                </el-col>
            </el-row>
        </div>
        <div class="none-article" v-else>
            <header>暂无文章....</header>
            <el-button
                size="medium"
                @click="createArticle()" icon="el-icon-plus">新建文章
            </el-button>
        </div> 
    </div>
</template>
<script>
export default {
    data() {
        return {
            tableTitle:[{label:' 分类',prop:'category_name',sortable:true},{label:'标题',prop:'title',sortable:false},{label:'发布时间',prop:'create_time',sortable:true},{label:'修改时间',prop:'update_time',sortable:true}],
            listData:[],
            selectArticles:[],
            currentPage:1,
            pageSize:100,
            pageSizes:[100, 200, 300, 400],
            total:'400'
        }
    },
    methods: {
        init_data(){
            this.$store.dispatch('articleList').then(res=>{
                if(res.data.code == 1){
                    this.listData = res.data.result
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        selectionChange(val){
            this.selectArticles =val
        },
        deleteAll(){

        },
        handleSizeChange(){

        },
        handleCurrentChange(){
            
        },
        createArticle(){
            this.$router.push({path:'/article/create'})
        }
    },
    mounted(){
        this.init_data()
    }
}
</script>
<style lang="sass" scoped>
    .article-wrapper
        margin:40px 20px 0px
        padding:20px 15px
        background-color:#fff
        box-shadow:0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04)
        .article-list
            &-header
                margin-bottom:20px
        .pagination-wapper
            text-align: right
            padding-top:20px
        .none-article
            max-width: 250px
            margin:0 auto
            text-align: center
            header
                margin:15px 0
                font-size:14px
</style>