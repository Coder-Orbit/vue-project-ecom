<script setup>
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import Sidebar from "primevue/sidebar";
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";
import { ref } from "vue";

const router = useRouter();

definePageMeta({
  layout: "dashboard",
});

const visibleRight = ref(false);

const startDate = ref(null);

const endDate = ref(null);
const selectedSize = ref();
const sizes = ref([
  { name: "S", code: "RM" },
  { name: "M", code: "LDN" },
  { name: "L", code: "IST" },
  { name: "XL", code: "PRS" },
]);

const selectedCategory = ref();
const Categories = ref([
  { name: "T-shirt", code: "#FF0000" },
  { name: "Men", code: "#00FF00" },
  { name: "Woman", code: "#0000FF" },
  { name: "Kids", code: "#FFFF00" },
]);
const selectedBrand = ref();
const brands = ref([
  { name: "Samsung", code: "01" },
  { name: "Opp", code: "02" },
  { name: "Vivo", code: "03" },
  { name: "Walton", code: "04" },
]);
const selectedVendor = ref();
const vendors = ref([
  { name: "Mama Tong", code: "01" },
  { name: "Arongo", code: "02" },
  { name: "Halim Biryani", code: "03" },
  { name: "Tikka Masala", code: "04" },
]);
</script>
<template>
  <NuxtLayout :name="layout">
    <div class="w-full px-3 mt-1">
      <div
        class="shadow-md bg-white w-full h-[calc(100vh-6rem)] overflow-hidden rounded-md"
      >
        <div class="flex w-full justify-between bg-gray-400 text-white">
          <div class="font-semibold mt-1 ml-3">All Orders</div>
          <div class="font-semibold ml-1 flex">
            <button
              @click="$router.back()"
              class="bg-[#800] hover:bg-red-500 text-gray-100 hover:text-black px-4 py-1 text-sm transition delay-100"
            >
              <Icon name="gg:arrow-left-o"></Icon>
              Back
            </button>

            <button
              class="bg-blue-600 hover:bg-blue-500 text-gray-100 transform hover:text-black text-sm px-4 py-2"
              @click="visibleRight = true"
            >
              <Icon name="iconoir:filter-solid"></Icon>
              Filter
            </button>
          </div>
        </div>

        <!-- Table list goes here -->
        <div class="h-[calc(100vh-10.4rem)] overflow-y-auto border-b px-3 pt-3">
          <table class="w-full table-auto">
            <thead>
              <tr class="w-full bg-gray-300 text-sm">
                <th class="p-1 text-left text-sm w-8">SL</th>
                <th class="p-1 text-left text-sm">Order Id</th>
                <th class="p-1 text-left text-sm">Name</th>
                <th class="p-1 text-left text-sm">Contact No</th>
                <th class="p-1 text-left text-sm">Items</th>
                <th class="p-1 text-left text-sm">Amount</th>
                <th class="p-1 text-left text-sm">Discount</th>
                <th class="p-1 text-center text-sm">Total</th>
                <th class="p-1 text-center text-sm">Advance</th>
                <th class="p-1 text-center text-sm">Due</th>
                <th class="p-1 text-center text-sm">Status</th>
                <th class="p-1 text-center">...</th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white odd:bg-gray-100">
                <td class="p-1 text-center text-xs">1</td>
                <td class="p-1 text-left text-xs">1688272740</td>
                <td class="p-1 text-left text-xs">Md Majadul Islam</td>
                <td class="p-1 text-left text-xs">01412-345324</td>
                <td class="p-1 text-left text-xs">4</td>
                <td class="p-1 text-left text-xs">1200</td>
                <td class="p-1 text-left text-xs">50</td>
                <td class="p-1 text-center text-xs">1150</td>
                <td class="p-1 text-center text-xs">150</td>
                <td class="p-1 text-center text-xs">100</td>
                <td class="p-1 text-center text-xs">Pending</td>
                <td class="p-1 text-xs grid text-center justify-items-center">
                  <div class="flex">
                    <NuxtLink
                      class="bg-cyan-400 p-1 text-white rounded"
                      to="/order/details"
                    >
                      <Icon name="mdi:eye" width="1.4em" height="1.4em" />
                    </NuxtLink>
                    <NuxtLink
                      class="p-1 text-white rounded bg-red-500 ml-1"
                      to="/order/paymentinfo"
                    >
                      <Icon
                        name="material-symbols:print-rounded"
                        width="1.4em"
                        height="1.4em"
                      />
                    </NuxtLink>
                  </div>
                </td>
              </tr>

              <tr class="bg-white odd:bg-gray-100">
                <td class="p-1 text-center text-xs">2</td>
                <td class="p-1 text-left text-xs">1688272740</td>
                <td class="p-1 text-left text-xs">Md Majadul Islam</td>
                <td class="p-1 text-left text-xs">01412-345324</td>
                <td class="p-1 text-left text-xs">4</td>
                <td class="p-1 text-left text-xs">1200</td>
                <td class="p-1 text-left text-xs">50</td>
                <td class="p-1 text-center text-xs">1150</td>
                <td class="p-1 text-center text-xs">150</td>
                <td class="p-1 text-center text-xs">100</td>
                <td class="p-1 text-center text-xs">Pending</td>
                <td class="p-1 text-xs grid text-center justify-items-center">
                  <div class="flex">
                    <NuxtLink
                      class="bg-cyan-400 p-1 text-white rounded"
                      to="/order/details"
                    >
                      <Icon name="mdi:eye" width="1.4em" height="1.4em" />
                    </NuxtLink>
                    <NuxtLink
                      class="p-1 text-white rounded bg-red-500 ml-1"
                      to="/order/details"
                    >
                      <Icon
                        name="material-symbols:print-rounded"
                        width="1.4em"
                        height="1.4em"
                      />
                    </NuxtLink>
                  </div>
                </td>
              </tr>

              <tr class="bg-white odd:bg-gray-100">
                <td class="p-1 text-center text-xs">3</td>
                <td class="p-1 text-left text-xs">1688272740</td>
                <td class="p-1 text-left text-xs">Md Majadul Islam</td>
                <td class="p-1 text-left text-xs">01412-345324</td>
                <td class="p-1 text-left text-xs">4</td>
                <td class="p-1 text-left text-xs">1200</td>
                <td class="p-1 text-left text-xs">50</td>
                <td class="p-1 text-center text-xs">1150</td>
                <td class="p-1 text-center text-xs">150</td>
                <td class="p-1 text-center text-xs">100</td>
                <td class="p-1 text-center text-xs">Pending</td>
                <td class="p-1 text-xs grid text-center justify-items-center">
                  <div class="flex">
                    <NuxtLink
                      class="bg-cyan-400 p-1 text-white rounded"
                      to="/order/details"
                    >
                      <Icon name="mdi:eye" width="1.4em" height="1.4em" />
                    </NuxtLink>
                    <NuxtLink
                      class="p-1 text-white rounded bg-red-500 ml-1"
                      to="/order/paymentinfo"
                    >
                      <Icon
                        name="material-symbols:print-rounded"
                        width="1.4em"
                        height="1.4em"
                      />
                    </NuxtLink>
                  </div>
                </td>
              </tr>

              <tr class="bg-white odd:bg-gray-100">
                <td class="p-1 text-center text-xs">4</td>
                <td class="p-1 text-left text-xs">1688272740</td>
                <td class="p-1 text-left text-xs">Md Majadul Islam</td>
                <td class="p-1 text-left text-xs">01412-345324</td>
                <td class="p-1 text-left text-xs">4</td>
                <td class="p-1 text-left text-xs">1200</td>
                <td class="p-1 text-left text-xs">50</td>
                <td class="p-1 text-center text-xs">1150</td>
                <td class="p-1 text-center text-xs">150</td>
                <td class="p-1 text-center text-xs">100</td>
                <td class="p-1 text-center text-xs">Pending</td>
                <td class="p-1 text-xs grid text-center justify-items-center">
                  <div class="flex">
                    <NuxtLink
                      class="bg-cyan-400 p-1 text-white rounded"
                      to="/order/details"
                    >
                      <Icon name="mdi:eye" width="1.4em" height="1.4em" />
                    </NuxtLink>
                    <NuxtLink
                      class="p-1 text-white rounded bg-red-500 ml-1"
                      to="/order/paymentinfo"
                    >
                      <Icon
                        name="material-symbols:print-rounded"
                        width="1.4em"
                        height="1.4em"
                      />
                    </NuxtLink>
                  </div>
                </td>
              </tr>

              <tr class="bg-white odd:bg-gray-100">
                <td class="p-1 text-center text-xs">5</td>
                <td class="p-1 text-left text-xs">1688272740</td>
                <td class="p-1 text-left text-xs">Md Majadul Islam</td>
                <td class="p-1 text-left text-xs">01412-345324</td>
                <td class="p-1 text-left text-xs">4</td>
                <td class="p-1 text-left text-xs">1200</td>
                <td class="p-1 text-left text-xs">50</td>
                <td class="p-1 text-center text-xs">1150</td>
                <td class="p-1 text-center text-xs">150</td>
                <td class="p-1 text-center text-xs">100</td>
                <td class="p-1 text-center text-xs">Pending</td>
                <td class="p-1 text-xs grid text-center justify-items-center">
                  <div class="flex">
                    <NuxtLink
                      class="bg-cyan-400 p-1 text-white rounded"
                      to="/order/details"
                    >
                      <Icon name="mdi:eye" width="1.4em" height="1.4em" />
                    </NuxtLink>
                    <NuxtLink
                      class="p-1 text-white rounded bg-red-500 ml-1"
                      to="/order/paymentinfo"
                    >
                      <Icon
                        name="material-symbols:print-rounded"
                        width="1.4em"
                        height="1.4em"
                      />
                    </NuxtLink>
                  </div>
                </td>
              </tr>

              <tr class="bg-white odd:bg-gray-100">
                <td class="p-1 text-center text-xs">6</td>
                <td class="p-1 text-left text-xs">1688272740</td>
                <td class="p-1 text-left text-xs">Md Majadul Islam</td>
                <td class="p-1 text-left text-xs">01412-345324</td>
                <td class="p-1 text-left text-xs">4</td>
                <td class="p-1 text-left text-xs">1200</td>
                <td class="p-1 text-left text-xs">50</td>
                <td class="p-1 text-center text-xs">1150</td>
                <td class="p-1 text-center text-xs">150</td>
                <td class="p-1 text-center text-xs">100</td>
                <td class="p-1 text-center text-xs">Pending</td>
                <td class="p-1 text-xs grid text-center justify-items-center">
                  <div class="flex">
                    <NuxtLink
                      class="bg-cyan-400 p-1 text-white rounded"
                      to="/order/details"
                    >
                      <Icon name="mdi:eye" width="1.4em" height="1.4em" />
                    </NuxtLink>
                    <NuxtLink
                      class="p-1 text-white rounded bg-red-500 ml-1"
                      to="/order/paymentinfo"
                    >
                      <Icon
                        name="material-symbols:print-rounded"
                        width="1.4em"
                        height="1.4em"
                      />
                    </NuxtLink>
                  </div>
                </td>
              </tr>

              <tr class="bg-white odd:bg-gray-100">
                <td class="p-1 text-center text-xs">7</td>
                <td class="p-1 text-left text-xs">1688272740</td>
                <td class="p-1 text-left text-xs">Md Majadul Islam</td>
                <td class="p-1 text-left text-xs">01412-345324</td>
                <td class="p-1 text-left text-xs">4</td>
                <td class="p-1 text-left text-xs">1200</td>
                <td class="p-1 text-left text-xs">50</td>
                <td class="p-1 text-center text-xs">1150</td>
                <td class="p-1 text-center text-xs">150</td>
                <td class="p-1 text-center text-xs">100</td>
                <td class="p-1 text-center text-xs">Pending</td>
                <td class="p-1 text-xs grid text-center justify-items-center">
                  <div class="flex">
                    <NuxtLink
                      class="bg-cyan-400 p-1 text-white rounded"
                      to="/order/details"
                    >
                      <Icon name="mdi:eye" width="1.4em" height="1.4em" />
                    </NuxtLink>
                    <NuxtLink
                      class="p-1 text-white rounded bg-red-500 ml-1"
                      to="/order/paymentinfo"
                    >
                      <Icon
                        name="material-symbols:print-rounded"
                        width="1.4em"
                        height="1.4em"
                      />
                    </NuxtLink>
                  </div>
                </td>
              </tr>

              <tr class="bg-white odd:bg-gray-100">
                <td class="p-1 text-center text-xs">8</td>
                <td class="p-1 text-left text-xs">1688272740</td>
                <td class="p-1 text-left text-xs">Md Majadul Islam</td>
                <td class="p-1 text-left text-xs">01412-345324</td>
                <td class="p-1 text-left text-xs">4</td>
                <td class="p-1 text-left text-xs">1200</td>
                <td class="p-1 text-left text-xs">50</td>
                <td class="p-1 text-center text-xs">1150</td>
                <td class="p-1 text-center text-xs">150</td>
                <td class="p-1 text-center text-xs">100</td>
                <td class="p-1 text-center text-xs">Pending</td>
                <td class="p-1 text-xs grid text-center justify-items-center">
                  <div class="flex">
                    <NuxtLink
                      class="bg-cyan-400 p-1 text-white rounded"
                      to="/order/details"
                    >
                      <Icon name="mdi:eye" width="1.4em" height="1.4em" />
                    </NuxtLink>
                    <NuxtLink
                      class="p-1 text-white rounded bg-red-500 ml-1"
                      to="/order/paymentinfo"
                    >
                      <Icon
                        name="material-symbols:print-rounded"
                        width="1.4em"
                        height="1.4em"
                      />
                    </NuxtLink>
                  </div>
                </td>
              </tr>

              <tr class="bg-white odd:bg-gray-100">
                <td class="p-1 text-center text-xs">9</td>
                <td class="p-1 text-left text-xs">1688272740</td>
                <td class="p-1 text-left text-xs">Md Majadul Islam</td>
                <td class="p-1 text-left text-xs">01412-345324</td>
                <td class="p-1 text-left text-xs">4</td>
                <td class="p-1 text-left text-xs">1200</td>
                <td class="p-1 text-left text-xs">50</td>
                <td class="p-1 text-center text-xs">1150</td>
                <td class="p-1 text-center text-xs">150</td>
                <td class="p-1 text-center text-xs">100</td>
                <td class="p-1 text-center text-xs">Pending</td>
                <td class="p-1 text-xs grid text-center justify-items-center">
                  <div class="flex">
                    <NuxtLink
                      class="bg-cyan-400 p-1 text-white rounded"
                      to="/order/details"
                    >
                      <Icon name="mdi:eye" width="1.4em" height="1.4em" />
                    </NuxtLink>
                    <NuxtLink
                      class="p-1 text-white rounded bg-red-500 ml-1"
                      to="/order/paymentinfo"
                    >
                      <Icon
                        name="material-symbols:print-rounded"
                        width="1.4em"
                        height="1.4em"
                      />
                    </NuxtLink>
                  </div>
                </td>
              </tr>

              <tr class="bg-white odd:bg-gray-100">
                <td class="p-1 text-center text-xs">10</td>
                <td class="p-1 text-left text-xs">1688272740</td>
                <td class="p-1 text-left text-xs">Md Majadul Islam</td>
                <td class="p-1 text-left text-xs">01412-345324</td>
                <td class="p-1 text-left text-xs">4</td>
                <td class="p-1 text-left text-xs">1200</td>
                <td class="p-1 text-left text-xs">50</td>
                <td class="p-1 text-center text-xs">1150</td>
                <td class="p-1 text-center text-xs">150</td>
                <td class="p-1 text-center text-xs">100</td>
                <td class="p-1 text-center text-xs">Pending</td>
                <td class="p-1 text-xs grid text-center justify-items-center">
                  <div class="flex">
                    <NuxtLink
                      class="bg-cyan-400 p-1 text-white rounded"
                      to="/order/details"
                    >
                      <Icon name="mdi:eye" width="1.4em" height="1.4em" />
                    </NuxtLink>
                    <NuxtLink
                      class="p-1 text-white rounded bg-red-500 ml-1"
                      to="/order/paymentinfo"
                    >
                      <Icon
                        name="material-symbols:print-rounded"
                        width="1.4em"
                        height="1.4em"
                      />
                    </NuxtLink>
                  </div>
                </td>
              </tr>

              <tr class="bg-white odd:bg-gray-100">
                <td class="p-1 text-center text-xs">11</td>
                <td class="p-1 text-left text-xs">1688272740</td>
                <td class="p-1 text-left text-xs">Md Majadul Islam</td>
                <td class="p-1 text-left text-xs">01412-345324</td>
                <td class="p-1 text-left text-xs">4</td>
                <td class="p-1 text-left text-xs">1200</td>
                <td class="p-1 text-left text-xs">50</td>
                <td class="p-1 text-center text-xs">1150</td>
                <td class="p-1 text-center text-xs">150</td>
                <td class="p-1 text-center text-xs">100</td>
                <td class="p-1 text-center text-xs">Pending</td>
                <td class="p-1 text-xs grid text-center justify-items-center">
                  <div class="flex">
                    <NuxtLink
                      class="bg-cyan-400 p-1 text-white rounded"
                      to="/order/details"
                    >
                      <Icon name="mdi:eye" width="1.4em" height="1.4em" />
                    </NuxtLink>
                    <NuxtLink
                      class="p-1 text-white rounded bg-red-500 ml-1"
                      to="/order/paymentinfo"
                    >
                      <Icon
                        name="material-symbols:print-rounded"
                        width="1.4em"
                        height="1.4em"
                      />
                    </NuxtLink>
                  </div>
                </td>
              </tr>

              <tr class="bg-white odd:bg-gray-100">
                <td class="p-1 text-center text-xs">12</td>
                <td class="p-1 text-left text-xs">1688272740</td>
                <td class="p-1 text-left text-xs">Md Majadul Islam</td>
                <td class="p-1 text-left text-xs">01412-345324</td>
                <td class="p-1 text-left text-xs">4</td>
                <td class="p-1 text-left text-xs">1200</td>
                <td class="p-1 text-left text-xs">50</td>
                <td class="p-1 text-center text-xs">1150</td>
                <td class="p-1 text-center text-xs">150</td>
                <td class="p-1 text-center text-xs">100</td>
                <td class="p-1 text-center text-xs">Pending</td>
                <td class="p-1 text-xs grid text-center justify-items-center">
                  <div class="flex">
                    <NuxtLink
                      class="bg-cyan-400 p-1 text-white rounded"
                      to="/order/details"
                    >
                      <Icon name="mdi:eye" width="1.4em" height="1.4em" />
                    </NuxtLink>
                    <NuxtLink
                      class="p-1 text-white rounded bg-red-500 ml-1"
                      to="/order/paymentinfo"
                    >
                      <Icon
                        name="material-symbols:print-rounded"
                        width="1.4em"
                        height="1.4em"
                      />
                    </NuxtLink>
                  </div>
                </td>
              </tr>

              <tr class="bg-white odd:bg-gray-100">
                <td class="p-1 text-center text-xs">13</td>
                <td class="p-1 text-left text-xs">1688272740</td>
                <td class="p-1 text-left text-xs">Md Majadul Islam</td>
                <td class="p-1 text-left text-xs">01412-345324</td>
                <td class="p-1 text-left text-xs">4</td>
                <td class="p-1 text-left text-xs">1200</td>
                <td class="p-1 text-left text-xs">50</td>
                <td class="p-1 text-center text-xs">1150</td>
                <td class="p-1 text-center text-xs">150</td>
                <td class="p-1 text-center text-xs">100</td>
                <td class="p-1 text-center text-xs">Pending</td>
                <td class="p-1 text-xs grid text-center justify-items-center">
                  <div class="flex">
                    <NuxtLink
                      class="bg-cyan-400 p-1 text-white rounded"
                      to="/order/details"
                    >
                      <Icon name="mdi:eye" width="1.4em" height="1.4em" />
                    </NuxtLink>
                    <NuxtLink
                      class="p-1 text-white rounded bg-red-500 ml-1"
                      to="/order/paymentinfo"
                    >
                      <Icon
                        name="material-symbols:print-rounded"
                        width="1.4em"
                        height="1.4em"
                      />
                    </NuxtLink>
                  </div>
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
        header="Transaction Filter"
        position="right"
      >
        <div class="w-full">
          <label for="dd-city" class="text-sm w-full">All</label>
          <input
            type="text"
            v-model="value"
            class="w-full text-sm border py-1 px-2 outline-none focus:border-red-200 rounded-md"
            placeholder="All"
          />
        </div>
        <div class="w-full">
          <label for="dd-city" class="text-sm w-full">Name</label>
          <input
            type="text"
            v-model="value"
            class="w-full text-sm border py-1 px-2 outline-none focus:border-red-200 rounded-md"
            placeholder="Enter Name"
          />
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
        <!-- size & Category-->
        <div class="w-full grid grid-cols-2 gap-2 mt-2">
          <div>
            <label for="dd-city" class="text-sm w-full">Size</label>
            <Dropdown
              v-model="selectedSize"
              :options="sizes"
              optionLabel="name"
              placeholder="Select Category"
              class="text-sm border m-0 outline-none focus:border-red-200 rounded-md"
            />
          </div>
          <div>
            <label for="dd-city" class="text-sm w-full">Category</label>
            <Dropdown
              v-model="selectedCategory"
              :options="Categories"
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
            <Dropdown
              v-model="selectedBrand"
              :options="brands"
              filter
              optionLabel="name"
              placeholder="Select a Country"
              class="w-full md:w-14rem"
            >
              <template #value="slotProps">
                <div v-if="slotProps.value" class="flex align-items-center">
                  <img
                    :alt="slotProps.value.label"
                    src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                    :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`"
                    style="width: 18px"
                  />
                  <div>{{ slotProps.value.name }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="flex align-items-center">
                  <img
                    :alt="slotProps.option.label"
                    src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                    :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`"
                    style="width: 18px"
                  />
                  <div>{{ slotProps.option.name }}</div>
                </div>
              </template>
            </Dropdown>
          </div>
          <div>
            <label for="dd-city" class="text-sm w-full">Vendor</label>
            <Dropdown
              v-model="selectedVendor"
              :options="vendors"
              filter
              optionLabel="name"
              placeholder="Select a Country"
              class="w-full md:w-14rem"
            >
              <template #value="slotProps">
                <div v-if="slotProps.value" class="flex align-items-center">
                  <img
                    :alt="slotProps.value.label"
                    src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                    :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`"
                    style="width: 18px"
                  />
                  <div>{{ slotProps.value.name }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="flex align-items-center">
                  <img
                    :alt="slotProps.option.label"
                    src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                    :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`"
                    style="width: 18px"
                  />
                  <div>{{ slotProps.option.name }}</div>
                </div>
              </template>
            </Dropdown>
          </div>
          <div></div>
        </div>

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

<style>
span.p-dropdown-label.p-inputtext.p-placeholder {
  padding: 0px;
  margin: 0px;
}
span.p-dropdown-label.p-inputtext {
  padding: 0px;
  font-size: 15px;
  font-weight: 500;
  color: #767676d1;
}
</style>
