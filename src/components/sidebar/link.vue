<template>
    <component v-bind="handleLink(to)">
        <slot />    
    </component>
</template>
<script>
import {isExternal} from "@/utils/validate"
export default {
    props:{
        to:{
            type:String,
            default:''
        }
    },
    methods: {
        handleLink(url){
            if(isExternal(url)){
                return {
                    is : 'a',
                    href : url,
                    target:' _blank',
                    rel: 'noopener'
                }
            }
            return {
                is: 'router-link',
                to: url
            }
        }
    },
}
</script>