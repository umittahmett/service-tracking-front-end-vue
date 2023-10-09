import { defineStore } from "pinia";

export const createWizardStore = defineStore("counter", {
  state: () => ({
    productData: 0,
    stepNumber: 0,
    isCurrentStepCompleted: false,
    isAlljourneyDone: false,
    currnetStepCaption: "",
    addProductResponse: false,
    productSerialNumber: "",
    selectedType: "",
    productId: "",
    steps: [
      {
        name: "",
        completed: false,
        route: "/add_product",
        product_type: null,
      },
      {
        name: "",
        completed: false,
        route: "/add_product/product_head",
        product_head: null,
      },
      {
        name: "",
        completed: false,
        route: "/add_product/product_features",
        product_features: [],
      },
    ],
  }),
  actions: {
    setNextStep() {
      this.stepNumber++;
      this.isCurrentStepCompleted = this._isCurrentStepCompleted();
    },

    setcurrnetStepCaption(text) {
      this.currnetStepCaption = text;
    },

    setPreviousStep() {
      this.stepNumber--;
      this.isCurrentStepCompleted = this._isCurrentStepCompleted();
    },

    _isCurrentStepCompleted() {
      return this.steps[this.stepNumber].completed;
    },

    setCurrentStepCompleted(status = true) {
      this.steps[this.stepNumber].completed = status;
      this.isCurrentStepCompleted = this._isCurrentStepCompleted();
    },

    getCurrentRoute() {
      return this.steps[this.stepNumber].route;
    },

    setStepDecision(decision, property) {
      this.steps[this.stepNumber][property] = decision;
    },

    init() {
      if (this.steps[0].projectName === null) {
        this.$router.push({
          path: "/add_product",
        });

        this.isAlljourneyDone = false;
        this.isCurrentStepCompleted = false;
        this.isPaymentsLoaded = false;
      }
    },

    sendData() {
      fetch("http://localhost:5002/add_product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: {
            type_id: this.steps[0].product_type,
            title: this.steps[1].product_head.title,
            description: this.steps[1].product_head.description,
            features: this.steps[2].product_features,
          },
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
            this.addProductResponse = false;
          } else {
            this.addProductResponse = true;
            return response.json();
            console.log("response: ", this.addProductResponse);
          }
        })
        .then((data) => {
          console.log(data.message);
          this.productSerialNumber = data.serial_number;
          this.productId = data.product_id;
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });

      this.$router.push({
        path: "/response",
      });
    },
  },
});
