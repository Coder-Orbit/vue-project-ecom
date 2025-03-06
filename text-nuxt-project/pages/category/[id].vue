<script setup>
import Dropdown from 'primevue/dropdown';
import FileUpload from 'primevue/fileupload';
import Fieldset from 'primevue/fieldset';



//Define Page Meta
definePageMeta({
    layout: "dashboard",
    middleware: "auth",
})
// Initialize router and route
const router = useRouter();
//Initialize Store
const CategoryStore = useCategoryStore();
const Category = ref({});
const allCategories = ref([]);
// Extra fields
const extraProps = ref('');
const extraFields = ref([]);
const loading = ref('Stop');
const toast = useToast();
//cat
const selectedCategory = ref({})
// Assume you have a dynamic route with the slide ID
const Id = router.currentRoute.value.params.id;
//All Slide data
const CategoryIcon = ref('');
const CategoryBanner = ref('');
const CategoryThumbnail = ref('');

const onlyCategory = computed(() => {
    return [{
        fieldName: "categories",
        fieldValue: JSON.stringify(selectedCategory.value)
    }];
});

watch(selectedCategory, (newValue) => {
    console.log("Updated selectedCategory:", newValue);
    updateCategoryField();
});


const updateCategoryField = () => {
    extraProps.value = {
        ...extraProps.value,
        categories: Array.isArray(selectedCategory.value) ? selectedCategory.value : [selectedCategory.value] 
    };
};

const mergeExtraProps = () => {
    extraProps.value = {
        ...extraProps.value,
        ...onlyCategory.value.reduce((acc, category) => {
            acc[JSON.stringify(category.fieldName)] = JSON.stringify(category.fieldValue);
            return acc;
        }, {})
    };
};

// Fetch Categories before Mount
onBeforeMount(async () => {
    await CategoryStore.getCategoryList();
    allCategories.value = CategoryStore.CategoryList.map((category) => ({
        name: category.name,
        id: category.id,
    }));
});

// Add extra field function goes here
const addMoreField = () => {
    extraFields.value = [
        ...extraFields.value, {
            fieldName: "",
            fieldValue: "",
        }
    ];
}

// Remove extra field
const removeMoreField = (index) => {
    extraFields.value.splice(index, 1);
}

//handle File Upload
const handleFileUpload = (event, type) => {
  const file = event.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      if (type === 'icon') CategoryIcon.value = reader.result;
      if (type === 'banner') CategoryBanner.value = reader.result;
      if (type === 'thumbnail') CategoryThumbnail.value = reader.result;
    };
    reader.readAsDataURL(file);
  }
};

onMounted(async () => {
    loading.value = 'Success';
    try {
        // Fetch category data
        const data = await CategoryStore.getSingleCategory(Id);
        Category.value = data.data;
        console.log(Category.value)

        // Check if extend_props exists and is a string
        if (data.data.extend_props) {
            // If extend_props is a string, parse it into an object
            if (typeof data.data.extend_props === "string") {
                try {
                    data.data.extend_props = data.data.extend_props; // Parse string to object
                } catch (error) {
                    console.error("Error parsing extend_props string:", error);
                    data.data.extend_props = {}; // Fallback to an empty object if parsing fails
                }
            }

            // Map extend_props to extraFields
            extraFields.value = Object.entries(data.data.extend_props).map(([key, value]) => ({
                fieldName: key,
                fieldValue: value,
            }));

            // Optionally, you can convert extend_props back to string if you're sending it somewhere
            data.data.extend_props = data.data.extend_props;  // Convert object back to string
        }

        // Process categories field from extraFields if available
        if (extraFields.value.length > 0) {
            let categoryField = extraFields.value.find(item => item.fieldName === "categories");

            if (categoryField && categoryField.fieldValue) {
                // If it's an array, select the first category
                if (Array.isArray(categoryField.fieldValue)) {
                    selectedCategory.value = categoryField.fieldValue.length > 0 ? categoryField.fieldValue[0] : {};
                }
                // If it's an object, set it as selected category
                else if (typeof categoryField.fieldValue === "object") {
                    selectedCategory.value = categoryField.fieldValue;
                }
                // Fallback to an empty object if no valid value found
                else {
                    selectedCategory.value = {};
                    selectedCategory.value = JSON.parse(categoryField.fieldValue);
                }
            }
        }

        console.log("Selected Category:", selectedCategory.value);

    } catch (error) {
        console.error("Error fetching category:", error);
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to load Category data.',
            life: 3000,
        });
    } finally {
        loading.value = 'Stop';
    }
});

