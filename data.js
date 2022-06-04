var truth = [true, false];
export var data = {
  chicken: [],
  pizza: [],
  pie: [],
  new: [],
  recent: [],
  previewToItem: {},
};
export var cart = [];

export function storTOLOcalHistory() {
  window.localStorage.setItem("data", JSON.stringify(data));
  window.localStorage.setItem("cart", JSON.stringify(cart));
}

export async function apiCall(key = "chicken") {
  if (key == "info" || key == "contact") return;
  if (data[key].length == 20) return;
  var dataFromApi = await fetch(
    `https://api.edamam.com/api/recipes/v2?type=public&q=${key}&app_id=74f88648&app_key=4b8d493981dc8ff9db3e9cb49c1c1d02`
  );
  var dataInJson = await dataFromApi.json();
  for (var i = 0; i < dataInJson.hits.length; i++) {
    var amount = Math.floor(Math.random() * 400);
    var truthy = truth[Math.floor(Math.random() * 2)];
    var variable = {
      id: i,
      cate: key,
      src: dataInJson.hits[i].recipe.image,
      name: dataInJson.hits[i].recipe.label,
      price: `${amount}`,
      new: truthy,
      about: `It is from ${dataInJson.hits[i].recipe.source} and it is at "${dataInJson.hits[i].recipe.url}"`,
    };
    if (truthy) {
      data.new.push(variable);
    }
    data[key].push(variable);
  }
}

export function load() {
  data = JSON.parse(window.localStorage.getItem("data"));
  cart = JSON.parse(window.localStorage.getItem("cart"));
}
