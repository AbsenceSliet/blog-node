<template>
    <div class="article-wrapper">
        <header class="create-title">文章内容</header>
        <el-form label-position="top"  :model="articleContent" size="small">
            <el-row :gutter="50" :class="device == 'mobile'? 'content-row':''">
                <el-col  :md="16">
                    <el-form-item label="文章标题">
                        <el-input v-model="articleContent.title"></el-input>
                    </el-form-item>
                </el-col>
                <el-col  :md="8">
                    <el-form-item label="文章分类">
                        <el-select v-model="category_value" placeholder="请选择">
                            <el-option
                            v-for="item in category"
                            :key="item.category_id"
                            :label="item.name"
                            :value="item.category_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="文章摘要">
                <el-input v-model="articleContent.abstract"></el-input>
            </el-form-item>
            <el-form-item label="文章标签">
                <div class="tags-warpper">
                    <el-tag class="tag" size="small" v-for="(tag,index) in tags" :disable-transitions="false" :key="index" @close="closeTag(tag)" closable>{{tag}}</el-tag>
                </div>
                <el-input v-model="articleContent.tag"  @keyup.enter.native="inputTag"
                @blur="inputTag"></el-input>
            </el-form-item>
            <el-form-item label="正文">
                <mavon-editor v-model="mavon"/>
            </el-form-item>
        </el-form>
        <div class="articleSave">
            <el-button type="primary" @click="create"><svg-icon icon-class= "send"/> 发布</el-button>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import {  createarticle } from '@/constants/api'
export default {
    data() {
        return {
            articleContent: {
                title:'',
                abstract:'',
                tag:''
            },
            tags:[],
            category_value:'',
            category: [],
            mavon:''
        }
    },
    computed:{
        ...mapGetters([
            'device'
        ])
    },
    mounted() {
        this.init()
    },
    methods: {
        init(){
            this.$store.dispatch('categoryList').then(res=>{
                if(res.data.code == 1){
                    this.category = res.data.result
                }
            })
        },
        inputTag(){
            let inputVal = this.articleContent.tag
            if(inputVal && !this.tags.includes(inputVal)){
                this.tags.push(inputVal)
            }
            this.articleContent.tag = ''
        },
        closeTag(tag){
            this.tags.length > 0 ? this.tags.splice(this.tags.indexOf(tag), 1) :''
        },
        create(){
            let createItem = {
                title: this.articleContent.title,
                abstract :this.articleContent.abstract,
                tags:this.tags,
                content:this.mavon,
                category_id:this.category_value
            }
            this.category.map(item=>{
                if(item.category_id == createItem.category_id){
                    createItem.category_name= item.name
                }
            })
            createarticle(createItem).then((res)=>{
                if(res.data.code == 1){
                    this.$message({message:`${res.data.message}`, type: 'success'});
                    this.$router.push({ path: '/article/index' })
                }else{
                    this.$message({message:`${res.data.message}`, type: 'error'});
                }
            }).catch(err=>{
                console.log(err);
            })
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
        .content-row
            flex-direction: column
            display: flex
        .tags-warpper
            .tag
                margin: 0 10px 10px    
</style>