<script setup>
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import Sidebar from "primevue/sidebar";
import TabMenu from "primevue/tabmenu";
import Calendar from "primevue/calendar";

import Dropdown from "primevue/dropdown";

import { ref } from "vue";

const items = ref([
  { label: "Dashboard", icon: "pi pi-home" },
  { label: "Transactions", icon: "pi pi-chart-line" },
  { label: "Products", icon: "pi pi-list" },
  { label: "Messages", icon: "pi pi-inbox" },
]);

const router = useRouter();
definePageMeta({
  layout: "dashboard",
});

const visibleRight = ref(false);
const icondisplay = ref();
const startDate = ref(null);

const endDate = ref(null);

const selectedSize = ref();
const sizes = ref([
  { name: "S", code: "RM" },
  { name: "M", code: "LDN" },
  { name: "L", code: "IST" },
  { name: "XL", code: "PRS" },
]);

const selectedColor = ref();
const colors = ref([
  { name: "Red", code: "#FF0000" },
  { name: "Green", code: "#00FF00" },
  { name: "Blue", code: "#0000FF" },
  { name: "Yellow", code: "#FFFF00" },
  { name: "Magenta", code: "#FF00FF" },
  { name: "Cyan", code: "#00FFFF" },
  { name: "Black", code: "#000000" },
  { name: "White", code: "#FFFFFF" },
]);
</script>
<template>
  <NuxtLayout :name="layout">
    <div class="w-full px-3 mt-1">
      <div
        class="shadow-md bg-white w-full h-[calc(100vh-6rem)] overflow-hidden rounded-md"
      >
        <div class="flex w-full justify-between bg-gray-400 text-white">
          <div class="font-semibold mt-1 ml-3">Products</div>
          <div class="font-semibold ml-1 flex">
            <button
              @click="$router.back()"
              class="bg-[#800] hover:bg-red-500 text-gray-100 hover:text-black px-4 py-1 text-sm transition delay-100"
            >
              <Icon name="gg:arrow-left-o"></Icon>
              Back
            </button>

            <button
              class="bg-blue-600 hover:bg-blue-500 text-gray-100 transform hover:text-black px-4 py-1 text-sm"
              @click="visibleRight = true"
            >
              <Icon name="iconoir:filter-solid"></Icon>
              Filter
            </button>
            <NuxtLink
              to="product/create"
              class="bg-cyan-600 hover:bg-cyan-500 text-gray-100 hover:text-black px-4 py-2 text-sm rounded-rt-sm"
            >
              <Icon name="zondicons:add-outline"></Icon>
              Add
            </NuxtLink>
          </div>
        </div>

        <!-- Table list goes here -->
        <div class="h-[calc(100vh-10.4rem)] overflow-y-auto border-b px-3 pt-3">
          <table class="w-full table-auto">
            <thead>
              <tr class="w-full bg-gray-300 text-sm">
                <th class="p-1 text-left text-sm w-8">SL</th>
                <th class="p-1 text-left text-sm w-12">Icon</th>
                <th class="p-1 text-left text-sm">Product Name</th>
                <th class="p-1 text-left text-sm">Price</th>
                <th class="p-1 text-left text-sm">Stock</th>
                <th class="p-1 text-left text-sm">Category</th>
                <th class="p-1 text-left text-sm">Color</th>
                <th class="p-1 text-left text-sm">Size</th>
                <th class="p-1 text-left text-sm">Vendor</th>
                <th class="p-1 text-left">Status</th>
                <th class="p-1 text-center w-24">...</th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white odd:bg-gray-100">
                <td class="p-1 text-center text-xs">1</td>
                <td class="p-1 text-left text-xs">
                  <img class="h-8" src="/default.png" />
                </td>
                <td class="p-1 text-left text-xs">
                  <p class="w-72"></p>
                  Al-nassr half sleeve most popular premium quality embroidery
                  jersey -comfortable for summer
                </td>
                <td class="p-1 text-left text-xs">120</td>
                <td class="p-1 text-left text-xs">12</td>
                <td class="p-1 text-left text-xs">T-shirt, Short Sleeve</td>
                <td class="p-1 text-left text-xs">Red,Blue,Orange,Gray</td>
                <td class="p-1 text-center text-xs">M,L,XL,2xl</td>
                <td class="p-1 text-center text-xs">Supper Shop</td>
                <td class="p-1 text-center text-xs">Active</td>
                <td class="p-1 text-center text-xs flex">

                

                <div class="rounded-md bg-cyan-400 ml-1 p-1 text-white" title="View">
                    <NuxtLink to="/product/details">
                      <Icon name="mdi:eye" width="1.4em" height="1.4em" />
                    </NuxtLink>
                </div>
                <div class="rounded-md bg-yellow-500 ml-1 p-1 text-white" title="Edit">
                    <nuxt-link to="/product/1/edit">
                        <Icon name="subway:pencil" width="1.4em" height="1.4em" />
                    </nuxt-link>
                </div>
                <button class="rounded-md bg-red-600 ml-1 p-1 text-white" title="Delete">
                    <Icon name="bxs:trash" width="1.4em" height="1.4em" />
                </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="order_title text-sm flex justify-between h-full">
          <div class="mt-[2px] ml-3">
            <InputGroup>
              <input
                type="number"
                class="border border-r-0 p-1 focus:outline-none"
                placeholder="Pagen Number"
              />
              <icon
                class="text-3xl bg-gray-200 px-2 w-12 rounded-r cursor-pointer"
                name="nonicons:go-16"
                color="#000"
              />
            </InputGroup>
          </div>
          <div class="flex -mt-1">
            <a class="p-2 mt-1 text-black" href="#">&laquo;</a>
            <a
              class="p-1 px-2 mt-1 border-t-4 border-red-500 text-red-500"
              href="#"
              >1</a
            >
            <a class="p-2 mt-1 text-black m-1" href="#">2</a>
            <a class="p-2 mt-1 text-black m-1" href="#">3</a>
            <a class="p-2 mt-1 text-black m-1" href="#">4</a>
            <a class="p-2 mt-1 text-black m-1" href="#">5</a>
            <a class="p-2 mt-1 text-black m-1" href="#">...</a>
            <a class="p-2 mt-1 text-black m-1" href="#">6</a>
            <a class="p-2 mt-1 text-black m-1" href="#">&raquo;</a>
          </div>
        </div>
      </div>

      <Sidebar
        v-model:visible="visibleRight"
        header="Product Filter"
        position="right"
      >
        <!--  Product Name  -->
        <div class="w-full">
          <label for="dd-city" class="text-sm w-full">By Name</label>
          <input
            type="text"
            v-model="value"
            class="w-full text-sm border py-1 px-2 outline-none focus:border-red-200 rounded-md"
            placeholder="Enter Product Name"
          />
        </div>
        <!--  Product Status-->
        <div class="w-full mt-2">
          <label for="dd-city" class="text-sm w-full">Status</label>
          <select
            name="status"
            id="commission_type"
            class="w-full text-sm border py-1 px-2 outline-none focus:border-red-200 rounded-md"
          >
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>
        <!--  Price Range-->
        <div class="w-full mt-2">
          <label for="dd-city" class="text-sm w-full">Price Range</label>
          <div>
            <input
              type="text"
              v-model="value"
              class="w-[48%] mr-1 text-sm border py-1 px-2 outline-none focus:border-red-200 rounded-md"
              placeholder="Min."
            />
            <input
              type="text"
              v-model="value"
              class="w-1/2 text-sm border py-1 px-2 outline-none focus:border-red-200 rounded-md"
              placeholder="Max."
            />
          </div>
        </div>
        <!-- Date Range-->
        <div class="w-full mt-2">
          <label for="dd-city" class="text-sm w-full">Date Range</label>
          <div>
            <Calendar
              :pt="{
                input: {
                  class: 'px-4 py-1 border',
                },
              }"
              class="w-[48%] mr-1 text-sm outline-none focus:border-red-200 rounded-md"
              v-model="startDate"
              placeholder="Start Date"
            />
            <Calendar
              :pt="{
                input: {
                  class: 'px-4 py-1 border',
                },
              }"
              class="w-1/2 text-sm outline-none focus:border-red-200 rounded-md"
              v-model="endDate"
              placeholder="End Date"
            />
          </div>
        </div>
        <!-- size & Color-->
        <div class="w-full grid grid-cols-2 gap-2 mt-2">
          <div>
            <label for="dd-city" class="text-sm w-full">Size</label>
            <Dropdown
              v-model="selectedSize"
              :options="sizes"
              optionLabel="name"
              placeholder="Select Size"
            class="text-sm border m-0  outline-none focus:border-red-200 rounded-md"
            />
          </div>
          <div>
            <label for="dd-city" class="text-sm w-full">Color</label>
            <Dropdown
              v-model="selectedColor"
              :options="colors"
              optionLabel="name"
              placeholder="Select Size"
              class=""
            />
          </div>
          <div></div>
        </div>
        <!-- Brand & Vendors-->
        <div class="w-full grid grid-cols-2 gap-2 mt-2">
          <div>
            <label for="dd-city" class="text-sm w-full">Brand</label>
            <Dropdown v-model="selectedSize" :options="sizes" filter optionLabel="name" placeholder="Select a Country" class="w-full md:w-14rem">
            <template #value="slotProps">
                <div v-if="slotProps.value" class="flex align-items-center">
                    <img :alt="slotProps.value.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`" style="width: 18px" />
                    <div>{{ slotProps.value.name }}</div>
                </div>
                <span v-else>
                    {{ slotProps.placeholder }}
                </span>
            </template>
            <template #option="slotProps">
                <div class="flex align-items-center">
                    <img :alt="slotProps.option.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`" style="width: 18px" />
                    <div>{{ slotProps.option.name }}</div>
                </div>
            </template>
            </Dropdown>
          </div>
          <div>
            <label for="dd-city" class="text-sm w-full">Vendor</label>
            <Dropdown v-model="selectedColor" :options="colors" filter optionLabel="name" placeholder="Select a Country" class="w-full md:w-14rem">
            <template #value="slotProps">
                <div v-if="slotProps.value" class="flex align-items-center">
                    <img :alt="slotProps.value.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`" style="width: 18px" />
                    <div>{{ slotProps.value.name }}</div>
                </div>
                <span v-else>
                    {{ slotProps.placeholder }}
                </span>
            </template>
            <template #option="slotProps">
                <div class="flex align-items-center">
                    <img :alt="slotProps.option.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`" style="width: 18px" />
                    <div>{{ slotProps.option.name }}</div>
                </div>
            </template>
            </Dropdown>
          </div>
          <div></div>
        </div>

        <!-- Search Icon -->
        <div class="font-semibold flex mt-2 place-content-end">
          <button
            class="bg-blue-600 hover:bg-blue-500 text-gray-100 transform hover:text-black px-4 py-1 text-sm rounded-md"
            @click="visibleRight = true"
          >
            <Icon name="fluent:search-12-filled"></Icon>
            Search
          </button>
        </div>
      </Sidebar>
    </div>
  </NuxtLayout>
</template>
<style scoped >
span.p-dropdown-label.p-inputtext.p-placeholder {
    padding: 2px;
}
</style>