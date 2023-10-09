<template>
  <div class="w-full px-4 pt-1 mb-20">
    <div class="w-full row-span-1 mx-auto max-w-7xl">
      <div class="flex items-end justify-between mt-8">
        <div>
          <Title :titleType="'3xl'">Yeni Ürün Ekle</Title>
          <div class="flex items-center gap-x-2 justify-start mt-6">
            <BackButton :buttonType="'sky'" :link="'/'" />
            <Caption class="!text-2xl" :type="'black'" v-if="store"
              >{{ store.currnetStepCaption }}
            </Caption>
          </div>
        </div>
        <Steps v-if="store" :steps="steps" />
      </div>
    </div>
    <div
      class="fixed bottom-0 left-0 w-full p-4 bg-white shadow-xl shadow-sky-500 z-50"
    >
      <div class="w-full mx-auto flex justify-between max-w-7xl">
        <a href="/">
          <Button :text="'İptal Et'" :roundSize="5" />
        </a>

        <!-- Next Button -->
        <Button
          v-if="store && !store.isAlljourneyDone"
          :text="this.store.stepNumber === 2 ? 'Tammamla' : 'Sonraki Adıma Geç'"
          :roundSize="5"
          :disabled="!store.isCurrentStepCompleted"
          @click="this.store.stepNumber === 2 ? store.sendData() : nextStep()"
        >
          <ArrowRightIcon class="w-6" />
        </Button>
      </div>
    </div>

    <RouterView class="w-full max-w-7xl mx-auto" />
  </div>
</template>

<script>
import BackButton from "../components/Common/BackButton.vue";
import Steps from "../components/Common/Steps.vue";
import Button from "../components/Common/Button.vue";
import { createWizardStore } from "../stores/addproduct";
import Title from "../components/Common/Title.vue";
import Caption from "../components/Common/Caption.vue";
export default {
  name: "CreateProjectLayout",
  data() {
    return {
      store: null,
      steps: [{ status: "current" }, { status: "" }, { status: "" }],
    };
  },

  components: {
    BackButton,
    Steps,
    Button,
    Title,
  },
  computed: {},
  methods: {
    onRouteClick(page) {
      console.log(page);
    },
    nextStep() {
      this.store.setNextStep();
      this.calculateSteps();
    },
    previousStep() {
      this.store.getCurrentRoute();
      this.store.setPreviousStep();
      this.calculateSteps();
    },
    calculateSteps() {
      if (this.store.stepNumber === 3 && !this.store.isPaymentsLoaded) {
        console.log(this.store.stepNumber);
        this.$router.push({
          path: "/add_product",
        });
        return;
      }
      console.log(this.store.stepNumber);
      this.steps = this.steps.map((step, index) => {
        if (index < this.store.stepNumber) {
          step.status = "complete";
        } else if (index === this.store.stepNumber) {
          step.status = "current";
        } else {
          step.status = "";
        }
        return step;
      });
      this.$router.push({
        path: this.store.getCurrentRoute(),
      });
    },
  },
  mounted() {
    this.store = createWizardStore();
  },
};
</script>

<script setup>
import { ArrowRightIcon } from "@heroicons/vue/20/solid";
</script>
