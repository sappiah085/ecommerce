import { data, storTOLOcalHistory } from "./data.js";
export default function recentView(cate, id) {
  for (var i = 0; i < data[cate].length; i++) {
    if (data[cate][i].id == id && !data.recent.includes(data[cate][i])) {
      data.recent.push(data[cate][i]);
      storTOLOcalHistory();
    }
  }
}
