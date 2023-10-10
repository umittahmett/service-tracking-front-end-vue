<template>
  <div class="border-t cursor-pointer hover:bg-sky-100 transition-all p-4">
    <router-link to="/overview">
      <div
        class="w-full p-2 grid grid-cols-10 justify-between gap-x-8 items-center"
      >
        <div class="col-span-1 line-clamp-2">
          <img class="w-20" :src="getImagePath(product.type_id)" alt="" />
        </div>

        <Title class="col-span-3 line-clamp-2" :titleType="'lg'">
          {{ product.title }}
        </Title>

        <Caption class="col-span-5 line-clamp-2">
          {{ product.description }}
        </Caption>

        <div
          class="w-full flex flex-col items-center justify-center gap-y-2 col-span-1 text-center"
        >
          <img class="w-10" :src="getSituationIcon(product.situation)" alt="" />
          <Caption class="text-xs"
            >{{ getSituationName(product.situation) }}
          </Caption>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import Button from "../Common/Button.vue";
import Caption from "./Caption.vue";
import Title from "./Title.vue";
import KasaImage from "/Kasa.png"; // Doğrudan import edilebilen bir yol
import MonitorImage from "/Monitor.png"; // Doğrudan import edilebilen bir yol
import LaptopImage from "/laptop.png"; // Doğrudan import edilebilen bir yol
import YaziciImage from "/Yazici.png"; // Doğrudan import edilebilen bir yol
import NoImgage from "/no-image.png"; // Doğrudan import edilebilen bir yol
import InProgress from "/sit1.png"; // Doğrudan import edilebilen bir yol
import Completed from "/sit3.png"; // Doğrudan import edilebilen bir yol
import Failed from "/sit2.png"; // Doğrudan import edilebilen bir yol
import While from "/while.png"; // Doğrudan import edilebilen bir yol
import Electric from "/electric.png"; // Doğrudan import edilebilen bir yol
import { stringifyQuery } from "vue-router";

export default {
  data() {
    return {};
  },
  methods: {
    getImagePath(typeName) {
      if (typeName === 1) {
        return KasaImage;
      } else if (typeName === 3) {
        return MonitorImage;
      } else if (typeName === 2) {
        return LaptopImage;
      } else {
        return NoImgage;
      }
    },

    getSituationIcon(situation) {
      if (situation === 1) {
        return InProgress;
      } else if (situation === 3) {
        return Completed;
      } else if (situation === 2) {
        return Failed;
      } else if (situation === 4 || situation === 5) {
        return While;
      } else if (situation === 6) {
        return Electric;
      } else {
        return "non";
      }
    },
    situationOptions: [
      { id: 1, label: "Tamir Aşamasında" },
      { id: 2, label: "Tamir Edilemedi" },
      { id: 3, label: "Tamir Edildi" },

      { id: 4, label: "Onay Bekliyor" },
      { id: 5, label: "Parça Bekliyor" },
      { id: 6, label: "Elektrik Atölyesinde" },
    ],

    getSituationName(situation) {
      if (situation === 1) {
        return "Tamir Aşamasında";
      } else if (situation === 2) {
        return "Tamir Edilemedi";
      } else if (situation === 3) {
        return "Tamir Edildi";
      } else if (situation === 4) {
        return "Onay Bekliyor";
      } else if (situation === 5) {
        return "Parça Bekliyor";
      } else if (situation === 6) {
        return "Elektrik Atölyesinde";
      } else {
        return "undefined";
      }
    },
  },
  components: {
    Button,
    Title,
    Caption,
  },
  props: {
    product: {
      type: Object,
      default: null,
    },
    link: {
      type: String,
      default: "/overview",
    },
  },
};
</script>
