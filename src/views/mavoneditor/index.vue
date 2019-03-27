<template>
    <div class="mavon-wrapper">
        <mavon-editor v-model="mavon"/>
    </div>
</template>
<script>
export default {
    data() {
        return {
            mavon: ''
        }
    }
}
</script>