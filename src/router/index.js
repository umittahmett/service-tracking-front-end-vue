import { createRouter, createWebHistory } from "vue-router";
import HomeLayout from "../layouts/HomeLayout.vue";
import HomeView from "../views/HomeView.vue";
import Barcode from "../views/Barcode.vue";
import ProductOverview from "../views/ProductOverview.vue";
import AddProduct from "../layouts/AddProduct.vue";
import ProductType from "../views/add-product/ProductType.vue";
import ProductHead from "../views/add-product/ProductHead.vue";
import Response from "../views/add-product/Response.vue";
import ProductFeatures from "../views/add-product/ProductFeatures.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "",
      component: HomeLayout,
      meta: { title: "Home page" },
      children: [
        {
          path: "",
          name: "",
          component: HomeView,
        },
        {
          path: "/overview/:id?",
          name: "overview",
          component: ProductOverview,
        },
      ],
    },

    {
      path: "/add_product",
      name: "add_product",
      component: AddProduct,
      meta: { title: "Add Product" },
      children: [
        {
          path: "",
          name: "prductType",
          component: ProductType,
        },
        {
          path: "product_head",
          name: "prductHead",
          component: ProductHead,
        },
        {
          path: "product_features",
          name: "prductFeatures",
          component: ProductFeatures,
        },
      ],
    },

    {
      path: "/response",
      name: "response",
      component: Response,
    },
  ],
});

export default router;
