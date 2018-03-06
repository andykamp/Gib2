"use strict"

// CART reducers
export function cartReducers(state={cart:[], link:[]}, action) {
  switch(action.type){

    //---item cases-----
    case "ADD_TO_CART":
      return {
        ...state,
        cart: action.payload,
      }
      break;
  case "UPDATE_CART":
    //creates a copy of the current array of books
    const currentBokToUpdate = [ ...state.cart]
    //Determine at wich index in books array is the book to be deleted
    const indexToUpdate = currentBokToUpdate.findIndex(
      function(book){
        return book._id === action._id
      }
    )

    const newBookToUpdate ={
      ...currentBokToUpdate[indexToUpdate],
      note: action.payload //test if it works
    }
    //uses slice to remove the book at the specified indexToUpdate
    let cartUpdate = [...currentBokToUpdate.slice(0,indexToUpdate),newBookToUpdate, ...currentBokToUpdate.slice(indexToUpdate + 1)]
    return {...state,
       cart: cartUpdate,
     }

    case "DELETE_CART_ITEM":
      return {  ...state,
        cart: action.payload,
      }
      break;

    //---link items------
    case "ADD_LINK_TO_CART":
      return {
        ...state,
        link: action.payload,
      }
      break;
    case "DELETE_LINK_ITEM":
      return {  ...state,
        ...state,
        link: action.payload,
      }
      break;
  }
  return state;
}
