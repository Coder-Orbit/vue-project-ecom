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
    label: "Orders",
    icon: "fa-solid:shopping-basket",
    items: [
      {
        label: "Lists",
        icon: "mingcute:menu-line",
        route: "/order",
      },
      
   
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
    icon: "pajamas:labels",
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
  {
    label: "Coupon",
    icon: "mingcute:coupon-fill",
    items: [
      {
        label: "List",
        icon: "mingcute:menu-line",
        route: "/Coupon",
      },
      {
        label: "Add",
        icon: "ph:list-plus-bold",
        route: "/Coupon/create",
      },
    ],
  },
  {
    label: "Vendor",
    icon: "teenyicons:shop-solid",
    items: [
      {
        label: "List",
        icon: "mingcute:menu-line",
        route: "/Vendor",
      },
      {
        label: "Add",
        icon: "ph:list-plus-bold",
        route: "/Vendor/create",
      },
    ],
  },
  {
    label: "Permission",
    icon: "teenyicons:password-solid",
    items: [
        {
            label: "Role",
            icon: "game-icons:house-keys",
            route: "/permission",
        },
        {
            label: "Role Permission",
            icon: "ooui:user-contributions-ltr",
            route: "/permission/role",
        },
        {
            label: "User Permission",
            icon: "mdi:user-lock",
            route: "/permission/user",
        },
    ],
  },

    {
        label: "Mail Configuration",
        icon: "fluent:mail-settings-16-filled",
        route: "/mail",
    },

    {
        label: "Web Settings",
        icon: "mingcute:settings-6-fill",
        route: "/settings",
    },

    {
        label: "Transactions",
        icon: "tdesign:money",
        route: "/transaction",
    }

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
            <span class="ml-2 text-color">{{ item.label }}</span>
          </NuxtLink>
        </NuxtLink>
        <NuxtLink
          v-else
          class="flex align-items-center cursor-pointer text-color px-3 py-2"
          :href="item.url"
          :target="item.target"
        >
          <Icon :name="item.icon" width="1.4em" height="1.4em" />
          <span class="ml-2">{{ item.label }}</span>
          <span
            v-if="item.items"
            class="pi pi-angle-down text-primary ml-auto"
          />
        </NuxtLink>
      </template>
    </PanelMenu>
  </div>
</template>
