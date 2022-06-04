import { cart, data, storTOLOcalHistory } from "./data.js";
import { amount } from "./operation.js";
export default function addToCarte(cate, id) {
  var name;
  var src;
  var amounts;
  for (var i = 0; i < data[cate].length; i++) {
    if (id == data[cate][i].id) {
      name = data[cate][i].name;
      src = data[cate][i].src;
      amounts = data[cate][i].price;
    }
  }
  var itemToCarte = {
    total: 1,
    cate: cate,
    id: id,
    name: name,
    src: src,
    amount: amounts,
  };
  if (cart.length == 0) {
    cart.push(itemToCarte);
  } else {
    for (var i = 0; i < cart.length; i++) {
      if (id == cart[i].id) {
        cart[i].total++;
        return;
      }
    }
    cart.push(itemToCarte);
    storTOLOcalHistory();
  }
  amount();
}
