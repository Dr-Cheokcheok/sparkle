function checkCategory() {

  const categoryBtns = document.querySelectorAll(".category-btn");
  const uri = location.href; //버튼 누를때 마다 카테고리 가져옴
  const category = decodeURI(uri.substring(uri.lastIndexOf("/") + 1));

  categoryBtns.forEach(categoryBtn => {
    if(category == categoryBtn.value){

    categoryBtn.checked = true;
    toggleBtn(categoryBtn.id);
    }
  });
}



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
  changeCategory();
}


let responseData = null;
function changeCategory() {

  const categoryBtns = document.querySelectorAll(".category-btn");

  for(let i = 0 ; i < categoryBtns.length; i++){
    if (categoryBtns[i].checked) {

      // products.innerHTML = "";
      $.ajax({
        async: false,
        type: "get",
        url: "/api/product/category/" + categoryBtns[i].value,
        contentType: "application/json",
        data: categoryBtns[i].value,
        dataType: "json",
        success: (response) => {
          //선택 category 제품 list
          this.responseData = response.data;

        },
        error: (error) => {
          console.log(error)
        }
      });

    }

  }

  changeGroup();
}

function changeGroup(){
  const groupInputs = document.querySelectorAll(".sub-btn");

  groupInputs.forEach(input => {

    reload(input);
    input.onclick = () => {
      reload(input);
    }
  });
}

function reload(input){
  const products = document.querySelector(".products");
  const categoryCount = document.querySelector("#category_count");

  if(input.checked){

    products.innerHTML = "";
    categoryCount.innerHTML = "";
    
    this.responseData.forEach(product => {
      
      if (product.group == input.value) {
        if(product.rate == 0) {
          products.innerHTML += `
              <li class="product">
                <figure>
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
                      ${priceToString(product.retailPrice)}원
                  </p>
                </div>
              </li>
          `;

        }else {
           products.innerHTML += `
                <li class="product">
                  <figure>
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
                        ${product.retailPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                        <span class="gray spoqa">${product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</span>
                    </p>
                  </div>
                </li>
                `;
        }
      }
    });

     categoryCount.innerHTML += `${$(".products").find("li").length}`;
  }
}

function priceToString(price) {
  
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


window.onload = () => {
  checkCategory();
}