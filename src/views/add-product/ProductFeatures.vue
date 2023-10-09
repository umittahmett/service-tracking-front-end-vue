<template>
  <div
    class="max-w-7xl w-full mx-auto grid grid-cols-2 sm:grid-cols-3 gap-8 pt-10 pb-20"
  >
    <div
      v-for="feature in features"
      :key="feature.id"
      class="flex flex-col justify-center items-start"
    >
      <label for="feature-name" class="block text-sm text-gray-500 sm:pt-1.5">
        {{ feature.name }}
      </label>
      <div class="w-full relative flex">
        <input
          v-model="
            productFeatures.find(
              (item) => item.products_type_feature_id === feature.id
            ).feature
          "
          @input="complete()"
          type="text"
          name="description"
          id="description"
          class="w-full outline-none min-w-0 px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-sky-500 focus:ring-inset focus:ring-600"
        />
        <Caption class="absolute right-2 mt-2">{{ feature.unit_name }}</Caption>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "../../components/Common/Title.vue";
import Caption from "../../components/Common/Caption.vue";
import { createWizardStore } from "../../stores/addproduct";

export default {
  data() {
    return {
      features: [],
      productFeatures: [],
      store: null,
    };
  },
  components: { Title, Caption },

  methods: {
    complete() {
      const feature_count = this.productFeatures.filter(
        (item) => item.feature !== ""
      ).length;

      if (feature_count > 5) {
        this.store.setStepDecision(this.productFeatures, "product_features");
        this.store.setCurrentStepCompleted();
      }
    },
  },

  mounted() {
    this.store = createWizardStore();

    fetch("http://localhost:5002/get_features", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type_id: this.store.steps[0].product_type }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        this.features = data.features;
        console.log(data);
        for (let feature = 0; feature < data.features.length; feature++) {
          const feature_id = data.features[feature].id;
          this.productFeatures.push({
            products_type_feature_id: feature_id,
            feature: "",
          });
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
    this.store.setcurrnetStepCaption("Ürün Özellikleri");
  },
};
</script>
