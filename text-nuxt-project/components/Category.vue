<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps(['category']);
const emit = defineEmits();

const emitCategoryInfo = (name, id) => {
  // Emitting the category name and id to the parent component
  emit('category-clicked', { name, id });
};

</script>

<template>
    <li class="py-1">
        <span v-if="props.category?.parent_id > 0">&rarr;</span>
        <span @click="emitCategoryInfo(props.category?.name, props.category?.id)" class="cursor-pointer">
            {{ props.category?.name }}
        </span>
        <ul v-if="props.category?.categories?.length > 0" class="ml-4">
            <Category v-for="category in props.category.categories" :key="category.id" :category="category"
                @category-clicked="categoryInfo => $emit('category-clicked', categoryInfo)" class="cursor-pointer"/>
        </ul>
    </li>
</template>
