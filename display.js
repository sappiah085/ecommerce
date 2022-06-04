import { data, cart } from "./data.js";
import { domStrings } from "./nav.js";
import { amount } from "./operation.js";
export function display(category) {
  domStrings.totals.textContent = `$${amount()}`;
  var html = "";
  var item = category;
  console.log();
  if (typeof item == "object") {
    domStrings.item.innerHTML = "";
    for (var i = 0; i < item.length; i++) {
      html = `
       <div class="cart" id = "${item[i].id}" category = "${item[i].cate}">
       ${item[i].new ? '<div class="new">New</div>' : ""}
            <img src="${item[i].src}" />
            <div class="tag">
              <div class="name">${item[i].name.slice(0, 16)}...</div>
              <div class="price">$${item[i].price}</div>
            </div>
            
            <button class="add">Add to cart</button>
          </div>
      `;
      domStrings.item.insertAdjacentHTML("afterbegin", html);
    }
  }
  if (category == "info") {
    domStrings.item.innerHTML = "";
    html =
      "<h2>W are a team of web developers who seek to give off our very best to make your website outstanding. We are students of University Of Ghana with our primary objective of making the world a better place. We are very enthusiastic and always ready to help. You can contact us using the contact link on the navigation bar.</h2>";
    domStrings.item.insertAdjacentHTML("afterbegin", html);
  }
  if (category == "contact") {
    domStrings.item.innerHTML = "";
    html = `<div class='list'>
    <span><div class='icon'></div> Isaac Okai</span>
<span><div class='icon'></div> Malvin Oduro</span>
<span><div class='icon'></div> Kornuad Agbo</span>
<span><div class='icon'></div> Abena Osaah</span>

    </div>`;
    domStrings.item.insertAdjacentHTML("afterbegin", html);
  }
  var recent;
  var data_item;
  domStrings.recently.innerHTML = "";
  if (data.recent.length == 0) {
    recent = "";
    domStrings.recently.style.display = "none";
  } else {
    domStrings.recently.style.display = "flex";
    data_item = data.recent.map((recent) => {
      return `<div class="cart recentItem" category="${recent.cate}" id="${
        recent.id
      }">
          <img src="${recent.src}" alt="image" />
          <div class="name">${recent.name.slice(0, 11)}...</div>
        </div>`;
    });
    recent = `<div class="main recent"> 
    <div class="title"><h3>You recently viewed </h3><button class="clear">Clear</button></div>
          <div class="recents main">
        ${data_item}
        </div>
        </div>
        `;
  }
  domStrings.recently.insertAdjacentHTML("afterbegin", recent);

  var cartItem;
  domStrings.shopping.innerHTML = "";
  if (cart.length == 0) {
    cartItem = "<h5>Add to Cart</h5>";
    domStrings.shopping.insertAdjacentHTML("afterbegin", cartItem);
  } else {
    cart.forEach((item) => {
      cartItem = `<li id="${item.id}" class="cate_item">
                <img src="${item.src}" alt="image" /> ${item.name.slice(
        0,
        8
      )}...
                <button class="operation">-</button><span class="num">${
                  item.total
                }</span><button class="operation">+</button><div class="del">X</div>
              </li>`;
      domStrings.shopping.insertAdjacentHTML("afterbegin", cartItem);
    });
  }

  var previewItems = "";
  if (data.previewToItem.id) {
    domStrings.previewSpan.innerHTML = " ";
    previewItems = `
    <dialog class="preview previewed" id="${data.previewToItem.id}" category="${
      data.previewToItem.cate
    }">
        <button class="close">X</button>
        <img src="${data.previewToItem.src}" />
        <div class="tag">
          <div class="name">${data.previewToItem.name.slice(0, 25)}...</div>
          <div class="price">$${data.previewToItem.price}</div>
        </div>
        <div class="about">
          ${data.previewToItem.about}
        </div>
        <button class="add">Add to cart</button>
      </dialog>
    `;
    domStrings.previewSpan.insertAdjacentHTML("afterbegin", previewItems);
    domStrings.previewSpan.firstElementChild.showModal();
  } else if (domStrings.previewSpan.firstElementChild) {
    domStrings.previewSpan.firstElementChild.close();
    domStrings.previewSpan.innerHTML = " ";
  }
}
