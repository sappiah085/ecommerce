import { display } from "./display.js";
import deleteCart from "./deleteCart.js";
import { operation } from "./operation.js";
import { data, apiCall, storTOLOcalHistory, load } from "./data.js";
import { Sort, stringCate } from "./displaySor.js";
import displayModal from "./displayModal.js";
import addToCarte from "./carte.js";
import recentView from "./recentView.js";
export var pageFiles;
// ===============================DOMSTRINGS==========================
export var domStrings = {
  toggle: document.querySelector(".toggle"),
  navbar: document.querySelector("nav"),
  circle: document.querySelector(".circle"),
  shop: document.querySelector(".shop"),
  filter: document.querySelector(".filter"),
  links: document.querySelectorAll(".link"),
  item: document.querySelector(".search"),
  product: document.querySelector(".products"),
  recently: document.querySelector(".recently"),
  shopping: document.querySelector(".shopping"),
  totals: document.querySelector(".totals"),
  page: document.querySelector(".page"),
  next: document.querySelector(".next"),
  contact: document.querySelector(".contact"),
  previous: document.querySelector(".previous"),
  previewSpan: document.querySelector(".previewSpan"),
  number: document.querySelector(".number"),
};
// function display modal(){

// }
// ==================================NAVIGATION EVENTS=========================
domStrings.toggle.addEventListener("click", () => {
  domStrings.toggle.classList.toggle("active");
  domStrings.navbar.classList.toggle("active");
});
window.addEventListener("scroll", () => {
  domStrings.navbar.classList.add("active");
  domStrings.toggle.classList.remove("active");
});

// ======================================GLOBAL EVENTLISTENER=========================
window.addEventListener("click", (e) => {
  if (
    e.target.closest(".circle") ||
    e.target.classList.contains("cartToggle") ||
    e.target.closest(".shop")
  ) {
    domStrings.shop.classList.add("active");
    // ==============INCREASE CART================
    if (e.target.classList.contains("operation")) {
      var sign = e.target.textContent;
      var id = e.target.closest(".cate_item").id;
      operation(sign, id);
    }
    // ===============DELETE FROM CART================
    if (e.target.classList.contains("del")) {
      deleteCart(e.target.closest(".cate_item").id);
    }
    display();
    return;
  }
  // =========================TOGGLE OFF CART====================
  if (!e.target.closest(".shop")) {
    domStrings.shop.classList.remove("active");
  }
  // ==============clear recent====================
  if (e.target.classList.contains("clear")) {
    data.recent = [];
    display();
    storTOLOcalHistory();
  }
  // =====================ADD TO CART============================
  if (e.target.classList.contains("add")) {
    var attribute, id;
    if (e.target.closest(".preview")) {
      attribute = e.target.closest(".preview").getAttribute("category");
      id = e.target.closest(".preview").id;
    } else {
      attribute = e.target.closest(".cart").getAttribute("category");
      id = e.target.closest(".cart").id;
    }
    recentView(attribute, id);
    addToCarte(attribute, id);
    display();
  }
  // ======================CLOSE preview ===================
  if (e.target.classList.contains("close") || !e.target.closest(".preview")) {
    data.previewToItem = {};
    display();
  }

  // ===========================PREVIEW ITEM====================
  if (
    (e.target.closest(".cart") && !e.target.classList.contains("add")) ||
    e.target.closest(".recentItem")
  ) {
    var attribute =
      e.target.closest(".cart").getAttribute("category") ||
      e.target.closest(".recentItem").getAttribute("category");
    var id =
      e.target.closest(".cart").id ||
      e.target.closest(".recentItem").getAttribute("id");
    recentView(attribute, id);
    displayModal(attribute, id);
    display();
  }
});

// ==================================LINKS EVETLISTENER=========================

domStrings.links.forEach((link) => {
  link.addEventListener("click", (e) => {
    for (var i = 0; i < domStrings.links.length; i++) {
      if (
        domStrings.links[i].classList.contains("active") &&
        e.target.classList.contains("cartToggle")
      ) {
        domStrings.navbar.classList.add("active");
        domStrings.toggle.classList.remove("active");
        return;
      } else if (domStrings.links[i].classList.contains("active")) {
        domStrings.links[i].classList.remove("active");
      }
    }
    domStrings.navbar.classList.add("active");
    domStrings.toggle.classList.remove("active");
    e.target.classList.add("active");
    var value = e.target.textContent.toLowerCase();
    displayRecipe(value);
  });
});

domStrings.contact.addEventListener("click", (e) => {
  displayRecipe(e.target.textContent);
});

async function displayRecipe(key) {
  if (key == "new") {
    console.log(data.new);
    smallFunc(key);
  } else {
    await apiCall(key);
    smallFunc(key);
  }
}
function smallFunc(key) {
  pageFiles = Sort(key, 0);
  display(pageFiles);
  storTOLOcalHistory();
}
if (window.localStorage.getItem("data")) {
  load();
}
displayRecipe(undefined);
domStrings.previous.addEventListener("click", () => {
  display(Sort(stringCate, -8));
});
domStrings.next.addEventListener("click", () => {
  display(Sort(stringCate, +8));
});
