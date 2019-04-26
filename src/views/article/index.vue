<template>
    <div class="article-wrapper">
        <div class="article-list" v-if="!tableData">
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
            <el-table :data="tableData" row-key="id" border lazy @selection-change="selectionChange" 
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
            tableTitle:[{label:' 分类',prop:'category',sortable:true},{label:'标题',prop:'title',sortable:false},{label:'发布时间',prop:'create_time',sortable:true},{label:'修改时间',prop:'modified_time',sortable:true}],
            tableData:[{
                id:1,
                category:'Node.js',
                title:'ajhsdajhsgd',
                create_time:'2016-05-02',
                modified_time:'2016-05-09'
            }],
            selectArticles:[],
            currentPage:1,
            pageSize:100,
            pageSizes:[100, 200, 300, 400],
            total:'400'
        }
    },
    methods: {
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