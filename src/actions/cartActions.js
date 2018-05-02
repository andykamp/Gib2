import API_URL from '../index';

//ADD TO CART
export const addToCart = (note, item,  mail, uni_id) => (dispatch) => {
  console.log('Pressed addToCart',note, mail, uni_id);
  fetch(`${API_URL}/add_link_or_note/${mail}?uni_id=${uni_id}&head=${note[1]['head']}&note=${note[1]['note']}` )

  dispatch({ type: "ADD_TO_CART", payload: item});
  // fetch('${API_URL}/add_link_or_note/'+ mail +"?uni_id=" + uni_id + "&head=" + note.title + "&note=" + note.note )

}

export const deleteCartItem = (_id, item,  mail, uni_id) => (dispatch) => {
  console.log('Pressed addToCart',item, mail, uni_id);
  fetch(`${API_URL}/remove_link_or_note/${mail}?uni_id=${uni_id}&note_id=${_id}`)

  dispatch({ type: "DELETE_FROM_CART", payload: item});
  // fetch('${API_URL}/add_link_or_note/'+ mail +"?uni_id=" + uni_id + "&head=" + note.title + "&note=" + note.note )

}

export const addLinkToCart = (link, item,  mail, uni_id) => (dispatch) => {
  console.log('Pressed addToCart',link, mail, uni_id);
  fetch(`${API_URL}/add_link_or_note/${mail}?uni_id=${uni_id}&head=${link[1]['head']}&link=${link[1]['link']}` )

  dispatch({ type: "ADD_LINK_TO_CART", payload: item});
  // fetch('${API_URL}/add_link_or_note/'+ mail +"?uni_id=" + uni_id + "&head=" + note.title + "&note=" + note.note )

}

export const deleteLinkCartItem = (_id, item,  mail, uni_id) => (dispatch) => {
  console.log('Pressed addToCart',item, mail, uni_id);
  fetch(`${API_URL}/remove_link_or_note/${mail}?uni_id=${uni_id}&link_id=${_id}`)

  dispatch({ type: "DELETE_LINK_FROM_CART", payload: item});
  // fetch('${API_URL}/add_link_or_note/'+ mail +"?uni_id=" + uni_id + "&head=" + note.title + "&note=" + note.note )

}
//UPDATE FORM CART
export function updateCart(_id, text){
  return{
    type:"UPDATE_CART",
    _id: _id,
    payload: text,
  }
}
// //DELETE FORM CART
// export function deleteCartItem(cart){
//   return{
//     type:"DELETE_CART_ITEM",
//     payload: cart
//   }
// }


//---Links-----
//add link to
// export function addLinkToCart(link){
//   return {
//     type:"ADD_LINK_TO_CART",
//     payload: link
//   }
// }
//
// //delete link form kart
// export function deleteLinkItem(link){
//   return{
//     type:"DELETE_LINK_ITEM",
//     payload: link
//   }
// }

export function getNoteText(_id,){
  return{
    type:"GET_NOTE_TEXT",
    _id: _id,
  }
}