//Data Submit
const dataSubmit = async () => {
    mergeExtraProps();
    
    loading.value = 'Success';
    extraFields.value.forEach((item, index) => {
        extraProps.value = { ...extraProps.value, [item.fieldName]: item.fieldValue };
    });
    //from data
    const CategoryData = reactive({
        name: Category.value.name,
        commission: Category.value.commission,
        commission_type: Category.value.commission_type,
        description: Category.value.description,
        status: Category.value.status,
        // parent_id:selectedCategory.value,
        icon: CategoryIcon.value,
        banner: CategoryBanner.value,
        thumbnail: CategoryThumbnail.value,
        extend_props: extraProps.value,
        id: Id,
    })
    console.log("extraProps.value:", extraProps.value);

    loading.value = 'stop';
    //Submit Data
    try {

        const result = await CategoryStore.updateCategory(CategoryData);

        console.log(result);
        if (result.success) {
            toast.add({
                severity: 'success',
                summary: 'Category Created',
                detail: result.message || 'Category was updated successfully.',
                life: 2000,
            });

            setTimeout(() => {
                router.push('/category');
            }, 2000);
        } else {
            toast.add({
                severity: 'success',
                summary: 'Category Created',
                detail: 'Category was updated successfully.',
                life: 2000,
            });
        }

    } catch (error) {
        
    }
}
onMounted(() => {
    CategoryStore.fetchCategories(); // Fetch categories when component mounts
});

// Compute the transformed category list dynamically
const categories = computed(() => {
    // console.log("API Response:", CategoryStore.categories);
    return transformCategories(CategoryStore.cat);
});

