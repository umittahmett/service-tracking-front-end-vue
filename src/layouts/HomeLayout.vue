<template>
  <div class="w-full">
    <Navbar />
    <router-view
      class="max-w-7xl xl:max-w-[1400px] mx-auto w-full mt-10 mb-2 px-6"
    />
  </div>
</template>

<script>
import Navbar from "../components/Menu/Navbar.vue";

export default {
  data() {
    return {};
  },
  components: {
    Navbar,
  },
};
</script>
