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
                        <el-select v-model="articleContent.category_id" placeholder="请选择">
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
                <el-input v-model="articleContent.desc"></el-input>
            </el-form-item>
            <el-form-item label="文章标签">
                <div class="tags-warpper">
                    <el-tag class="tag" size="small" v-for="(tag,index) in articleContent.tags" :disable-transitions="false" :key="index" @close="closeTag(tag)" closable>{{tag}}</el-tag>
                </div>
                <el-input v-model="tag"  @keyup.enter.native="inputTag"
                @blur="inputTag"></el-input>
            </el-form-item>
            <el-form-item label="正文">
                <mavon-editor v-model="articleContent.content"/>
            </el-form-item>
        </el-form>
        <div class="articleSave">
            <el-button type="primary" @click="create"><svg-icon icon-class= "send"/> 发布</el-button>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import {  createarticle, updatearticle, articledetail } from '@/constants/api'
export default {
    data() {
        return {
            articleContent: {
                title:'',
                desc:'',
                content:'',
                tags:[],
                category_id:''
            },
            tag:'',
            category: [],
            article_id:''
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
            if(this.$route.query.article_id){
                this.article_id = Number(this.$route.query.article_id)
                articledetail(this.article_id).then(res=>{
                    if(res.data.code == 1){
                        this.articleContent = res.data.result
                        let  hasCategory = this.category.find(item=>
                            item.category_id == this.articleContent.category_id
                        )
                        if(!hasCategory){
                            this.articleContent.category_id = ''
                        }
                    }else{
                        this.$message({message:`该文章不存在`, type: 'error'});
                        this.$router.push({ path: '/article/index' })
                    }
                }).catch(err=>{
                    console.log(err);
                })
            }
        },
        inputTag(){
            let inputVal = this.tag
            if(inputVal && !this.articleContent.tags.includes(inputVal)){
                this.articleContent.tags.push(inputVal)
            }
            this.tag = ''
        },
        closeTag(tag){
            this.articleContent.tags.length > 0 ? this.articleContent.tags.splice(this.articleContent.tags.indexOf(tag), 1) :''
        },
        create(){
            let createItem = {
                title: this.articleContent.title,
                desc :this.articleContent.desc,
                tags:this.articleContent.tags,
                content:this.articleContent.content,
                category_id:this.articleContent.category_id
            }
            this.category.map(item=>{
                if(item.category_id == createItem.category_id){
                    createItem.category_name= item.name
                }
            })
            if(this.article_id){
                createItem.article_id = this.article_id
                console.log(createItem);
                updatearticle(createItem).then(res=>{
                    if(res.data.code ==1 ){
                        this.$message({message:`${res.data.message}`, type: 'success'});
                        this.$router.push({ path: '/article/index' })
                    }else{
                        this.$message({message:`${res.data.message}`, type: 'error'});
                    }
                })
                return
            }
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