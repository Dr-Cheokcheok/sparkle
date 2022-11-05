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