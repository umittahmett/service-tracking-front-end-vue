<template>
  <form @submit.prevent="downloadBarCode()" class="form">
    <h1>Type to view BarCode</h1>
    <div class="container flex flex-col my-10">
      <div class="text-container">
        <div class="barcode-text serial-no">
          {{ `SERİ NO: ${BarcodeText}` }}
        </div>
        <div class="barcode-text title">{{ `BAŞLIK: ${BarcodeText}` }}</div>
        <div class="barcode-text description">
          {{ `AÇIKLAMA: ${BarcodeText}` }}
        </div>
      </div>
      <div class="barcode-container">
        <a href="">
          <vue-qrcode :value="QRCodeText" :size="200"></vue-qrcode>
        </a>
      </div>
    </div>

    <button v-if="WebsiteURL">Open Website</button>
  </form>
</template>

<script>
import VueBarcode from "@chenfengyuan/vue-barcode";
import html2canvas from "html2canvas";
import VueQrcode from "vue-qrcode";

export default {
  data() {
    return {
      QRCodeText: "lorem.com", // QR kod içeriği olarak kullanılacak URL

      WebsiteURL: "https://example.com", // Yönlendirilecek web sitesi URL'sini burada belirtin
      BarcodeText: "https://example.com", // Metin eklemek için kullanılacak veri
      barcodeOptions: {
        displayValue: true,
        lineColor: "#2B2B2C",
        width: 1, // Barkod genişliğini ayarlayabilirsiniz
        height: 30, // Barkod yüksekliğini ayarlayabilirsiniz
      },
    };
  },
  components: {
    "vue-barcode": VueBarcode,
    "vue-qrcode": VueQrcode,
  },
  methods: {
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
};
</script>
<!-- <template>
  <div>
    <vue-qrcode :value="QRCodeText" :size="200"></vue-qrcode>
  </div>
</template>

<script>
import VueQrcode from "vue-qrcode";

export default {
  data() {
    return {
      QRCodeText: "lorem.com", // QR kod içeriği olarak kullanılacak URL
    };
  },
  components: {
    "vue-qrcode": VueQrcode,
  },
};
</script> -->

<!-- <template>
  <form @submit.prevent="downloadBarCode()" class="form">
    <h1>Type to view BarCode</h1>
    <div class="container flex flex-col my-10">
      <div class="text-container">
        <div class="barcode-text serial-no">
          {{ `SERİ NO: ${BarcodeText}` }}
        </div>
        <div class="barcode-text title">{{ `BAŞLIK: ${BarcodeText}` }}</div>
        <div class="barcode-text description">
          {{ `AÇIKLAMA: ${BarcodeText}` }}
        </div>
      </div>
      <div class="barcode-container">
        <a href="">
          <vue-barcode
            ref="BarImg"
            tag="img"
            :value="WebsiteURL"
            :options="barcodeOptions"
            style="max-width: 100%; max-height: 100%"
          />
        </a>
      </div>
    </div>

    <button v-if="WebsiteURL">Open Website</button>
  </form>
</template>

<script>
import VueBarcode from "@chenfengyuan/vue-barcode";
import html2canvas from "html2canvas";

export default {
  data() {
    return {
      WebsiteURL: "https://example.com", // Yönlendirilecek web sitesi URL'sini burada belirtin
      BarcodeText: "https://example.com", // Metin eklemek için kullanılacak veri
      barcodeOptions: {
        displayValue: true,
        lineColor: "#2B2B2C",
        width: 1, // Barkod genişliğini ayarlayabilirsiniz
        height: 30, // Barkod yüksekliğini ayarlayabilirsiniz
      },
    };
  },
  components: {
    "vue-barcode": VueBarcode,
  },
  methods: {
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
};
</script> -->
