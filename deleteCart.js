import { cart, storTOLOcalHistory } from "./data.js"
export default function deleteCart(id){
  for(var i = 0; i < cart.length; i++){
    if(cart[i].id == id){
      cart.splice(i, 1)
      storTOLOcalHistory();
      return
    }
  }
}