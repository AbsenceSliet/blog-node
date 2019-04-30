<template>
    <div class="article-wrapper">
        <header class="create-title">文章分类</header>
        <div class="category-btn">
            <el-button
                size="medium"
                @click="createCategory()" icon="el-icon-plus">添加分类
            </el-button>
        </div>
        <el-table size="mini" :data="category" row-key="id" border lazy 
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
            <el-form :model="categoryForm" label-position="left" size="mini" ref="categoryForm">
                <el-form-item label="分类名称" :rules="{
                required: true, message: '域名不能为空', trigger: 'blur'
                }">
                    <el-input v-model="categoryForm.name"></el-input>
                </el-form-item>
                <el-form-item label="同级分类排名">
                    <el-input v-model.number="categoryForm.level"></el-input>
                </el-form-item>
                <el-form-item label="前台是否可视">
                    <el-radio-group v-model="categoryForm.visual">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                    </el-radio-group>
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
            category:[],
            categoryItem:[{label:'分类ID',prop:'category_id'},{label:'分类名称',prop:'name'},{label:'同级排序',prop:'level'},{label:'前台是否可视',prop:'visual'}],
            dialogTitle:'添加新分类',
            dialogVisible:false,
            categoryForm:{
                name:'',
                level:'',
                visual:'1'
            },
            editCategory:false
        }
    },
    methods: {
        init(){
            this.$store.dispatch('categoryList').then(res=>{
                if(res.data.code == 1){
                    this.category = res.data.result
                }
            })
        },
        createCategory(){
            let args = Array.from(arguments)
            if(args.length>0){
                this.editCategory = true
                this.categoryForm = args[1]
                this.$store.dispatch('categoryList',{category_id:args[1].category_id}).then(res=>{
                    if(res.data.code == 1){
                        this.categoryForm = res.data.result[0]
                    }
                })
            }else{
                this.categoryForm = {
                    name:'',
                    level:'',
                    visual:'1'
                }
                this.editCategory = false
            }
            this.dialogVisible = true
        },
        deleteCategory(index){
            this.category.splice(index,1)
        },
        saveCategory(form){
            this.$refs[form].validate(valid=>{
                if(valid){
                    let params = this.categoryForm
                    if(this.editCategory){
                        //编辑分类
                        this.$store.dispatch('updatecategory',params).then(res=>{
                            if(res.data.code==1){
                                this.init()
                                this.$message({message:`${res.data.message}`, type: 'success'});
                            }
                        })
                    }else{
                        //创建分类
                        this.$store.dispatch('createCategory',params).then(res=>{
                            if(res.data.code==1){
                                this.init()
                                this.$message({message:`${res.data.message}`, type: 'success'});
                            }else{
                                this.$message({message:`${res.data.message}`, type: 'error'});
                            }
                        }).catch(err=>{
                            // this.$message({message:`操作数据失败`, type: 'error'});
                        })
                    }
                    this.dialogVisible =false
                    this.categoryForm = {
                        name:'',
                        level:'',
                        visual:'1'
                    }
                }else{

                }
            })
        },
        closeDialog(){
            this.categoryForm = {
                name:'',
                level:'',
                visual:'1'
            }
        }
    },
    mounted(){
        this.init()
    }
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