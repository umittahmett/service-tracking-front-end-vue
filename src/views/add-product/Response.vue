<template>
  <div
    v-if="store"
    class="w-full mx-auto flex flex-col justify-center items-center h-[90vh] gap-2 px-4"
  >
    <div v-if="store.addProductResponse">
      <CheckBadgeIcon class="w-40 text-sky-500" />
    </div>

    <div v-if="!store.addProductResponse">
      <XCircleIcon class="w-20 text-sky-500" />
    </div>

    <Title>
      {{
        !store.addProductResponse
          ? "Bir şeyler ters gitti"
          : "Ürün Başarılı Bir Şekilde Eklendi"
      }}
    </Title>

    <form
      @submit.prevent="downloadBarCode()"
      class="form max-w-[377.9532px] max-h-[226.7719px] h-full w-full"
    >
      <div
        class="container justify-between border flex items-start px-2 pb-2 rounded-md w-full h-full flex-col"
      >
        <div class="text-container z-20 flex-col items-start">
          <p class="font-light mt-1">
            <strong class="!font-bold">SERİ NO:</strong>
            {{ store.productSerialNumber }}
          </p>
          <p class="font-light mt-1">
            <strong class="!font-bold">BAŞLIK:</strong>
            {{ store.steps[1].product_head.title }}
          </p>

          <div class="text-container z-20">
            <p class="font-light mt-1">
              <strong class="!font-bold">AÇIKLAMA:</strong>
              {{
                truncateDescription(
                  store.steps[1].product_head.description,
                  200
                )
              }}
            </p>
          </div>
        </div>
        <div class="w-full">
          <div class="pr-3 flex items-end justify-between w-full">
            <vue-qrcode
              class="w-16 border rounded-md mt-3"
              :value="`http://localhost:5173/overview/${store.productId}`"
              :size="200"
            ></vue-qrcode>

            <vue-barcode
              class="border rounded-md"
              ref="BarImg"
              tag="img"
              :value="store.productSerialNumber"
              :options="barcodeOptions"
            />
          </div>
        </div>
      </div>
    </form>

    <a
      @click="downloadBarCode()"
      href="/"
      class="w-fit mt-6 flex justify-center gap-x-2 px-4 py-2 text-xs font-medium leading-6 text-white align-middle transition-all duration-200 ease-in-out shadow-sm bg-sky-400 hover:bg-sky-300 md:text-sm focus:ring-1 focus:ring-inset rounded-lg focus:ring-sky-600"
    >
      Pdf Çıkart
    </a>
  </div>
</template>

<script>
import Title from "../../components/Common/Title.vue";
import Caption from "../../components/Common/Caption.vue";
import Button from "../../components/Common/Button.vue";
import { createWizardStore } from "../../stores/addproduct";
import VueQrcode from "vue-qrcode";
import html2canvas from "html2canvas";
import { CheckBadgeIcon, XCircleIcon } from "@heroicons/vue/20/solid";
import VueBarcode from "@chenfengyuan/vue-barcode";

export default {
  data() {
    return {
      BarcodeText: "lorem", // Metin eklemek için kullanılacak veri
      barcodeOptions: {
        format: "CODE128",
        displayValue: true,
        lineColor: "#2B2B2C",
        width: 2, // Barkod genişliğini ayarlayabilirsiniz
        height: 20,
      },
      store: null,
    };
  },
  methods: {
    truncateDescription(description, limit) {
      if (description.length <= limit) {
        return description;
      } else {
        return description.slice(0, limit) + "..."; // Belirli bir karakter sınırına kadar kısaltma
      }
    },
    downloadBarCode() {
      html2canvas(this.$el.querySelector(".container"), {
        scale: 2, // Barkodun küçültülmesi için ölçeği ayarlayabilirsiniz
      }).then((canvas) => {
        var barcodeImgTag = document.createElement("a");
        document.body.appendChild(barcodeImgTag);
        barcodeImgTag.download = "Barcode.jpg";
        barcodeImgTag.href = canvas.toDataURL("image/jpg");
        barcodeImgTag.target = "_blank";
        barcodeImgTag.click();
      });
    },
    openWebsite() {
      window.open(this.WebsiteURL, "_blank");
    },
  },

  components: {
    Title,
    Caption,
    Button,
    "vue-qrcode": VueQrcode,
    "vue-barcode": VueBarcode,

    CheckBadgeIcon,
    XCircleIcon,
  },

  mounted() {
    this.store = createWizardStore();
    console.log(this.store);
  },
};
</script>
