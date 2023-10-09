<template>
  <div v-if="store" class="w-full max-w-7xl mx-auto text-center mt-[30vh]">
    <select
      class="block w-full p-2 mx-auto rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-600 sm:max-w-xs sm:text-sm sm:leading-6"
      v-model="selectedType"
      @change="complete()"
    >
      <option v-for="typpe in types" :key="typpe.id" :value="typpe.id">
        {{ typpe.name }}
      </option>
    </select>
  </div>
</template>

<script>
import Title from "../../components/Common/Title.vue";
import Caption from "../../components/Common/Caption.vue";
import { createWizardStore } from "../../stores/addproduct.js";

export default {
  data() {
    return {
      types: null,
      selectedType: "",
      store: null,
    };
  },
  components: { Title, Caption },

  mounted() {
    fetch("http://localhost:5002/get_product_types")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        this.types = data.types;
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });

    this.store = createWizardStore();
    this.store.init();
    this.store.setcurrnetStepCaption("Ürün Türü");
  },

  methods: {
    complete() {
      if (this.selectedType) {
        this.store.setStepDecision(this.selectedType, "product_type");
        this.store.setCurrentStepCompleted();
      }
      console.log(this.selectedType);
    },
  },
};
</script>
