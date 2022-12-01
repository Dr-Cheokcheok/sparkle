let loadStatus = false;
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

  if(loadStatus) {
    $(document).ready(function(){             //slick 초기화
      $('.products').slick('unslick');
    });
  }

  groupInputs.forEach(input => {

    reload(input);

    input.onclick = () => {

      $(document).ready(function(){             //slick 초기화
        $('.products').slick('unslick');
      });

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
        if(product.rate == 0) {    // 할인율이 0인 경우 판매가만 남음
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
                        ${priceToString(product.retailPrice)}원
                        <span class="gray spoqa">${priceToString(product.price)}원</span>
                    </p>
                  </div>
                </li>
                `;
        }  
      }
    });

    
    slick();    // 화면넘어가는 함수
  }

}

function slick() {

  $('.products').slick({
    dots: false,
    infinite: true,  //무한반복 옵션
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    prevArrow : "<button class='slick-prev prd' type='button'><img src='/static/images/img/m-sec-prev.png'>Previous</button>",
    nextArrow : "<button class='slick-next prd' type='button'><img src='/static/images/img/m-sec-next.png'>Next</button>",
  });

}

$(window).scroll(function(){
  if ($(this).scrollTop() > 300){
      $('.btn_gotop').show();
  } else{
      $('.btn_gotop').hide();
  }
});
$('.btn_gotop').click(function(){
  $('html, body').animate({scrollTop:0},400);
  return false;
});

function priceToString(price) {    // 금액에 , 찍어주는 함수
  
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
/*장바구니/위시리스트 팝업*/
$(".bag").click(function() {
    var check = confirm("상품이 장바구니에 담겼습니다.\n확인하시겠습니까?");
    if (check) {
        location.assign("/bag");
    }
});

$(".like").click(function() {
    alert("상품을 위시리스트에 추가하였습니다.");
});

window.onload = () => {
  checkCategory();
  loadStatus = true;
}