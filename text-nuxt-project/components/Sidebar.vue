<script setup lang="ts">
import { ref } from "vue";
import PanelMenu from "primevue/panelmenu";

const items = ref([
  {
    label: "Dashboard",
    icon: "mage:dashboard-fill",
    route: "/dashboard",
  },
  {
    label: "Category",
    icon: "heroicons:square-3-stack-3d-20-solid",
    items: [
      {
        label: "Lists",
        icon: "mingcute:menu-line",
        route: "/category",
      },
      {
        label: "Add",
        icon: "ph:list-plus-bold",
        route: "/category/create",
      },
    ],
  },
  {
    label: "Product",
    icon: "fluent:box-16-filled",
    items: [
      {
        label: "Lists",
        icon: "mingcute:menu-line",
        route: "/product",
      },
      {
        label: "Add",
        icon: "ph:list-plus-bold",
        route: "/product/create",
      },
    //   {
    //     label: "Active",
    //     icon: "mingcute:menu-line",
    //     route: "/product/Active",
    //   },
    //   {
    //     label: "Inactive",
    //     icon: "mingcute:menu-line",
    //     route: "/product/inactive",
    //   },
    ],
  },
  {
    label: "Slide",
    icon: "material-symbols:transition-slide",
    items: [
      {
        label: "List",
        icon: "mingcute:menu-line",
        route: "/slide",
      },
      {
        label: "Add",
        icon: "ph:list-plus-bold",
        route: "/slide/create",
      },
    ],
  },
  {
    label: "Brand",
    icon: "material-symbols:emoji-food-beverage-rounded",
    items: [
      {
        label: "List",
        icon: "mingcute:menu-line",
        route: "/brand",
      },
      {
        label: "Add",
        icon: "ph:list-plus-bold",
        route: "/brand/create",
      },
    ],
  },
//   {
//     label: "Vendor",
//     icon: "solar:shop-2-bold",
//     items: [
//       {
//         label: "List",
//         icon: "mingcute:menu-line",
//         route: "/vendor",
//       },
//       {
//         label: "Add",
//         icon: "ph:list-plus-bold",
//         route: "/vendor/create",
//       },
//     ],
//   },
]);
</script>
<template>
  <div class="sidebar_menu w-full left-0 max-h-[calc(100vh-3rem)]">
    <PanelMenu unstyled :model="items">
      <template #item="{ item }">
        <NuxtLink
          v-if="item.route"
          v-slot="{ href, navigate }"
          :to="item.route"
        >
          <NuxtLink
            class="flex align-items-center cursor-pointer text-color px-3 py-2"
            :href="href"
            @click="navigate"
          >
            <Icon :name="item.icon" width="1.4em" height="1.4em" />
            <span class="ml-2 text-color">{{ item.label }} 1</span>
          </NuxtLink>
        </NuxtLink>
        <NuxtLink
          v-else
          class="flex align-items-center cursor-pointer text-color px-3 py-2"
          :href="item.url"
          :target="item.target"
        >
          <Icon :name="item.icon" width="1.4em" height="1.4em" />
          <span class="ml-2">{{ item.label }} 2</span>
          <span
            v-if="item.items"
            class="pi pi-angle-down text-primary ml-auto"
          />
        </NuxtLink>
      </template>
    </PanelMenu>
  </div>
</template>
