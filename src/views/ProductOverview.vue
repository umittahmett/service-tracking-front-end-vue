<template>
  <div v-if="store && store.currentProduct" class="w-full">
    <div class="pb-10">
      <div class="flex items-center justify-start gap-x-2">
        <BackButton :buttonType="'sky'" :link="'/'" />

        <Title :titleType="'3xl'">Ürün Detay</Title>
      </div>

      <div v-if="store && !message">
        <div>
          <Title
            :titleType="'3xl'"
            class="text-base font-semibold leading-7 text-gray-900 mt-6"
          >
            {{ store.currentProduct.title }}
          </Title>

          <Caption class="!text-base">
            {{ store.currentProduct.description }}
          </Caption>

          <div class="flex justify-between w-full items-end">
            <Title class="mt-10" :titleType="'xl'">Ürün Özellikleri</Title>

            <div class="flex justify-end gap-x-10 items-center">
              <div class="hidden sm:flex justify-center gap-x-3">
                <button
                  class="hover:opacity-70 transition-all"
                  @click="selectedViewType = 1"
                >
                  <Bars3Icon
                    :class="{
                      '!text-black  !border-b-2  border-sky-500 ':
                        selectedViewType === 1,
                    }"
                    class="w-5 text-gray-400 transition-all"
                  />
                </button>

                <button
                  class="hover:opacity-70 transition-all"
                  @click="selectedViewType = 2"
                >
                  <ViewColumnsIcon
                    :class="{
                      '!text-black  !border-b-2 border-sky-500 ':
                        selectedViewType === 2,
                    }"
                    class="w-5 text-gray-400 transition-all"
                  />
                </button>
              </div>

              <button
                class="bg-transparent font-medium text-sm shadow-none text-sky-400 border-b rounded-b-none p-0 border-b-sky-400 ring-0 hover:opacity-60"
                :class="{
                  '!text-yellow-300  !border-yellow-300 ': edit_mode === true,
                }"
                @click="edit_mode = !edit_mode"
              >
                {{ edit_mode ? "Tamamla" : "Düzenle" }}
              </button>
            </div>
          </div>

          <div
            :class="{
              '!grid !grid-cols-3': selectedViewType === 2,
            }"
            class="mt-6 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0"
          >
            <div
              :class="{
                '!flex !flex-col !gap-y-2': selectedViewType === 2,
              }"
              class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6"
            >
              <label
                for="first-name"
                class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Durumu
              </label>

              <select
                class="block w-full p-2 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-600 sm:max-w-xs sm:text-sm sm:leading-6"
                v-model="store.currentProduct.situation"
                :disabled="!edit_mode"
                :class="{
                  'opacity-70  !focus:ring-0': !edit_mode,
                }"
              >
                <option
                  v-for="option in situationOptions"
                  :key="option.id"
                  :value="option.id"
                >
                  {{ option.label }}
                </option>
              </select>
            </div>

            <div
              :class="{
                '!flex !flex-col !gap-y-2': selectedViewType === 2,
              }"
              class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6"
            >
              <label
                for="feature-name"
                class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Türü
              </label>

              <div
                class="mt-2 w-full sm:col-span-2 sm:mt-0 flex items-center gap-x-2"
              >
                <input
                  :disabled="!edit_mode"
                  v-model="store.currentProduct.type_name"
                  type="text"
                  name="feature-name"
                  id="feature-name"
                  autocomplete="given-name"
                  class="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  :class="{
                    'opacity-70  !focus:ring-0': !edit_mode,
                  }"
                />
              </div>
            </div>

            <div
              v-for="(feature, index) in store.currentProduct.features"
              :key="index"
              :class="{
                '!flex !flex-col !gap-y-2': selectedViewType === 2,
              }"
              class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6"
            >
              <label
                for="feature-name"
                class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                {{ feature.feature_name }}
              </label>

              <div
                class="mt-2 w-full sm:col-span-2 sm:mt-0 flex items-center gap-x-2 relative"
              >
                <div class="relative max-w-xs w-full">
                  <input
                    :disabled="!edit_mode"
                    v-model="store.currentProduct.features[index].feature"
                    type="text"
                    name="feature-name"
                    id="feature-name"
                    autocomplete="given-name"
                    class="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    :class="{
                      'opacity-70  !focus:ring-0': !edit_mode,
                    }"
                  />

                  <Caption class="absolute right-2 top-2">
                    {{ feature.feature_unit_name }}
                  </Caption>
                </div>
              </div>
            </div>
          </div>

          <div class="flex w-full justify-end gap-x-4 mt-4">
            <router-link to="/">
              <Button :buttonType="'white'" :text="'Vazgeç'"> </Button>
            </router-link>

            <Button @click="savedata">
              <a href="/">Kaydet</a>
            </Button>
          </div>
        </div>
      </div>

      <div class="w-full text-center mt-20" v-if="message">
        <XCircleIcon class="w-20 mx-auto text-sky-500" />

        <Title>{{ message }}</Title>

        <Button class="mx-auto mt-5">
          <a href="/">Anasayfaya Dön</a>
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import ProductRow from "../components/Common/ProductRow.vue";
import Title from "../components/Common/Title.vue";
import Caption from "../components/Common/Caption.vue";
import { createWizardStore } from "../stores/counter";
import Button from "../components/Common/Button.vue";
import BackButton from "../components/Common/BackButton.vue";
import {
  Bars3Icon,
  ViewColumnsIcon,
  XCircleIcon,
} from "@heroicons/vue/20/solid";