// Recursive function to transform categories
const transformCategories = (categories) => {
    if (!categories || categories.length === 0) return [];

    return categories.map(category => ({
        // name: category.name || `Category ${category.id}`,
        id: category.id,
        name: category.name || `Category ${category.id}`,
        categories: category.categories && category.categories.length > 0 ? transformCategories(category.categories) : []
    }));
};
</script>
<template>
    <NuxtLayout :name="layout">
        <Toast />
        <Spiner v-if="loading === 'Success'" />
        <div class="w-full px-3 mt-1">

            <div class="shadow-md bg-white w-full h-[calc(100vh-6rem)] overflow-hidden rounded-md">
                <!--Header-->
                <div class="flex w-full justify-between  bg-gray-400 text-white">

                    <div class="font-semibold mt-1 ml-3">Edit Category</div>
                    <div class="font-semibold ml-1 flex">
                        <button @click="$router.back()"
                            class="bg-[#800] hover:bg-red-500 text-gray-100 hover:text-black px-4 py-2 text-sm rounded-tr-sm">
                            <Icon name="gg:arrow-left-o"></Icon>
                            Back
                        </button>
                    </div>

                </div>
                <!-- Body Content goes here -->
                <div class=" h-[calc(100vh-8rem)] overflow-y-auto border-b px-3 pt-2">
                    <div class="flex w-full justify-center">
                        <div class="w-1/2">
                            <form @submit.prevent="dataSubmit">
                                <div class="grid grid-cols-2 gap-2">
                                    <div class="w-full">
                                        <label for="dd-city" class="text-sm w-full">Category Name</label>
                                        <input type="text" v-model="Category.name"
                                            class="w-full text-sm border py-1 px-2 outline-none focus:border-red-200 rounded-md"
                                            placeholder="Category Name" />
                                    </div>
                                    <div class="w-full">
                                        <label for="dd-city" class="text-sm">Parent Category</label>
                                        <!-- <Dropdown :pt="{
                                            root: {
                                                class: 'text-sm w-full py-1 px-2 border outline-red-200 active:bg-gray-100'
                                            },

                                            filterInput: {
                                                class: 'active:bg-gray-100 py-1 px-2 border mb-2'
                                            },

                                            item: {
                                                class: 'hover:bg-red-100'
                                            },

                                            itemLabel: {
                                                class: 'focus:bg-red-600'
                                            },

                                        }" v-model="selectedCategory" editable :options="allCategories" optionLabel="name" @change="OnInputChange"
                                            optionValue="id" placeholder="Select a Category" /> -->

                                            <CascadeSelect
                                                v-model="selectedCategory"
                                                :options="categories"
                                                optionLabel="name"
                                                optionVale="id"
                                                optionGroupLabel="name"
                                                optionGroupValue="id"
                                                :optionGroupChildren="['categories']"
                                                style="min-width: 14rem"
                                                placeholder="Select a Nested Category"
                                                filter
                                                :pt="{
                                                    root: { class: 'text-sm w-full py-0 px-2 border outline-red-200 active:bg-gray-100' },
                                                    filterInput: { class: 'active:bg-gray-100 py-1 px-2 border mb-4' },
                                                    item: { class: 'hover:bg-red-100' },
                                                    itemLabel: { class: 'focus:bg-red-600' }
                                                }"
                                                >
                                                <template #option="slotProps">
                                                    <div class="flex align-items-center">
                                                        <span>{{ slotProps.option.name }}</span>
                                                    </div>
                                                </template>
                                            </CascadeSelect>
                                    </div>
                                </div>

                                <div class="grid grid-cols-3 gap-2 mt-2">
                                    <div class="w-full">
                                        <label for="dd-city" class="text-sm w-full">Category Icon</label>
                                        <FileUpload :pt="{
                                            chooseButton: {
                                                class: 'py-1 h-8 overflow-hidden w-full bg-gray-400',
                                            },


                                        }" mode="basic" name="icon" accept="image/*" @select="(event) => handleFileUpload(event, 'icon')" />
                                    </div>
                                    <div class="w-full">
                                        <label for="dd-city" class="text-sm w-full">Category Banner</label>
                                        <FileUpload :pt="{
                                            chooseButton: {
                                                class: 'py-1 h-8 overflow-hidden w-full bg-gray-400',
                                            },


                                        }" mode="basic" name="banner" accept="image/*" @select="(event) => handleFileUpload(event, 'banner')" />
                                    </div>
                                    <div class="w-full">
                                        <label for="dd-city" class="text-sm w-full">Category Thumbnail</label>
                                        <FileUpload :pt="{
                                            chooseButton: {
                                                class: 'py-1 h-8 overflow-hidden w-full bg-gray-400',
                                            },


                                        }" mode="basic" name="thumbnail" accept="image/*" @select="(event) => handleFileUpload(event, 'thumbnail')" />
                                    </div>
                                </div>

                                <!-- comission tab -->
                                <div class="grid grid-cols-3 gap-2 mt-2">
                                    <div class="w-full">
                                        <label for="dd-city" class="text-sm w-full">Commission</label>
                                        <input type="number" v-model="Category.commission"
                                            class="w-full text-sm border py-1 px-2 outline-none focus:border-red-200 rounded-md"
                                            placeholder="Commission" />
                                    </div>
                                    <div class="w-full">
                                        <label for="dd-city" class="text-sm w-full">Commission Type</label>
                                        <select name="commission_type" id="commission_type" v-model="Category.commission_type"
                                            class="w-full text-sm border py-1 px-2 outline-none focus:border-red-200 rounded-md">
                                            <option value="fixed"> Fixed</option>
                                            <option value="parcentage"> Parcentage</option>
                                        </select>
                                    </div>
                                    <div class="w-full">
                                        <label for="dd-city" class="text-sm w-full">Status</label>
                                        <select name="status" id="commission_type" v-model="Category.status"
                                            class="w-full text-sm border py-1 px-2 outline-none focus:border-red-200 rounded-md">
                                            <option value="1"> Active</option>
                                            <option value="0"> Inactive</option>
                                        </select>
                                    </div>
                                </div>

                                <!-- dynamic field -->
                                <div class="grid grid-col gap-2 mt-2">
                                    <Fieldset legend="Extra Props" :pt="{
                                        root: {
                                            class: 'border p-2'
                                        },
                                        legend: {
                                            class: 'p-0 m-0'
                                        },
                                        togglerIcon: {

                                        }
                                    }">
                                        <template #legend>
                                            <div class="flex align-items-center pl-2">
                                                <div class="m-1 border rounded-md px-2 text-xs pt-2 bg-cyan-500 text-white cursor-pointer"
                                                    @click="addMoreField">Add More <Icon name="mdi:table-add"
                                                        width="1.4em" height="1.4em"></Icon>
                                                </div>
                                                <span class="font-bold">Extra Props</span>
                                            </div>
                                        </template>

                                        <div class="flex w-full px-2 py-1" v-for="(extra, index) in extraFields" :key="index">
                                            <div class="flex" v-if="extra.fieldName !== 'categories'">
                                                <div class="w-full mr-2">
                                                    <label for="dd-citwy" class="text-sm w-full"
                                                        title="Use field name like: filedName, field_name or filedname">
                                                        Field Name <Icon name="clarity:info-solid"></Icon></label>
                                                    <input type="text" v-model="extra.fieldName"
                                                        class="w-full text-sm border py-1 px-2 outline-none focus:border-red-200 rounded-md"
                                                        placeholder="Field Name" />
                                                </div>
                                                <div class="w-full mr-2">
                                                    <label for="dd-citye" class="text-sm w-full"> Field Value</label>
                                                    <input type="text" v-model="extra.fieldValue"
                                                        class="w-full text-sm border py-1 px-2 outline-none focus:border-red-200 rounded-md"
                                                        placeholder="Field Value" />
                                                </div>
                                                <div class="bg-red-500 h-8 flex place-items-center p-2 rounded-md mt-[1.4rem] cursor-pointer"
                                                    @click="removeMoreField(index)">
                                                    <Icon class="text-white" name="humbleicons:times"></Icon>
                                                </div>
                                            </div>
                                            

                                        </div>


                                    </Fieldset>

                                </div>


                                <div class="w-full mt-1">
                                    <label for="dd-city" class="text-sm w-full">Description</label>
                                    <textarea v-model="Category.description" class="w-full border rounded-md"></textarea>
                                </div>

                                <div class="place-content-end flex w-full">
                                    <button class="bg-green-500 mt-1 font-semibold text-white py-1 rounded-md px-4 mb-4" type="submit">Update <Icon name="fa-solid:paper-plane"></Icon></button>
                                </div>


                            </form>
                        </div>

                    </div>


                </div>

            </div>

        </div>
    </NuxtLayout>
</template>