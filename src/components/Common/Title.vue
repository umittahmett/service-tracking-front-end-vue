<template>
  <h1
    class="font-semibold text-gray-900"
    :class="{
      'text-2xl md:text-3xl': titleType === '3xl',
      'text-xl md:text-2xl': titleType === '2xl',
      'text-lg md:text-xl': titleType === 'xl',
      'text-md md:text-lg': titleType === 'lg',
      'text-sm md:text-md': titleType === 'md',
      'text-xs md:text-sm': titleType === 'sm',
    }"
  >
    <slot></slot>
  </h1>
</template>

<script>
export default {
  props: {
    titleType: {
      type: String,
      default: "2xl",
    },
  },
};
</script>
