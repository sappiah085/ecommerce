import { cart, storTOLOcalHistory } from "./data.js";
export function operation(sign, id) {
  var ids;
  for (var i = 0; i < cart.length; i++) {
    if (id == cart[i].id) {
      ids = i;
    }
  }
  if (sign == "-") {
    cart[ids].total--;
  } else {
    cart[ids].total++;
  }
  if (cart[ids].total == 0) {
    cart.splice(ids, 1);
  }
  storTOLOcalHistory()
}
export function amount() {
  var amount = 0;
  if (cart.length == 0) return 0;
  for (var i = 0; i < cart.length; i++) {
    amount += parseInt(cart[i].amount) * parseInt(cart[i].total);
  }
  storTOLOcalHistory();
  return amount;
}
