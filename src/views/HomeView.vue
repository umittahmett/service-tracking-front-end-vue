<template>
  <div class="w-full">
    <div class="mb-3">
      <div class="w-full flex justify-between">
        <Title :titleType="'3xl'">Ürünler</Title>
        <div class="items-center gap-x-2 hidden sm:flex">
          <input
            id="search"
            name="search"
            class="w-full p-2 ring-0 outline-none bg-white shadow-customShadow rounded-md h-9 bg-dnp-400 text-black placeholder:text-gray-600 sm:text-sm sm:leading-6"
            placeholder="Barkod Tara"
            type="search"
            v-model="barcodeId"
          />
          <Button><a :href="`/overview/${barcodeId}`">Sorgula</a></Button>
        </div>
      </div>
      <div class="relative w-full mt-2">
        <input
          id="search"
          name="search"
          class="w-full pl-10 pr-2 ring-0 outline-none bg-white shadow-customShadow rounded-md h-9 bg-dnp-400 text-black placeholder:text-gray-600 sm:text-sm sm:leading-6"
          placeholder="Ürün Ara..."
          type="search"
          v-model="filterKeyword"
        />
        <div
          class="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-3"
        >
          <svg
            class="w-5 h-5 text-sky-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-5.197-5.197M10 4a6 6 0 100 12 6 6 0 000-12z"
            />
          </svg>
        </div>
      </div>
      <div
        class="w-full flex items-center gap-x-2 justify-between px-1 my-3 mb-6"
      >
        <div class="flex items-center flex-wrap gap-2">
          <Caption>Tür :</Caption>
          <Button
            v-for="typpe in types"
            :key="typpe.id"
            @click="filterByTypeId(typpe.id)"
            class="bg-sky-500 !font-light text-white !p-1.5 px-2 !text-sm flex items-center justify-center"
          >
            {{ typpe.name }}
            <CheckCircleIcon
              v-if="this.selectedTypes.includes(typpe.id)"
              class="w-4 text-white"
            />
          </Button>
        </div>

        <div class="hidden sm:flex justify-center gap-x-3">
          <button
            class="hover:opacity-70 transition-all"
            @click="changeViewType(1)"
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
            @click="changeViewType(2)"
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
      </div>
    </div>
    <div
      v-if="selectedViewType == 1"
      class="w-full bg-sky-50 border rounded-xl"
    >
      <div
        class="w-full grid grid-cols-10 justify-start gap-x-8 items-center bg-sky-200 rounded-t-xl p-4"
      >
        <Caption class="col-span-1" :fontSize="'md'" :font="'light'">
          Ürün Tipi
        </Caption>

        <Caption class="col-span-3" :fontSize="'md'" :font="'light'">
          Başlık
        </Caption>

        <Caption class="col-span-5" :fontSize="'md'" :font="'light'">
          Açıklama
        </Caption>

        <Caption class="col-span-1" :fontSize="'md'" :font="'light'">
          Durum
        </Caption>
      </div>
      <div v-for="product in filteredItemList" :key="product.title">
        <ProductRow
          @click="store.currentProduct = product"
          :product="product"
        />
      </div>
    </div>

    <div
      class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2"
      v-if="selectedViewType == 2"
    >
      <div v-for="product in filteredItemList" :key="product.title">
        <ProductGrid
          @click="store.currentProduct = product"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProductRow from "../components/Common/ProductRow.vue";
import Title from "../components/Common/Title.vue";
import Caption from "../components/Common/Caption.vue";
import { createWizardStore } from "../stores/addproduct.js";
import Button from "../components/Common/Button.vue";
import {
  CheckCircleIcon,
  XMarkIcon,
  Bars3Icon,
  ViewColumnsIcon,
} from "@heroicons/vue/20/solid";
import ProductGrid from "../components/Common/ProductGrid.vue";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      products: [],
      store: null,
      badges: [],
      filterKeyword: "",
      types: null,
      selectedTypes: [],
      selectedViewType: 1,
      barcodeId: null,
    };
  },
  components: {
    ProductRow,
    Title,
    Caption,
    Button,
    CheckCircleIcon,
    XMarkIcon,
    ViewColumnsIcon,
    Bars3Icon,
    ProductGrid,
  },
  computed: {
    filteredItemList() {
      return this.products.filter((item) => {
        if (this.selectedTypes.length === 0 && this.filterKeyword === "") {
          return item;
        } else {
          return (
            item.title.includes(this.filterKeyword) &&
            this.selectedTypes.length != 0 &&
            this.selectedTypes.includes(item.type_id)
          );
        }
      });
    },
  },
  methods: {
    changeViewType(type) {
      this.selectedViewType = type;
      Cookies.set("selectedViewType", type);
    },
    filterByTypeId(typeId) {
      if (this.selectedTypes.includes(typeId)) {
        var indeks = this.selectedTypes.indexOf(typeId);
        if (indeks !== -1) {
          this.selectedTypes.splice(indeks, 1);
        }
      } else {
        this.selectedTypes.push(typeId);
      }
      console.log("SELECTED TYPES :", this.selectedTypes);
    },
  },

  mounted() {
    let screenSize = window.innerWidth;
    if (screenSize < 768) {
      Cookies.set("selectedViewType", 2);
    }
    this.selectedViewType = Cookies.get("selectedViewType");
    fetch("http://localhost:5002/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        this.products = data.products;
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });

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
  },
};
</script>
