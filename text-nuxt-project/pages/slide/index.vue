<script setup>
import InputGroup from 'primevue/inputgroup';
import Sidebar from 'primevue/sidebar';
import Paginator from 'primevue/paginator';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

// Define all the Variables
const visibleRight = ref(false);
const pageNumber = ref(1);
const layout = 'dashboard';
const store = useSlideStore();
const slideData = computed(() => store.slides);
const pagination = computed(() => store.pagination);
const isLoading = ref('success');
const deleteModalVisible = ref(false);
const deleteLoading = ref(false);
const selectedSlideId = ref(null); // Track the selected slide ID for deletion

// Initialize Toast
const toast = useToast();

// On Load or Reload Get New Updated Data
const loadSlides = async () => {
  isLoading.value = 'Loading';
  await store.getAllSlides(pageNumber.value, store.pagination.perPage);
  slideData.value = store.slides;
  isLoading.value = 'success';
};

// Ensure data is loaded before the component mounts
onBeforeMount(async () => {
  await loadSlides();
});

// Watch for changes in the store slides and update slideData accordingly
watch(
  () => store.slides,
  (newSlides) => {
    slideData.value = newSlides;
  }
);

// Watch PageNumber Change
watch(pageNumber, (newPage) => {
  isLoading.value = 'loading';
  store.getAllSlides(newPage, pagination.value.perPage);
  isLoading.value = 'success';
});

// OnPage Change Get New Data
const onPageChange = (event) => {
  pageNumber.value = event.page + 1;
  store.getAllSlides(pageNumber.value, pagination.value.perPage);
};

// On Search Get New Slides Data
const handleSearch = () => {
  pageNumber.value = 1;
  store.getAllSlides(pageNumber.value, store.pagination.perPage);
};

// On Apply Filter Get New Slides Data
const goToPage = (page) => {
  if (page > 0 && page <= pagination.value.totalPages) {
    pageNumber.value = page;
    store.getAllSlides(pageNumber.value, pagination.value.perPage);
  }
};

// Handle Delete Slide
const handleDelete = async () => {
  deleteLoading.value = true;
  const result = await store.deleteSlide(selectedSlideId.value);
  console.log(result);
  deleteLoading.value = false;
  deleteModalVisible.value = false;
  toast.add({
    severity: result.success ? 'success' : 'error',
    summary: result.success ? 'Success' : 'Error',
    detail: result.message,
    life: 3000,
  });
  // Reload the slides after deletion
  if (result.success) {
    await loadSlides();
  }
};

// Open the delete modal for the specific slide
const openDeleteModal = (slideId) => {
  selectedSlideId.value = slideId;
  deleteModalVisible.value = true;
};

</script>

