/*
  div사이즈 동적으로 구하기
*/
const outer = document.querySelector('.outer');
const innerList = document.querySelector('.inner-list');
const inners = document.querySelectorAll('.inner');
let currentIndex = 0; // 현재 슬라이드 화면 인덱스

inners.forEach((inner) => {
  inner.style.width = `${outer.clientWidth}px`; // inner의 width를 모두 outer의 width로 만들기
})

innerList.style.width = `${outer.clientWidth * inners.length}px`; // innerList의 width를 inner의 width * inner의 개수로 만들기

/*
  버튼에 이벤트 등록하기
*/
const buttonLeft = document.querySelector('.slick-prev');
const buttonRight = document.querySelector('.slick-next');

buttonLeft.addEventListener('click', () => {
  currentIndex--;
  currentIndex = currentIndex < 0 ? inners.length - 1 : currentIndex; // index값이 0보다 작아질 경우 0으로 변경
  innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`; // index만큼 margin을 주어 옆으로 밀기
  clearInterval(interval); // 기존 동작되던 interval 제거
  interval = getInterval(); // 새로운 interval 등록
});

buttonRight.addEventListener('click', () => {
  currentIndex++;
  currentIndex = currentIndex >= inners.length ? 0 : currentIndex; // index값이 inner의 총 개수보다 많아질 경우 마지막 인덱스값으로 변경
  innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`; // index만큼 margin을 주어 옆으로 밀기
  clearInterval(interval); // 기존 동작되던 interval 제거
  interval = getInterval(); // 새로운 interval 등록
});

/*
  주기적으로 화면 넘기기
*/
const getInterval = () => {
  return setInterval(() => {
    currentIndex++;
    currentIndex = currentIndex >= inners.length ? 0 : currentIndex;
    innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`;
  }, 3000);
}

let interval = getInterval(); // interval 등록



/*   작은 배너   */
/*
  div사이즈 동적으로 구하기
*/
const outer2 = document.querySelector('.outer2');
const innerList2 = document.querySelector('.inner-list2');
const inners2 = document.querySelectorAll('.inner2');
let currentIndex2 = 0; // 현재 슬라이드 화면 인덱스

inners2.forEach((inner2) => {
  inner2.style.width = `${outer2.clientWidth}px`; // inner의 width를 모두 outer의 width로 만들기
})

innerList2.style.width = `${outer2.clientWidth * inners2.length}px`; // innerList의 width를 inner의 width * inner의 개수로 만들기

/*
  주기적으로 화면 넘기기
*/
const getInterval2 = () => {
  return setInterval(() => {
    currentIndex2++;
    currentIndex2 = currentIndex2 >= inners2.length ? 0 : currentIndex2;
    innerList2.style.marginLeft = `-${outer2.clientWidth * currentIndex2}px`;
  }, 3000);
}

let interval2 = getInterval2(); // interval 등록





/*  기획전 배너    */ 

/*
  div사이즈 동적으로 구하기
*/
const outer3 = document.querySelector('.outer3');
const innerList3 = document.querySelector('.inner-list3');
const exhibitionsList = document.querySelectorAll('.exhibitions');
let currentIndex3 = 0; // 현재 슬라이드 화면 인덱스

exhibitionsList.forEach((exhibitions) => {
  exhibitions.style.width = `${outer3.clientWidth}px`; // inner의 width를 모두 outer의 width로 만들기
})

innerList3.style.width = `${outer3.clientWidth * exhibitionsList.length}px`; // innerList의 width를 inner의 width * inner의 개수로 만들기


/*
  버튼에 이벤트 등록하기
*/
const buttonLeft2 = document.querySelector('.slick-prev.always');
const buttonRight2 = document.querySelector('.slick-next.always');

buttonLeft2.addEventListener('click', () => {
  currentIndex3--;
  currentIndex3 = currentIndex3 < 0 ? exhibitionsList.length - 1 : currentIndex3; // index값이 0보다 작아질 경우 0으로 변경
  innerList3.style.marginLeft = `-${outer3.clientWidth * currentIndex3}px`; // index만큼 margin을 주어 옆으로 밀기
  clearInterval(interval3); // 기존 동작되던 interval 제거
  interval3 = getInterval3(); // 새로운 interval 등록
});

buttonRight2.addEventListener('click', () => {
  currentIndex3++;
  currentIndex3 = currentIndex3 >= exhibitionsList.length ? 0 : currentIndex3; // index값이 inner의 총 개수보다 많아질 경우 마지막 인덱스값으로 변경
  innerList3.style.marginLeft = `-${outer3.clientWidth * currentIndex3}px`; // index만큼 margin을 주어 옆으로 밀기
  clearInterval(interval3); // 기존 동작되던 interval 제거
  interval3 = getInterval3(); // 새로운 interval 등록
});



/*
  주기적으로 화면 넘기기
*/
const getInterval3 = () => {
  return setInterval(() => {
    currentIndex3++;
    currentIndex3 = currentIndex3 >= exhibitionsList.length ? 0 : currentIndex3;
    innerList3.style.marginLeft = `-${outer3.clientWidth * currentIndex3}px`;
  }, 5000);
}

let interval3 = getInterval3(); // interval 등록


// md추천

function checkCategory() {

  const categoryBtns = document.querySelectorAll(".category-btn");
  const category = "생수";

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

  if(input.checked){

    products.innerHTML = "";
    
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
                      ${product.retailPrice}원
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
                        ${product.retailPrice}원
                        <span class="gray spoqa">${product.price}원</span>
                    </p>
                  </div>
                </li>
                `;
        }       
      }
    });

    const outer4 = document.querySelector(".con-box");
    const innerList4 = document.querySelector(".products");
    const inners4 = document.querySelectorAll(".product");
    const buttonLeft3 = document.querySelector(".slick-prev.prd");
    const buttonRight3 = document.querySelector(".slick-next.prd");
    let currentIndex4 = 0;
  
    if(inners4.length < 4) {
        buttonLeft3.style.display = "none";
        buttonRight3.style.display = "none";

      }else {
        innerList4.style.width = `${outer4.clientWidth * inners4.length / 4}px`
  
        buttonLeft3.addEventListener('click', () => {
          currentIndex4--;
          currentIndex4 = currentIndex4 < 0 ? 0 : currentIndex4;
  
          innerList4.style.marginLeft = `-${outer4.clientWidth * currentIndex4}px`;
        });
  
        buttonRight3.addEventListener('click', () => {
          currentIndex4++;
          currentIndex4 = currentIndex4 >= inners4.length ? inners4.length - 1 : currentIndex;
  
          innerList4.style.marginLeft = `-${outer4.clientWidth * currentIndex4}px`;
        });
        }

  }



}


window.onload = () => {
  checkCategory();
}