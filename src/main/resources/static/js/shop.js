

function toggleBtn(s) {
  if(s == 'button1'){
    document.getElementById('category1').checked = true;
    document.getElementById('category_button1').style.display = "block";
    document.getElementById('category_button2').style.display = "none";
    document.getElementById('category_button3').style.display = "none";
  }else if(s == 'button2'){
    document.getElementById('category5').checked = true;
    document.getElementById('category_button1').style.display = "none";
    document.getElementById('category_button2').style.display = "block";
    document.getElementById('category_button3').style.display = "none";
  }else if(s == 'button3'){
    document.getElementById('category6').checked = true;
    document.getElementById('category_button1').style.display = "none";
    document.getElementById('category_button2').style.display = "none";
    document.getElementById('category_button3').style.display = "block";
  }
  changeGroup();
}


function changeGroup(){
  const products = document.querySelector(".products");
  const categoryBtns = document.querySelectorAll(".category-btn");
  let responseData = null;
  console.log("changGroup 실행");

  for (let i = 0; i < categoryBtns.length; i++){

    if(categoryBtns[i].checked){
      products.innerHTML = "";
      console.log("if문 실행");
      $.ajax({
        async: false,
        type: "get",
        url: "/api/product/category/" + categoryBtns[i].value,
        contentType: "application/json",
        data: categoryBtns[i].value,
        dataType: "json",
        success: (response) => {
          //선택 category 제품 list
          responseData = response.data;
          console.log(responseData);
        },
        error : (error) => {
          console.log(error)
        }
      });

      responseData.forEach(product => {
        products.innerHTML += `
    
    <li class="product">
      <figure>
          <!-- 각자 상품 뿌릴때 /product/{productId} -->
        <a href= "/product/${product.productId}">
            <img src="/image/product/${product.img}" alt="인기상품 이미지 01">
            <!----  best 아이템에만 figcaption  --->
              <figcaption>BEST</figcaption>
        </a>
            <div class="time-icon">
              <button type="button" class="like"><img src="/static/images/img/best-icon01.png" alt=""></button>
              <button type="button" class="bag"><img src="/static/images/img/best-icon02.png" alt=""></button>
            </div>
      </figure>
      <div class="product-text">
        <a href="/product/${product.productId}">${product.name}</a>
        <p class="price spoqa">
            <span class="blue">${product.rate}%</span>
            ${product.retailPrice}원
            <span class="gray spoqa">${product.price}원</span>
        </p>
      </div>
    </li>
    `;
      })
    }


  }




}

window.onload = () => {
  changeGroup();
}