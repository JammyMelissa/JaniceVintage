

$(function(){

  //****** ITEMS(HOME画面) ******

  // HOME画面　TOPへ戻る
  const pagetop = $(".js-pagetop");
  pagetop.on("click",function(){
    $("html,body").animate({
      scrollTop:0
    },500);
    return false;
  });

  // 上から100pxスクロールしたら矢印表示
  $(window).scroll(function(){
    if ($(this).scrollTop() > 100){
      pagetop.fadeIn();
    }else{
      pagetop.fadeOut();
    }
  });


  // アイテムをクリックするとモーダル表示
  let sPos;
  $(".js-modal-open").on("click",function(){
    //クリックした商品のモーダルを表示
    const i = $(".js-modal-open").index(this);
    $(".js-modal").eq(i).fadeIn(200);
    $(".js-modal-content ul").eq(i).addClass("list");
    const firstImg = $("ul.list li img").eq(0).addClass("active");
    firstImg.fadeIn(200);
    //商品の裏表を表示させるための矢印を表示
    $(".next").show();
    $(".prev").hide();
    sPos = $(window).scrollTop();
    $("body").addClass("fixed").css({top: -1 * sPos});
    return false;
  });

  //CLOSEボタンでモーダルを閉じる
  $(".js-modal-close").on("click",function(){
    $(".js-modal").fadeOut(200);
    $(".active").removeClass("active");
    $(".list").removeClass("list");
    $("body").removeClass("fixed").css({top: 0});
    $(window).scrollTop(sPos);
    return false;
  });


  // モーダル内の写真において商品の表裏を表示
  $(".next").on("click",function(){
    const display = $(".active");
    display.removeClass("active");
    const nextImg = $("ul.list li img").eq(1).addClass("active");
    nextImg.fadeIn(200);
    $(".next").hide();
    $(".prev").show();
  });
  $(".prev").on("click",function(){
    const display = $(".active");
    display.removeClass("active");
    const nextImg = $("ul.list li img").eq(0).addClass("active");
    nextImg.fadeIn(200);
    $(".prev").hide();
    $(".next").show();
  });

 //****** CART画面 ******

 // ローカルストレージの商品データを取得
 let total = 0; //商品の合計金額
 let saveItems = []; //ローカルストレージに保存用の配列

 const items = JSON.parse(localStorage.getItem("key"));

 if(items){
   saveItems = items;
 　for(let cnt=0, len = saveItems.length; cnt < len; cnt++){
   let td =  "<tr><td>"
            +(saveItems[cnt].name)
            +"</td><td>"
            +"¥"
            +(saveItems[cnt].price)
            +"</td>"
            +"<td><button>"
            +"取消"
            +"</button></td></tr>";

    total = total + saveItems[cnt].price;
    let totalPrice = "¥" + (total);

   $(".c-table tbody").append(td);
   $(".total-price").text(totalPrice);

   }
　}

// ローカルストレージにデータを追加
 $(".btn1").on("click",function(){
   const id = $(this).data("id");
   const item = $(this).data("item");
   const price = $(this).data("price");


    let save = {
          id:id,
          name:item,
          price:price
        };

    saveItems.push(save)

   localStorage.setItem("key",JSON.stringify(saveItems));

  });


 // 「取消ボタン」にてローカルストレージからデータを削除する処理(ただし全部消えてしまう)
   $(".c-table button").on("click",function(){
     // const obj = $(".c-table button").index(this);
     // const r =  saveItems[obj];
     localStorage.removeItem("key");
     $(".c-table tbody").remove();

     let t = 0;
     let tPrice = "¥" + (t);
     $(".total-price").text(tPrice);
   });


  //****** CUSTOMER画面 ******
  // 個人情報をローカルストレージに保存
   let saveInfo = [];
   $(".cst-btn").on("click",function(){
     const username = $(".c-text").val();
     const address = $(".c-tarea").val();
     const tel = $(".c-num").val();
     const email = $(".c-email").val();
     const pay = $('input:radio[name="payment"]:checked').val();

     let cstInfo = {
       username:username,
       address:address,
       tel:tel,
       email:email,
       payment:pay
     }


     saveInfo.push(cstInfo)

     localStorage.setItem("info",JSON.stringify(saveInfo));

     });

});
