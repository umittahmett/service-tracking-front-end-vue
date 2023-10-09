<template>
  <p
    class=""
    :class="{
      'text-gray-500': type === 'gray',
      'text-gray-900': type === 'black',
      'font-normal': font === 'normal',
      'font-light': font === 'light',
      'font-bold': font === 'bold',

      'text-xl': fontSize === 'xl',
      'text-lg': fontSize === 'lg',
      'text-md': fontSize === 'md',
      'text-sm': fontSize === 'sm',
      'text-xs': fontSize === 'xs',
      italic: textStyle === 'italic',
    }"
  >
    <slot></slot>
  </p>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "gray",
    },
    font: {
      type: String,
      default: "normal",
    },
    fontSize: {
      type: String,
      default: "sm",
    },
    textStyle: {
      type: String,
      default: "",
    },
  },
};
</script>
