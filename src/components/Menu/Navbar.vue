<template>
  <div
    className="w-full p-4 bg-sky-500  flex justify-between items-center  mx-auto"
  >
    <a href="/" className="font-bold text-4xl  p-2 text-white">Bilgi İşlem</a>
    <div className=" justify-center items-center gap-x-6 hidden lg:flex">
      <a v-for="page in pages" :key="page.name" :href="page.href">
        <span
          class="cursor-pointer text-gray-200 text-sm hover:text-white hover:border-b transition-text"
          >{{ page.name }}
        </span>
      </a>
    </div>
    <Button class="hidden lg:block" :text="'Login'" />
    <button @click="menuToggle = true" class="w-7 lg:hidden">
      <img src="@/images/bars.png" alt="" />
    </button>

    <!-- Mobile Menu -->

    <div
      v-if="menuToggle"
      className="w-full h-full p-6 text-white transition-all duration-[10ms] fixed top-0 left-0 animate__animated animate__fadeInRight bg-sky-500 z-50 "
    >
      <div class="flex justify-between items-center mb-8">
        <a href="/" className="font-bold text-4xl  text-white">Bilgi İşlem </a>

        <button
          @click="menuToggle = false"
          class="rounded-md border border-[#ffffff74]"
        >
          <XMarkIcon class="w-8" />
        </button>
      </div>

      <div class="items-center gap-x-2 mt-4 flex">
        <input
          id="search"
          name="search"
          class="w-full p-2 ring-0 outline-none bg-white shadow-customShadow rounded-md h-9 bg-dnp-400 text-black placeholder:text-gray-600 sm:text-sm sm:leading-6"
          placeholder="Barkod Tara"
          type="search"
          v-model="barcodeId"
          :class="{
            '!border-red-300 border': isNaN(barcodeId),
          }"
        />
        <Button>
          <a
            :href="
              barcodeId && !isNaN(barcodeId) ? `/overview/${barcodeId}` : '#'
            "
            >Sorgula</a
          >
        </Button>
      </div>

      <div class="mt-4" v-for="page in pages" :key="page.name">
        <a
          :href="page.href"
          class="cursor-pointer text-sky-100 font-medium text-2xl hover:text-white hover:border-b transition-text"
          >{{ page.name }}
        </a>
      </div>

      <div class="w-full absolute bottom-[15%] left-0 p-2">
        <button
          className=" w-full text-sky-500 font-bold text-xl rounded hover:scale-95 transition-all duration-200 bg-sky-100 p-4 text-customColor "
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { LockClosedIcon, XMarkIcon } from "@heroicons/vue/20/solid";
import Button from "../Common/Button.vue";
import "animate.css";

export default {
  data() {
    return {
      menuToggle: false,
      barcodeId: null,
      pages: [
        { name: "Anasayfa", href: "/" },
        { name: "Ürün Ekle", href: "/add_product" },
        { name: "Yeni Ürün Oluştur", href: "/create_new_product" },
      ],
    };
  },
  components: {
    Button,
    LockClosedIcon,
    XMarkIcon,
  },
};
</script>
