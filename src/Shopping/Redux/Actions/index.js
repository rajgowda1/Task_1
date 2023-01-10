// cart.js

// Action types
// const ADD_ITEM = 'ADD_ITEM';
// const REMOVE_ITEM = 'REMOVE_ITEM';
// const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
// const DECREASE_QUANTITY = 'DECREASE_QUANTITY';

// Action creators
export function addItem(item) {
  return { type: "ADD_ITEM", item };
}

export function removeItem(itemId) {
  return { type: "REMOVE_ITEM", itemId };
}

export function increaseQuantity(itemId) {
  return { type: "INCREASE_QUANTITY", itemId };
}

export function decreaseQuantity(itemId) {
  return { type: "DECREASE_QUANTITY", itemId };
}

