<template>
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :href="iconName" />
  </svg>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
export default class SvgIcon extends Vue {
  // @Prop({
  //     type:String,
  //     required:true
  // })
  // iconClass:string;
  // @Prop({
  //     type:String,
  //     required:true
  // })
  // className:string;
  // iconName :string
  // set iconName(param:string):void{
  //     if()
  // }
}
</script>