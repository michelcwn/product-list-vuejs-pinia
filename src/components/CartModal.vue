<script setup>
import { useQuantityStore } from '@/store';
defineProps({
  items: {
    type: Array,
    required: true,
  },
});
const store = useQuantityStore();
const emit = defineEmits(['close']);
</script>

<template>
  <!-- Modal Overlay -->
  <div
    class="fixed inset-0 z-50 bg-black/60 flex items-end md:items-center justify-center"
  >
    <!-- Modal Content -->
    <div
      class="bg-white w-full max-w-2xl h-[90vh] rounded-lg overflow-y-auto py-4 md:h-fit md:w-[70vw] xl:w-lg"
    >
      <div class="p-6 h-full flex flex-col">
        <div class="flex flex-col mb-6">
          <img
            src="/src/assets/images/icon-order-confirmed.svg"
            alt="order confirmed"
            class="h-12 w-12 mb-4"
          />
          <h2 class="text-4xl text-rose-900 font-bold md:flex md:gap-2">
            <span class="block">Order </span>
            <span class="block">Confirmed</span>
          </h2>
          <p class="text-rose-400 mt-2">We hope you enjoy your food!</p>
        </div>
        <div class="bg-rose-100 flex-1 rounded-lg mt-8">
          <div class="overflow-y-auto p-4">
            <div
              v-for="item in items"
              :key="item.index"
              class="flex items-center justify-between py-4 border-b border-rose-900/5"
            >
              <div class="flex items-center gap-4">
                <img
                  :src="item.imgThumbnail"
                  :alt="item.title"
                  class="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p class="text-rose-900 font-semibold capitalize">
                    {{ item.title }}
                  </p>
                  <div class="flex gap-4 items-center">
                    <span class="text-red-50 font-bold"
                      >{{ item.quantity }}x</span
                    >
                    <span class="text-rose-400"
                      >@ ${{ item.price.toFixed(2) }}</span
                    >
                  </div>
                </div>
              </div>
              <span class="text-rose-900 font-semibold">
                ${{ (item.price * item.quantity).toFixed(2) }}
              </span>
            </div>
          </div>
          <!-- total -->
          <div class="flex justify-between px-4 py-6">
            <p class="text-rose-900">Order Total</p>
            <p class="font-bold text-rose-900 text-2xl">
              $ {{ store.totalPriceCart.toFixed(2) }}
            </p>
          </div>
        </div>

        <button
          @click="emit('close')"
          class="cursor-pointer mt-6 px-6 py-3 bg-red-50 text-white w-full transition-colors hover:bg-[hsl(14,86%,32%)] capitalize rounded-full"
        >
          Start New Order
        </button>
      </div>
    </div>
  </div>
</template>
