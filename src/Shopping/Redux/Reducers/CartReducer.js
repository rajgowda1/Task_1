// Reducer
const initialState = {
    items: []
  };
  
  export default function CartReducer(state = initialState, action) {
    switch (action.type) {
      case "ADD_ITEM":
        return {
          ...state,
          items: [...state.items, action.item]
        };
      case "REMOVE_ITEM":
        return {
          ...state,
          items: state.items.filter(item => item._id !== action.itemId),
        };
      case "INCREASE_QUANTITY":

      const updatedArr=state.items.map((item)=>{
        if (item._id === action.item._id) {
          item.quantity +=1
          item.subTotal=item.quantity * item.price
      }
      return item
      })
        return {items:updatedArr}

      case "DECREASE_QUANTITY":
        
      const updatedArray=state.items.map((item)=>{
        if (item._id === action.item._id) {
          item.quantity -=1
          item.subTotal=item.quantity * item.price
      }
      return item
      })
        return {items:updatedArray}

      case "CLEAR_CART" : 
        return initialState      

      default:
        return state;
    }
  }
  