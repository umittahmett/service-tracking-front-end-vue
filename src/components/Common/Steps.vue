<template>
  <nav class="flex items-center justify-center" aria-label="Progress">
    <p class="text-sm font-normal">
      {{ steps.findIndex((step) => step.status === "current") + 1 }} /
      {{ steps.length }}
    </p>
    <ol role="list" class="ml-6 flex items-center space-x-5">
      <li v-for="step in steps" :key="step">
        <div
          v-if="step.status === 'complete'"
          class="block h-2.5 w-2.5 rounded-full bg-sky-600 hover:bg-sky-900"
        ></div>
        <div
          v-else-if="step.status === 'current'"
          class="relative flex items-center justify-center"
          aria-current="step"
        >
          <span class="absolute flex h-5 w-5 p-px" aria-hidden="true">
            <span class="h-full w-full rounded-full bg-sky-200" />
          </span>
          <span
            class="relative block h-2.5 w-2.5 rounded-full bg-sky-600"
            aria-hidden="true"
          />
        </div>
        <div
          v-else
          class="block h-2.5 w-2.5 rounded-full bg-gray-200 hover:bg-gray-400"
        ></div>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  props: {
    steps: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: [],
    },
    currentStep: {
      type: Number,
      default: 0,
    },
  },
};
</script>