export default {
  data() {
    return {
      store: null,
      product: null,
      edit_mode: false,
      selectedViewType: 1,
      message: "",
      situationOptions: [
        { id: 1, label: "Tamir Aşamasında" },
        { id: 2, label: "Tamir Edilemedi" },
        { id: 3, label: "Tamir Edildi" },

        { id: 4, label: "Onay Bekliyor" },
        { id: 5, label: "Parça Bekliyor" },
        { id: 6, label: "Elektrik Atölyesinde" },
      ],
    };
  },
  components: {
    ProductRow,
    Title,
    Caption,
    Button,
    BackButton,
    Bars3Icon,
    ViewColumnsIcon,
    XCircleIcon,
  },

  mounted() {
    this.store = createWizardStore();
    this.product = this.store.currentProduct;

    const currentUrl = window.location.href;
    const lastSlashIndex = currentUrl.lastIndexOf("/");
    const numberAfterLastSlash = currentUrl.slice(lastSlashIndex + 1);
    const number = numberAfterLastSlash;
    // Sayıyı kontrol edin
    if (!isNaN(number)) {
      console.log("URL'deki sayı:", number);
      if (!this.store.currentProduct) {
        fetch("http://localhost:5002/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ serial_number: number }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            } else if (response.status === 204) {
              this.message = "Ürün Bulunamadı";
              console.log("Urun bulunamadi");
            }
            return response.json();
          })
          .then((data) => {
            this.store.currentProduct = data.products[0];
            console.log(data.products[0]);
          })
          .catch((error) => {
            console.error("Fetch error:", error);
          });
      }
    } else {
      console.log("URL'deki sayı bulunamadı.");
    }
  },

  methods: {
    savedata() {
      fetch("http://localhost:5002/update_product", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body:
          this.store && this.store.currentProduct
            ? JSON.stringify({ product: this.store.currentProduct })
            : JSON.stringify({ product: null }),
      })
        .then((response) => {
          if (!response.ok) {
            if (response.status == 404) {
              console.log(response.data && response.data.message);
            } else {
              console.log(response.data && response.data.message);
            }
          }
          return response.json();
        })
        .then((data) => {
          console.log(data.message);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });

      for (let i = 0; i < this.store.currentProduct.features.length; i++) {
        const element_name = this.store.currentProduct.features[i].feature_name;
        const element = this.store.currentProduct.features[i].feature;
        console.log(element_name, " : ", element);
      }
    },
  },
};
</script>
