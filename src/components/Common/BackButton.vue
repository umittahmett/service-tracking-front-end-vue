<template>
  <router-link
    :to="link"
    class="flex items-center font-medium gap-x-2"
    :class="{
      'text-3xl font-medium': buttonType === 'fill',
      'opacity-50 cursor-not-allowed': disabled,
    }"
    :disabled="disabled"
  >
    <ArrowLeftIcon
      class="w-10 p-2 bg-white rounded-full mr-2 shadow-customShadow"
      :src="back_button"
      alt=""
      :class="{
        'bg-transparent': buttonType === 'fill',
        '!bg-gray-200': buttonType === 'gray',
        '!bg-sky-500 !text-white': buttonType === 'sky',
      }"
    />
    <slot class="text-3xl"> </slot>
  </router-link>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {};
  },
  props: {
    page_name: {
      type: String,
      default: null,
    },
    buttonType: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    link: {
      type: String,
      default: null,
    },
  },
});
</script>

<script setup>
import { ArrowLeftIcon } from "@heroicons/vue/20/solid";
</script>
