<template>
  <div class="w-full mx-auto flex flex-col mt-[10vh]">
    <div class="max-w-xl w-full mx-auto">
      <div class="flex flex-col justify-center items-start">
        <label
          for="feature-name"
          class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
        >
          Başlık
        </label>
        <div class="mt-2 w-full">
          <input
            v-model="title"
            @input="complete()"
            type="text"
            name="title"
            id="title"
            class="w-full outline-none min-w-0 px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-sky-500 focus:ring-inset focus:ring-600"
          />
        </div>
      </div>

      <div class="flex flex-col justify-center items-start mt-10">
        <label
          for="feature-name"
          class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
        >
          Açıklama
        </label>
        <div class="mt-2 w-full">
          <textarea
            v-model="description"
            @input="complete()"
            type="text"
            name="description"
            id="description"
            class="w-full outline-none min-w-0 px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-sky-500 focus:ring-inset focus:ring-600"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "../../components/Common/Title.vue";
import Caption from "../../components/Common/Caption.vue";
import { createWizardStore } from "../../stores/addproduct.js";

export default {
  data() {
    return {
      title: "",
      description: "",
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
    this.store.setcurrnetStepCaption("Ürün Başlığı");
  },

  methods: {
    complete() {
      if (this.title && this.description) {
        this.store.setStepDecision(
          {
            title: this.title,
            description: this.description,
          },
          "product_head"
        );
        this.store.setCurrentStepCompleted();
      }
    },
  },
};
</script>
