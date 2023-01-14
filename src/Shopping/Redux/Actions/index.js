// cart.js

// Action types
// const ADD_ITEM = 'ADD_ITEM';
// const REMOVE_ITEM = 'REMOVE_ITEM';
// const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
// const DECREASE_QUANTITY = 'DECREASE_QUANTITY';

// Action creators
export function addItem(item) {
  return { type: "ADD_ITEM",item };
}

export function removeItem(itemId) {
  return { type: "REMOVE_ITEM", itemId };
}

export function increaseQuantity(item) {
  return { type: "INCREASE_QUANTITY", item };
}

export function decreaseQuantity(item) {
  return { type: "DECREASE_QUANTITY", item };
}

export function clearCart() {
  return {type: "CLEAR_CART" }
}