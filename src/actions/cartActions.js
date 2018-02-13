"use strict"

//ADD TO CART
export function addToCart(book){
  return {
    type:"ADD_TO_CART",
    payload: book
  }
}

//UPDATE FORM CART
export function updateCart(_id, text){
  return{
    type:"UPDATE_CART",
    _id: _id,
    payload: text,
  }
}
//DELETE FORM CART
export function deleteCartItem(cart){
  return{
    type:"DELETE_CART_ITEM",
    payload: cart
  }
}


//---Links-----
//add link to
export function addLinkToCart(link){
  return {
    type:"ADD_LINK_TO_CART",
    payload: link
  }
}

//delete link form kart
export function deleteLinkItem(link){
  return{
    type:"DELETE_LINK_ITEM",
    payload: link
  }
}

export function getNoteText(_id,){
  return{
    type:"GET_NOTE_TEXT",
    _id: _id,
  }
}
