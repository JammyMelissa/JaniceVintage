
$(function(){

// ローカルストレージに保存した商品情報、お客様情報を確認画面に出力する

let conInfo = [];　//個人情報用　ローカルストレージに保存用の配列
let conItems = [];　//商品用　ローカルストレージに保存用の配列
let total = 0;　//商品の合計金額

const info = JSON.parse(localStorage.getItem("info"));
const con = JSON.parse(localStorage.getItem("key"));

if(info){

  conInfo = info;
  conItems = con;

  for(let i=0, len = conInfo.length; i < len; i++){

    let list = "<li class=deco>"
              + "Name: "
              +"<span>"
              +(conInfo[i].username)
              +"</span></li>"
              +"<li class=deco>"
              +"Home address: "
              +"<span>"
              +(conInfo[i].address)
              +"</span></li>"
              +"<li class=deco>"
              +"Tel: "
              +"<span>"
              +(conInfo[i].tel)
              +"</span></li>"
              +"<li class=deco>"
              +"Mail: "
              +"<span>"
              +(conInfo[i].email)
              +"</span></li>"
              +"<li class=deco>"
              +"Payment methods: "
              +"<span>"
              +(conInfo[i].payment)
              +"</span></li>";

     $(".conf-list").append(list);
   }
 }

if(con){
  let title = "<li>"
              +"購入商品: "
              +"</li>";

  $(".conf-list").append(title);


  for(let c=0, len = conItems.length; c < len; c++){

     let items = "<li class=deco><span>"
               + (conItems[c].name)
               + "&nbsp &nbsp"
               + "¥"
               + (conItems[c].price)
               + "</span></li>";

      total = total + conItems[c].price;

      $(".conf-list").append(items);

    }

    let totalPrice = "<li class=amount>"
                      + "合計金額"
                      + "&nbsp &nbsp"
                      + "¥"
                      + (total)
                      + "</li>";

    $(".conf-list").append(totalPrice);

}
  $(".donebtn").on("click",function(){
    localStorage.removeItem("key");
  });

});
