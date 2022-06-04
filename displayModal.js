import {data} from "./data.js";
export default function(cate, id){
  for(var i = 0; i < data[cate].length; i++){
    if(id == data[cate][i].id){
      data.previewToItem = data[cate][i];
    }
  }
}