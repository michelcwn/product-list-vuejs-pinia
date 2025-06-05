<script setup>
import Cart from '@/components/Cart.vue';
import DessertList from '@/components/DessertList.vue';
</script>

<template>
  <div class="p-6 text-rose-900 bg-rose-100 2xl:px-32">
    <h1 class="text-5xl font-bold mb-8 md:px-8 md:py-4 xl:px-16">Dessert</h1>
    <div class="2xl:grid 2xl:grid-cols-[2fr_1fr]">
      <DessertList />
      <Cart />
    </div>
  </div>
</template>
