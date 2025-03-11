<script setup>
const props = defineProps(['category']);
</script>

<template>

    <li class="py-1">
        <span v-if="props.category?.parent_id > 0" >&rarr;</span>  
        {{ props.category?.name }}
        <ul v-if="props.category?.categories?.length > 0" class="ml-4">
            <Category  v-for="category in props.category.categories" :key="category.id" :category="category" />
        </ul>
    </li>
</template>