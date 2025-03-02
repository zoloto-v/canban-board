<template>
  <button v-on:click="onClick" class="button" :class="classes" :style="styles">
    <slot name="icon"></slot>
    <template>
      {{ text }}
    </template>
  </button>
</template>

<script>
export default {
  name: 'TransparentButton',
  props: ['icon', 'text', 'classes', 'onClick', 'styles']
}
</script>

<style scoped>
.button {
  display: flex;
  width: auto;
  align-items: center;
  padding: 5px;
  border: none;
  background: none;
}
.button.button_transparent {
  display: flex;
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid #C4CAD4;
  color: #1C2530;
  background: #fff;
  cursor: pointer;
}
</style>
