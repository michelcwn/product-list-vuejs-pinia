import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { desserts } from '@/constants/index';

export const useQuantityStore = defineStore('quantity', () => {
  const quantities = ref({});
  const totalQuantity = computed(() =>
    Object.values(quantities.value).reduce((sum, qty) => sum + qty, 0)
  );

  const dessertsVisibility = ref(desserts.map(() => false));

  const increment = (index) => {
    if (!quantities.value[index]) quantities.value[index] = 0;
    quantities.value[index]++;
  };

  const decrement = (index) => {
    if (!quantities.value[index]) quantities.value[index] = 0;
    if (quantities.value[index] > 0) quantities.value[index]--;
  };

  const addToCart = (index) => {
    dessertsVisibility.value[index] = true;
    if (!quantities.value[index]) {
      quantities[index] = 1;
    }
  };

  const removeFromCart = (index) => {
    dessertsVisibility.value[index] = false;
    quantities[index] = 0;
  };

  const handleDecrement = (index) => {
    decrement(index);
    if (quantities.value[index] === 0) {
      removeFromCart(index);
    }
  };

  const cartItems = computed(() =>
    desserts
      .map((dessert, index) => ({
        ...dessert,
        index,
        quantity: quantities.value[index] || 0,
        visible: dessertsVisibility.value[index],
      }))
      .filter((item) => item.visible && item.quantity > 0)
  );

  const totalPriceCart = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  const isEmpty = computed(() => cartItems.value.length === 0);

  return {
    quantities,
    increment,
    decrement,
    totalQuantity,
    dessertsVisibility,
    addToCart,
    removeFromCart,
    handleDecrement,
    cartItems,
    totalPriceCart,
    isEmpty,
  };
});