<template>
  <NuxtLayout :name="layout">
  <!-- Loading Indicator -->
    <Spiner :loading="isLoading"/>
    <div class="w-full px-3 mt-1">
      <div class="shadow-md bg-white w-full h-[calc(100vh-6rem)] overflow-hidden rounded-md">
        <!-- Header with Back, Filter, and Add Buttons -->
        <div class="flex w-full justify-between bg-gray-400 text-white">
          <div class="font-semibold mt-1 ml-3">Slides</div>
          <div class="font-semibold ml-1 flex">
            <button @click="$router.back()" :disabled="pageNumber === 1" class="bg-[#800] hover:bg-red-500 text-gray-100 hover:text-black px-4 py-1 text-sm transition delay-100">
              <Icon name="gg:arrow-left-o"></Icon>
              Back
            </button>
            <button class="bg-blue-600 hover:bg-blue-500 text-gray-100 transform hover:text-black px-4 py-1 text-sm" @click="visibleRight = true">
              <Icon name="iconoir:filter-solid"></Icon>
              Filter
            </button>
            <NuxtLink to="slide/create" class="bg-cyan-600 hover:bg-cyan-500 text-gray-100 hover:text-black px-4 py-2 text-sm rounded-rt-sm">
              <Icon name="zondicons:add-outline"></Icon>
              Add
            </NuxtLink>
          </div>
        </div>

        <!-- Table listing slides -->
        <div class="h-[calc(100vh-10.4rem)] overflow-y-auto border-b px-3 pt-3">
          <table class="table-fixed w-full">
            <!-- Table Headers -->
            <thead>
              <tr class="w-full bg-gray-300 text-sm">
                <th class="p-1 text-left text-sm w-8">SL</th>
                <th class="p-1 text-left text-sm w-12">Icon</th>
                <th class="p-1 text-left text-sm">Name</th>
                <th class="p-1 text-left text-sm w-48">Description</th>
                <th class="p-1 text-left">Status</th>
                <th class="p-1 text-left">Created Date</th>
                <th class="p-1 text-center">Created By</th>
                <th class="p-1 text-center w-24">Actions</th>
              </tr>
            </thead>

            <!-- Table Body -->
            <tbody>
              <tr v-for="slide in slideData" :key="slide.unique_id" class="bg-white odd:bg-gray-100">
                <!-- Serial ID -->
                <td class="p-1 text-center text-xs">{{ slide.id }}</td>
                <!-- Icon -->
                <td class="p-1 text-left text-xs">
                  <img :src="slide.icon" alt="Icon" class="w-12 h-12" v-if="slide.icon" />
                  <span v-else>No Icon</span>
                </td>
                <!-- Name -->
                <td class="p-1 text-left text-xs">{{ slide.name }}</td>
                <!-- Description -->
                <td class="p-1 text-left text-xs">{{ slide.description }}</td>
                <!-- Status -->
                <td class="p-1 text-left text-xs">{{ slide.status === 1 ? 'Active' : 'Inactive' }}</td>
                <!-- Created Date -->
                <td class="p-1 text-left text-xs">{{ slide.created_at }}</td>
                <!-- Created By -->
                <td class="p-1 text-center text-xs">{{ slide.created_by }}</td>
                <!-- Actions -->
                <td class="p-1 text-center text-xs flex">
                  <div class="rounded-md bg-cyan-400 p-1 text-white" title="View">
                    <Icon name="mdi:eye" width="1.4em" height="1.4em" />
                  </div>
                  <div class="rounded-md mx-1 bg-yellow-500 p-1 text-white" title="Edit">
                    <NuxtLink :to="`/slide/edit/${slide.unique_id}`">
                      <Icon name="subway:pencil" width="1.4em" height="1.4em" />
                    </NuxtLink>
                  </div>
                  <Button @click="openDeleteModal(slide.id)" class="rounded-md bg-red-600 p-1 text-white" title="Delete">
                    <Icon name="bxs:trash" width="1.4em" height="1.4em" />
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Table Footer-->
        <div class="order_title text-sm flex justify-between h-full">
          <!-- Search Box -->
          <div class="mt-[2px] ml-3">
            <InputGroup>
              <input type="number" v-model="pageNumber" @keyup.enter="goToPage(pageNumber)" class="border border-r-0 p-1 focus:outline-none" placeholder="Page Number" />
              <icon class="text-3xl bg-gray-200 px-2 w-12 rounded-r cursor-pointer" name="nonicons:go-16" color="#000" @click="goToPage(pageNumber)" />
            </InputGroup>
          </div>
          <!-- Pagination -->
          <div class="flex">
            <Paginator 
              :first="(pageNumber - 1) * store.pagination.perPage"
              :rows="store.pagination.perPage"
              :totalRecords="store.pagination.totalItems"
              :pageLinkSize="5"
              :currentPage="pageNumber - 1"
              @page="onPageChange"
            />
          </div>
        </div>

        <!-- Sidebar for filtering slides -->
        <Sidebar v-model:visible="visibleRight" header="Slide Filter" position="right">
          <div class="w-full">
            <label for="slideName" class="text-sm w-full">Slide Name</label>
            <input type="text" v-model="slideName" @input="handleSearch" class="w-full text-sm border py-1 px-2 outline-none focus:border-red-200 rounded-md" placeholder="Slide Name" />
          </div>
          <div class="w-full mt-2">
            <label for="status" class="text-sm w-full">Status</label>
            <select v-model="status" @change="handleSearch" name="status" id="status" class="w-full text-sm border py-1 px-2 outline-none focus:border-red-200 rounded-md">
              <option value="">All</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>
          <div class="font-semibold flex mt-2 place-content-end">
            <button class="bg-blue-600 hover:bg-blue-500 text-gray-100 transform hover:text-black px-4 py-1 text-sm rounded-md" @click="applyFilter">
              <Icon name="fluent:search-12-filled"></Icon>
              Search
            </button>
          </div>
        </Sidebar>

        <!-- Delete Modal -->
        <Dialog v-model:visible="deleteModalVisible" modal header="Delete Slide" :style="{ width: '25rem' }">
          <span class="p-text-secondary flex items-center justify-center flex-col mb-5">
            <Icon name="material-symbols:delete-sweep-rounded" width="120px" height="120px" class="mr-2 text-red-500" />
            Are you sure you want to delete this slide?
          </span>
          <div class="flex justify-around">
            <Button class="bg-yellow-600 text-red-100 px-4 py-2" type="button" label="Cancel" severity="secondary" @click="deleteModalVisible = false"></Button>
            <Button class="bg-red-600 text-red-100 px-4 py-2" type="button" label="Delete" @click="handleDelete" :loading="deleteLoading"></Button>
          </div>
        </Dialog>

        <Toast />
      </div>
    </div>
  </NuxtLayout>
</template>

<style>
button.p-paginator-page.p-paginator-element.p-link.p-highlight {
  background-color: #fff;
  color: #ef4444;
  border-top: 3px solid #ef4444;
  border-radius: 0px;
}
.p-paginator.p-component {
  padding: 0px;
}
</style>
