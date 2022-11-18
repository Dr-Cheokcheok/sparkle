function changeCategory() {
    const products = document.querySelector(".products");
    const categoryBtns = document.querySelectorAll(".category-btn");
    let responseData = null;
    console.log("changGroup 실행");
  
    for (let i = 0; i < categoryBtns.length; i++) {
  
      if (categoryBtns[i].checked) {
  
        // products.innerHTML = "";
        console.log("카테고리 선택 실행");
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
          error: (error) => {
            console.log(error)
          }
        });
      }
  
    }
  
        const groupInputs = document.querySelectorAll(".sub-btn");
        const subBtnLabel = document.querySelectorAll(".sub-button-label");
  
        groupInputs.forEach(input => {
  
          input.onclick = () => {
            console.log("그룹인풋 클릭");
  
            $('.sub-btn').removeClass("on");
            $(this).addClass("on");
  
            if (input.classList.contains("on") || input.checked) {
              products.innerHTML = "";
              responseData.forEach(product => {
                if (product.group == input.value) {
  
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
                            ${product.retailPrice}원
                            <span class="gray spoqa">${product.price}원</span>
                        </p>
                        </div>
                    </li>
                    `;
                }
              });
            }
            //여기임
          }
        });
  }
  
  
  window.onload = () => {
    changeCategory();
  }