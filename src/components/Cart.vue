<script setup>
import { useQuantityStore } from '@/store';
import { ref } from 'vue';
import CartModal from './CartModal.vue';

const store = useQuantityStore();
const isOpenModal = ref(false);
const openModal = () => (isOpenModal.value = true);
const closeModal = () => (isOpenModal.value = false);

const fullyRemoveItem = (index) => {
  store.removeFromCart(index);
  store.quantities[index] = 0;
};
</script>

<template>
  <div
    class="bg-white mt-8 py-8 px-6 rounded-xl 2xl:max-w-lg 2xl:h-fit 2xl:mt-0 lg:w-lg lg:mx-auto"
  >
    <h2 class="text-red-50 text-2xl font-bold">
      Your Cart (
      {{ store.totalQuantity }}
      )
    </h2>
    <!-- img empty -->
    <div
      v-if="store.isEmpty"
      class="flex flex-col items-center justify-center gap-4"
    >
      <img src="/src/assets/images/illustration-empty-cart.svg" alt="empty" />
      <p class="font-semibold text-rose-500">
        Your added items will appear here
      </p>
    </div>
    <!-- cart item -->
    <div id="order" v-else>
      <div
        class="flex justify-between items-center border-b border-rose-100 py-4"
        v-for="item in store.cartItems"
        :key="item.index"
      >
        <div class="flex flex-col gap-2">
          <p class="text-rose-900 font-semibold capitalize">
            {{ item.title }}
          </p>
          <div class="flex items-center gap-4">
            <span class="text-red-50 font-bold">{{ item.quantity }}x</span>
            <div class="flex gap-2">
              <span class="text-rose-400">@ ${{ item.price.toFixed(2) }}</span>
              <span class="text-rose-500 font-semibold"
                >${{ (item.price * item.quantity).toFixed(2) }}</span
              >
            </div>
          </div>
        </div>
        <img
          @click="fullyRemoveItem(item.index)"
          src="/src/assets/images/icon-remove-item.svg"
          alt="remove"
          class="rounded-full font-semibold border border-rose-500 p-1 cursor-pointer"
        />
      </div>
      <!-- order total -->
      <div class="flex flex-row items-center mt-8 justify-between">
        <p class="text-rose-900">Order Total</p>
        <p class="text-2xl text-rose-900 font-bold">
          $
          {{ store.totalPriceCart.toFixed(2) }}
        </p>
      </div>
      <!-- carbon neutral -->
      <div class="flex justify-center gap-2 my-4 py-4 rounded-xl bg-rose-100">
        <img
          src="/src/assets/images/icon-carbon-neutral.svg"
          alt="carbon neutral"
        />
        <p>
          <span>This is a </span>
          <span class="text-rose-900 font-semibold">carbon-neutral </span>
          <span>delivery</span>
        </p>
      </div>
      <!-- btn confirm -->
      <button
        class="mx-auto w-full rounded-full px-8 py-4 bg-red-50 text-white cursor-pointer transition-colors hover:bg-[hsl(14,86%,32%)]"
        @click="openModal"
      >
        Confirm order
      </button>
    </div>
    <CartModal
      v-if="isOpenModal"
      @close="closeModal"
      :items="store.cartItems"
    />
  </div>
</template>
