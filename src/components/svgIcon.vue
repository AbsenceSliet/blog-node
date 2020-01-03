<template>
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :href="iconName" />
  </svg>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class SvgIcon extends Vue {
  @Prop()
  private iconClass!: string;
  @Prop(String) private className!: string;
  private get iconName(): string {
    return `#icon-${this.iconClass}`;
  }
  private get svgClass(): string {
    if (this.className) {
      return `svg-icon  ${this.className}`;
    } else {
      return `svg-icon`;
    }
  }
}
</script>
<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>