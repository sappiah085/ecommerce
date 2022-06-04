import { domStrings } from "./nav.js";
import { data } from "./data.js";
var indexes = 0;
export var stringCate = "";
var arrayData = [];
export function Sort(array = "chicken", index) {
  if (array == "info" || array == "contact") {
    domStrings.page.style.display = "none";
    return array;
  }
  if (stringCate != array || indexes < 0) {
    indexes = 0;
  }

  stringCate = array;
  indexes += index;
  arrayData = data[array];

  if (!arrayData) {
    domStrings.page.style.display = "none";
    return stringCate;
  }
  if (indexes == 0) {
    domStrings.previous.style.display = "none";
    domStrings.next.style.display = "flex";
  } else if (indexes + 8 >= arrayData.length) {
    domStrings.previous.style.display = "flex";
    domStrings.next.style.display = "none";
  } else {
    domStrings.previous.style.display = "flex";
    domStrings.next.style.display = "flex";
  }
  var numberOfPages = Math.ceil(arrayData.length / 8);
  if (numberOfPages <= 1) {
    domStrings.page.style.display = "none";
  } else {
    domStrings.page.style.display = "flex";
    domStrings.number.textContent = `${indexes / 8 + 1} of ${numberOfPages}`;
  }
  var showingPages = arrayData.slice(indexes, 8 + indexes);

  return showingPages;
}
