<template>
  <span
    class="inline-flex items-center px-2 py-1 text-xs font-semibold ring-1 ring-inset"
    :class="{
      'text-pink-400 bg-pink-400/10 ring-pink-400/20': color === 'pink',
      'text-gray-400 bg-rose-400/10 ring-rose-400/20': color === 'rose',
      'text-red-400 bg-red-400/10 ring-red-400/20': color === 'red',
      'text-yellow-400 bg-yellow-400/10 ring-yellow-400/20': color === 'yellow',
      'text-green-400 bg-green-400/10 ring-green-400/20': color === 'green',
      'text-blue-400 bg-blue-400/10 ring-blue-400/20': color === 'blue',
      'text-indigo-400 bg-indigo-400/10 ring-indigo-400/20': color === 'indigo',
      'text-purple-400 bg-purple-400/10 ring-purple-400/20': color === 'purple',

      'rounded-sm': this.roundSize === 1,
      'rounded-md': this.roundSize === 2,
      'rounded-lg': this.roundSize === 3,
      'rounded-xl': this.roundSize === 4,
      'rounded-full': this.roundSize === 5,

      [customClass]: true,
    }"
  >
    <slot></slot>
    {{ text }}
  </span>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: null,
    },
    text: {
      type: String,
      default: null,
    },
    roundSize: {
      type: Number,
      default: 2,
    },
    customClass: {
      type: String,
      default: null,
    },
    circle: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
