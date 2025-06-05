<script setup>
import { desserts } from '@/constants/index';

import { useQuantityStore } from '@/store/index';

const store = useQuantityStore();
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div
      class="mb-6 md:px-8"
      v-for="(
        {
          title,
          category,
          imgMobile,
          imgTablet,
          imgDesktop,
          imgThumbnail,
          price,
        },
        index
      ) in desserts"
      :key="index"
    >
      <div class="flex flex-col items-center justify-center">
        <picture
          :class="
            store.dessertsVisibility[index]
              ? 'rounded-xl border-2 border-red-50'
              : ''
          "
        >
          <source media="(min-width: 1280px)" :srcset="imgDesktop" />
          <source media="(min-width: 768px)" :srcset="imgTablet" />
          <img
            :src="imgMobile"
            :alt="title"
            class="rounded-xl w-full md:w-sm xl:w-[300px]"
          />
        </picture>
        <button
          v-if="!store.dessertsVisibility[index]"
          @click="store.addToCart(index)"
          class="bg-white flex gap-2 items-center justify-center px-8 py-3 rounded-full border border-rose-900 capitalize -mt-6 cursor-pointer"
        >
          <span>
            <img src="/src/assets/images/icon-add-to-cart.svg" />
          </span>
          <span>Add to cart</span>
        </button>

        <!-- ////////////// -->
        <!-- Adding desserts -->

        <button
          v-else
          class="flex items-center justify-center bg-red-50 py-3 px-4 gap-10 rounded-full -mt-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 cursor-pointer border border-white rounded-full p-1 group hover:bg-white hover:border-red-50 transition-all duration-300"
            viewBox="0 0 10 2"
            @click="() => store.handleDecrement(index)"
          >
            <path
              fill="currentColor"
              class="text-white group-hover:text-red-50 transition-colors duration-300"
              d="M0 .375h10v1.25H0V.375Z"
            />
          </svg>

          <span class="text-white font-semibold">
            {{ store.quantities[index] || 0 }}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 10 10"
            class="w-6 h-6 cursor-pointer border border-white rounded-full p-1 group hover:bg-white hover:border-red-50 transition-all duration-300"
            @click="() => store.increment(index)"
          >
            <path
              fill="currentColor"
              class="text-white group-hover:text-red-50 transition-colors duration-300"
              d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
            />
          </svg>
        </button>
      </div>
      <div class="flex flex-col gap-1 mt-2 xl:px-8 2xl:px-0">
        <h3 class="text-rose-500 capitalize">
          {{ category }}
        </h3>
        <h2 class="text-rose-900 font-semibold text-xl capitalize">
          {{ title }}
        </h2>
        <p class="flex text-red-50 font-bold">
          <span>$</span>
          <span>
            {{ price.toFixed(2) }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
