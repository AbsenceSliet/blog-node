<template>
    <div class="article-wrapper">
        <header class="create-title">文章分类</header>
        <div class="category-btn">
            <el-button
                size="medium"
                @click="createCategory()" icon="el-icon-plus">添加分类
            </el-button>
        </div>
        <el-table :data="category" row-key="id" border lazy 
            tooltip-effect="dark" >
            <el-table-column 
            v-for="(item,index) in categoryItem" 
            :key="index" 
            :prop="item.prop" 
            :label="item.label" ></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="createCategory(scope.$index, scope.row)"><i class="el-icon-edit"></i></el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="deleteCategory(scope.$index, scope.row)"><i class="el-icon-delete"></i></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" @close="closeDialog">
            <el-form :model="categoryForm" label-position="left" size="small" ref="categoryForm">
                <el-form-item label="分类名称" :rules="{
                required: true, message: '域名不能为空', trigger: 'blur'
                }">
                    <el-input v-model="categoryForm.name"></el-input>
                </el-form-item>
                <el-form-item label="同级分类排名">
                    <el-input v-model.number="categoryForm.sortnum"></el-input>
                </el-form-item>
                <el-form-item label="前台是否可视">
                    <el-radio v-model="categoryForm.radio" label="1">是</el-radio>
                    <el-radio v-model="categoryForm.radio" label="2">否</el-radio>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="saveCategory('categoryForm')">保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>  
    </div>
</template>
<script>
export default {
    data() {
        return {
            category:[{
                id:1111,
                name:'Node.js',
                sortnum:'1'
            }],
            categoryItem:[{label:'分类ID',prop:'id'},{label:'分类名称',prop:'name'},{label:'同级排序',prop:'sortnum'}],
            dialogTitle:'添加新分类',
            dialogVisible:false,
            categoryForm:{
                name:'',
                sortnum:'',
                radio:'1'
            }
        }
    },
    methods: {
        createCategory(){
            let args = Array.from(arguments)
            if(args.length>0){
                this.categoryForm = {
                    name:args[1].name,
                    sortnum:args[1].sortnum
                }
            }
            this.dialogVisible = true
        },
        deleteCategory(index){
            this.category.splice(index,1)
        },
        saveCategory(form){
            this.$refs[form].validate(valid=>{
                if(valid){
                    this.category.push({id:'689',name:this.categoryForm.name,sortnum:this.categoryForm.sortnum})
                    this.dialogVisible =false
                    this.categoryForm = {
                        name:'',
                        sortnum:'',
                        radio:'1'
                    }
                }else{

                }
            })
        },
        closeDialog(){
            this.categoryForm = {
                name:'',
                sortnum:'',
                radio:'1'
            }
        }
    },
}
</script>
<style lang="sass" scoped>
    .article-wrapper
        margin:40px 20px 0px
        padding:20px 15px
        background-color:#fff
        box-shadow:0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04)
        header
            text-align: center
        .category-btn
            margin-bottom:15px   
</style>