#  :white_square_button: SparkleMall (스파클몰)
![image](https://user-images.githubusercontent.com/67142147/210392328-b9eb3ce3-63d2-4f1a-b256-c0596dba846f.png)



## :door: 바로가기
- <a href="http://15.165.54.208:8000/index"> 스파클몰 바로가기 </a></br>

## :date: 프로젝트 기간

||기간 (2022)|
|:------:|---|
|총 기간| 11월 9일 ~ 12월 7일 (4주)|

## :computer: 기술스택
>### Platforms & Languages
<p align='center'>
  <img src='https://img.shields.io/badge/HTML5-E34F26?logo=HTML5&logoColor=white'/>
  <img src='https://img.shields.io/badge/CSS3-1572B6?logo=CSS3&logoColor=white'/>
  <img src='https://img.shields.io/badge/JavaScript-F7DF1E?logo=JavaScript&logoColor=white'/>
  <img src='https://img.shields.io/badge/jQuery-0769AD?logo=jQuery&logoColor=white'/>
  </br>
  <img src="https://img.shields.io/badge/Java-007396?style=flat&logo=Java&logoColor=white"/>
  <img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=flat&logo=Spring Boot&logoColor=white"/>
  <img src="https://img.shields.io/badge/AWS-232F3E?style=flat&logo=Amazon AWS&logoColor=white"/>
  <img src="https://img.shields.io/badge/MariaDB-003545?style=flat&logo=MariaDB&logoColor=white"/>
</p>

>### Tools
<p align='center'>
  <img src='https://img.shields.io/badge/IntelliJ IDEA-FF9B00?logo=IntelliJ IDEA&logoColor=white'/>
  <img src='https://img.shields.io/badge/Visual Studio Code-007ACC?logo=Visual Studio Code&logoColor=white'/>
  </br>
  <img src='https://img.shields.io/badge/GitHub-181717?logo=GitHub&logoColor=white'/>
  <img src='https://img.shields.io/badge/Sourcetree-0052CC?logo=Sourcetree&logoColor=white'/>
</p>

## :memo: 프로젝트 동기
생수를 구매해서 먹는 사람들이 증가함에 따라 편리하게 웹 사이트를 통해서 생수를 주문할 수 있도록 제작

</br>

## :exclamation: 전체 기능
  - 로그인 및 회원가입
  - 제품 구매(결제) 기능
  - 장바구니 기능
  - 마이페이지 기능(제품 구매 목록 확인, 개인정보 수정 및 탈퇴)
  - 관리자 기능

</br>

## :bookmark_tabs: 프로젝트 세부 계획
+ 회원관리 서비스
  - 회원가입
  - 회원탈퇴
  - 회원정보수정
  - 마이페이지
  - 로그인/로그아웃
+ 결제 서비스
  - 장바구니에 상품 등록 및 삭제
  - 결제 시 장바구니 목록보기
  - 제품 결제
+ 관리자 서비스
  - 상품 등록 및 삭제
  - 고객들이 결제한 상품목록 조회
+ 기타 서비스
  - 자주 찾는 상품 찜 기능

</br>

## :grey_exclamation: 페이지 별 기능 구현
![image](https://user-images.githubusercontent.com/67142147/210406496-a1b2f7f9-21bc-43cc-9b87-56fb279f3947.png)

</br>

### 메인화면
<img width="400" alt="메인화면01" src="https://user-images.githubusercontent.com/109320970/236781319-9f8f7b0a-69d6-4735-9a78-cc86625bbe97.png"><img width="400" alt="메인화면02" src="https://user-images.githubusercontent.com/109320970/236781363-bf70af63-c24a-4411-88c5-12cbbbe22e7c.png">

    헤더의 상단 아이콘을 통해 원하는 페이지로 이동
    MD 추천 카테고리에서 전체 상품조회 <>버튼 클릭 시 슬라이드 (슬릭 라이브러리 사용)
    판매횟수가 많은 순 대로 인기상품 리스트로 상위 4개 조회

### 로그인 / 회원가입
<img width="400" alt="회원가입" src="https://user-images.githubusercontent.com/109320970/236785892-44384998-5563-4491-b265-f1b82c6e304c.jpg"><img width="400" alt="로그인" src="https://user-images.githubusercontent.com/109320970/236784293-60db829b-ee18-4154-b26f-a26109d921ac.jpg">

    회원가입 및 로그인 가능
    로그인하지 않으면 제품 구매 및 마이페이지 조회 불가
    관리자 아이디 로그인 시 관리자 페이지 링크 헤더에 생성

### 카테고리
<img width="400" alt="카테고리" src="https://user-images.githubusercontent.com/109320970/236783291-adc62806-56b4-4312-9a2c-76219c999a7e.jpg">

    원하는 카테고리 클릭 시 보고 싶은 제품군만 조회 가능
    용량 별 분류 가능

### 제품상세
<img width="400" alt="제품상세" src="https://user-images.githubusercontent.com/109320970/236782040-7f03e5ca-7b1c-4904-b2d7-8e538348d6b0.png">

    제품의 상세 이름과 이미지 및 금액 조회 가능
    수량에 따른 금액 자동 계산
    바로 구매 및 장바구니 담기 가능
    카테고리 클릭시 스크롤바 이동

### 장바구니
<img width="400" alt="장바구니" src="https://user-images.githubusercontent.com/109320970/236782291-ebc0661f-9bba-4f5b-8d91-b7f19a063713.png"><img width="400" alt="장바구니02" src="https://user-images.githubusercontent.com/109320970/236782531-e9875649-8e23-42ad-9c6a-a58ea47ca9f6.png">

    구매할 결제 품목, 수량, 가격 조회
    로그인되어 있는 사용자의 정보를 DB에서 가져와 자동으로 작성
    로그인 정보가 없을 시 로그인 페이지 자동 이동
    결제 수단에 따른 결제 방법 선택 가능 (아임포트 api 사용)

### MY PAGE
<img width="400" alt="관심상품" src="https://user-images.githubusercontent.com/109320970/236782721-0ecd697f-0012-4b86-b2d2-8f1b184882ec.png">

    회원 ID로 저장된 각 DB 카테고리 갯수 들고와서 조회
    삭제 / 장바구니 담기 버튼을 통해 삭제 또는 장바구니로 이동 가능
   
<img width="400" alt="주문배송" src="https://user-images.githubusercontent.com/109320970/236782801-e978ab28-c277-4a67-ab44-62c219c7dd88.png"><img width="400" alt="주문내역상세조회" src="https://user-images.githubusercontent.com/109320970/236787991-cfdfcea1-0953-41ea-b64a-358d7e6b98e9.jpg">

    결제까지 진행되어 구매된 주문 내역 조회 (각 상자 클릭 시 상세 내역 조회 페이지)
    주문번호는 구매 날짜 + 랜덤 숫자로 무작위 생성

<img width="400" alt="회원정보수정" src="https://user-images.githubusercontent.com/109320970/236782862-06293a3b-bf88-493e-ae97-a58bfd7d3c8e.png">

    기존의 저장된 회원 정보가 기본으로 들고와지고, text 수정 후 버튼 누르면 수정 완료 됨
    우편번호 찾기는 카카오 주소 API 사용
 
<img width="400" alt="회원탈퇴" src="https://user-images.githubusercontent.com/109320970/236782934-5441caba-91af-482e-af2d-b14a3027ddaa.png">

    탈퇴 사유 선택, 동의 칸에 체크 후 탈퇴 누르면 회원정보가 DB에서 삭제
    탈퇴 시 DB에서 해당 사용자, 장바구니, 관심상품까지 모두 삭제 됨
    SQL 트리거 기능 이용
   
### 관리자 페이지
<img width="400" alt="상품등록" src="https://user-images.githubusercontent.com/109320970/236782992-429e3a38-1e98-430a-8b6c-d3a9bac6a74e.png">

    추가 상품의 카테고리 선택 후 정보 입력
    원가와 할인율 입력시 판매가 자동 계산
    form data를 이용해 이미지 파일 다중 저장
    (메인 이미지는 하나만, 상세 페이지는 여러장 가능. 상세 페이지는 하단 박스에 보여짐)

<img width="400" alt="등록상품조회" src="https://user-images.githubusercontent.com/109320970/236783032-ed3d8f04-be02-4e60-b067-16c08b18858b.png">

    카테고리 클릭 시 해당 카테고리 제품 리스트 조회
    삭제 / 수정 버튼을 통해 제품 삭제 / 수정 가능

</br>

## :floppy_disk: DB 구조
![image](https://user-images.githubusercontent.com/67142147/210391609-f7a22fb4-419d-4360-beec-83b3f24da7e7.png)

</br>

## 프로젝트 소감
### 조문기
> 첫 프로젝트에서 오류나 모르는부분이 있을때 선생님처럼 도와줄 사람이 있다면 바로바로 물어보고 그 좋은 코드를 학습했어야 했는데 그러지 못하고 부족한 시간 때문에 다소 난해한 코드를 작성했던것 같습니다. 그로 인해 서로가 작성한 부분을 잘 이해하지 못하고 그냥 후다닥 넘겨버려서 협업에 있어서 조금 불편했었는데, 개인적으로 더 공부해서 사람들과 더 잘 소통할 수 있는 팀원이 되어 다음 프로젝트를 진행할때는 더 잘 하고싶다!!! 모두들 수고하셨습니다 ❤

### 백민경
> 힘들고 어려운, 처음 접하는 작업들이 많아 고된 시간이었지만 직접 만들어낸 결과물을 보면 뿌듯하기도합니다. 비전공자로서 코딩을 이 학원에서 처음 배우고, 기초반을 다녔던 시간까지 합치면 7개월이라는 시간동안 많은 것을 배워 만들어낸 프로젝트는 전공자의 눈에서 보자면 부족한 부분이 아직 많은 작업물로 보일지 몰라도 저에게는 처음 만들어낸 소중한 작품입니다. 앞으로 더 많은 것을 배워서 더욱 좋은 실력으로 더 멋진 프로젝트를 진행하고싶습니다. 함께 고생하며 완주까지 달려준 팀원들에게 감사를 남기고 싶습니다.

### 조창석
> 프로젝트를 진행하면서 아직 한참 모자라고 이해가 안되는 것들이 많다는 것을 느꼈습니다. 다른 사람들이 봤을 때도 이해가 잘 되는 코드를 써야되는데 아무래도 일정도 그렇고 시간상 기능이 돌아가게 해야 된다는 생각에 아무렇게나 만들었던 것 같습니다. 팀원들이 모르는 것이 있으면 잘 도와주고 챙겨줘서 지금까지 잘 해왔던 것 같습니다. 이해가 안되는 것이 있으면 늦게까지 하면서 찾아봤는데 생각보다 그게 재미있었고 팀에 피해가 안가기위해 더 열심히 했던 것 같습니다!!

### 이정민
> 기본적인 지식도 부족했기에 프로젝트에 참여하는게 맞는지 고민 했지만 뭐라도 해야 한다는 생각으로 불안함과 혹여나 피해를 줄수도 있기에 망설였지만 그럼에도 배우고자 참여 하였고 프로젝트 처음 부터 역량이 많이 부족하다고 생각했고 노력 했지만 짧은 기간동안 공극을 메우기엔 준비해 놓은게 너무 없어서 처음 참여해본 개발에 도움이 못된것에 미안함만이 남았고 피해를 주지 않기위해 다음 프로젝트는 노력을 더욱 하겠습니다.

</br>

## :two_men_holding_hands: SparkleMall 팀원 소개
|Name|GitHub / Contact|Position|
|------|---|---|
|조문기🔰|https://github.com/jjmmkk9|FE / BE|
|백민경|https://github.com/qorals1121|FE / BE|
|조창석|https://github.com/changseokjo|FE / BE|
|이정민|https://github.com/code0715|FE / BE|
