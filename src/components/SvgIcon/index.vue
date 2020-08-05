<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class SvgIcon extends Vue {
  @Prop({ type: String, required: true }) iconClass;
  @Prop({ type: String, default: '' }) className;

  get iconName() {
    return `#icon-${this.iconClass}`;
  }
  get svgClass() {
    if (this.className) {
      return 'svg-icon ' + this.className;
    } else {
      return 'svg-icon';
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em !important;
  height: 1em !important;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
