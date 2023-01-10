// Reducer
const initialState = {
    items: [],
    subtotal: 0,
    grandTotal: 0
  };
  
  export default function CartReducer(state = initialState, action) {
    switch (action.type) {
      case "ADD_ITEM":
        return {
          ...state,
          items: [...state.items, action.item],
          grandTotal: state.grandTotal + action.item.price
        };
      case "REMOVE_ITEM":
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.itemId),
          grandTotal: state.grandTotal - action.item.price * action.item.quantity
        };
      case "INCREASE_QUANTITY":
        return {
          ...state,
          items: state.items.map(item => {
            if (item.id === action.itemId) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          }),
          grandTotal: state.grandTotal + action.item.price
        };
      case "DECREASE_QUANTITY":
        return {
          ...state,
          items: state.items.map(item => {
            if (item.id === action.itemId) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          }),
          grandTotal: state.grandTotal - action.item.price
        };
      default:
        return state;
    }
  }
  