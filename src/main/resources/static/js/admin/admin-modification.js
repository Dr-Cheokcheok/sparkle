
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
}


function getInfo(productId){
    let responseData;
    $.ajax({
        async:false,
        type: "get",
        url: "/api/admin/" + productId,
        data: productId,
        dataType: "json",

        success: (response)=>{
            console.log(response); //ProductDetailRespDto: productImgFiles List<String>까지 있음
            responseData = response.data;
        },
        error: (error) => {
            console.log(error)
        }
    });
    showInfo(responseData);
}

function showInfo(responseData) {
    const content = document.querySelector("#content");
    let category = responseData.category;
    let group = responseData.group;

    content.innerHTML = `
    <div class="clear">
                <div class="goods-info left">
                <input type="hidden" id="product-id" name="id" value="${responseData.id}">
                    <div class="photo-box" id = "image_container">
                        <img id = "foo" src="/image/product/${responseData.img}" alt="상품이미지">
                    </div>
                </div>
                <div class="goods-info right">

                                <div class = "prdt-category clear">

                                    <input id="button1" name ="car" class = "category-select " type ="radio" value = "생수" onclick = "toggleBtn(id)">
                                    <label class="button-label" for="button1">생수</label>

                                    <input id="button2" name ="car" class = "category-select" type ="radio" value = "탄산" onclick = "toggleBtn(id)">
                                    <label class="button-label" for="button2">탄산</label>

                                    <input id="button3" name = "car" class = "category-select" type = "radio" value = "생수부자재" onclick = "toggleBtn(id)">
                                    <label class="button-label" for="button3">생수부자재</label>

                                    <!-- <a href="javascript:;" class="heart" id="interestBtn"><p>생수</p></a> -->
                                    <!-- <a href="javascript:;" class="heart" id="interestBtn"><p>탄산</p></a>
                                    <a href="javascript:;" class="heart" id="interestBtn"><p>생수부자재</p></a> -->
                                </div><p></p>
                                <div class = "prdt-category clear">
                                    <div id = "category_button1">
                                        <input id="category1" name = "sub_car" class = "sub-select" type = "radio" value = "2L">
                                        <label class="button-label" for = "category1">2L</label>
                                        <input id="category2" name = "sub_car" class = " sub-select" type = "radio" value = "500mL" >
                                        <label class="button-label" for = "category2">500mL</label>
                                        <input id="category3" name = "sub_car" class = " sub-select" type = "radio" value = "330mL" >
                                        <label class="button-label" for = "category3">330mL</label>
                                        <input id="category4" name = "sub_car" class = " sub-select" type = "radio" value = "18.9L" >
                                        <label class="button-label" for = "category4">18.9L</label>
                                    </div>

                                    <div id = "category_button2" style = "display: none;">
                                        <input id="category5" name = "sub_car" class = "select-button sub-select" type = "radio" value = "스파클링">
                                        <label class="button-label" for = "category5">스파클링</label>
                                    </div>

                                    <div id = "category_button3" style="display: none;">
                                        <input id="category6" name = "sub_car" class = "select-button sub-select" type = "radio" value = "냉온수기">
                                        <label class="button-label" for = "category6">냉온수기</label>
                                        <input id="category7" name = "sub_car" class = "select-button sub-select" type = "radio" value = "거치대" >
                                        <label class="button-label" for = "category7">거치대</label>
                                        <input id="category8" name = "sub_car" class = "select-button sub-select" type = "radio" value = "펌프" >
                                        <label class="button-label" for = "category8">펌프</label>
                                    </div>
                                </div>

                                <p class="name">상품명 :
                                    <input id = "product_name" type="text" placeholder="상품명을 입력해주세요!!" value = "${responseData.name}">
                                </p>

                                <div class="info-list-box">
                                    <dl class="info-list clear">
                                        <dt>원가 :
                                            <input id = "price" type = "text" placeholder="원가를 입력해주세요!!" value = "${responseData.price}">원
                                        </dt>
                                        <dt>할인율 :
                                            <input id = "rate" type = "text" placeholder="할인율을 입력해주세요!!" value = "${responseData.rate}">%
                                        </dt>
                                        <dt>판매가 :
                                            <input id = "retail-price" type = "text" placeholder="판매가를 입력해주세요!!" value = "${responseData.retailPrice}">원
                                        </dt>
                                    </dl>
                                    <dl class="info-list clear">
                                        <dt>배송 :</dt>
                                        <dd>무료배송</dd>
                                    </dl>
                                </div>


                            <div class="btn-box clear">
                                <label class ="main-file-button" for="main-img-add">
                                    메인이미지 등록
                                </label>
                                <input id = "main-img-add" type = "file" name="mainFile" style="display: none;">

                                <form>
                                    <label class ="input-file-button" for="img-add">
                                        상세이미지 등록
                                    </label>
                                    <input id ="img-add" type = "file" name="file" multiple ="multiple" style="display: none;"/>
                                </form>

                                <a href="javascript:;" class="purchase" id="submit">상품 등록</a>
                            </div>


                        </div>

                </div>
            </div>
            <div class="goods-cont" id="app">
                <!-- <ul class="tab-btn clear">
                    <li><a>상품상세 이미지</a></li>
                </ul> -->
                <div class="tab-btn clear">
                    <a>상품상세 이미지</a>
                </div>

                <div class="tab-detail">
                    <div id="att_zone" data-placeholder="파일을 첨부 하려면 파일 선택 버튼을 클릭"></div>
                </div>
            </div>
    `;
    const categoryBtns = document.querySelectorAll(".category-select");
    const groupBtns = document.querySelectorAll(".sub-select");

    categoryBtns.forEach((categoryBtn) =>{
        if(categoryBtn.value === category){
            categoryBtn.checked = true;
            toggleBtn(categoryBtn.id)

        }
    });
    groupBtns.forEach(groupBtn => {
        if(groupBtn.value === group){
            groupBtn.checked = true;

        }
    });

    //todo: 이미지 리스트들 만들어서 저장해놓고 업데이트해주기

    const productRepository = new ProductRepository(responseData);
    const productImgFileService = new ProductImgFileService(productRepository);
    this.createProductDtlImgs(productRepository);
    productImgFileService.addImageFileEvent();
    this.addUpdateButtonEvent(productRepository);

}


function createProductMainImg(newMainImg){
    console.log("mainImg 프리뷰")
    const previewMain = document.querySelector("#image_container");
    previewMain.innerHTML = `
    <img id ="foo-main" src="${newMainImg}">
    `;

}

function createProductDtlImgs(productRepository) {
    //프리뷰
    const previewImages = document.querySelector("#att_zone");
    previewImages.innerHTML = "";

    //프리뷰에 oldimgList의 이미지들 뿌려줌=>
    //oldimgList는 버튼이 pre-delete
    productRepository.oldImgList.forEach(img => {
        previewImages.innerHTML += `
                <div class="img-box">
                    <i class="fa-solid fa-xmark pre-delete"></i>
                    <img class="product-img" src="/image/product/${img.temp_name}"> 
                </div>
            `;
        console.log("이미지박스 생성");
    });

    productRepository.newImgSrcList.forEach((img) => {
        previewImages.innerHTML += `
                <div class="img-box">
                    <i class="fa-solid fa-xmark post-delete"></i>
                    <img class="product-img" src="${img}">
                </div>
            `;
    });

    this.addProductImgDeleteEvent(productRepository);
}

function addProductImgDeleteEvent(productRepository) {
    //oldImgList 삭제
    const preDeleteButton = document.querySelectorAll(".pre-delete");
    //x버튼의 인덱스를 가져와서
    preDeleteButton.forEach((xbutton, index) => {
        xbutton.onclick = () => {
            if(confirm("상품 이미지를 지우시겠습니까?")) {
                productRepository.oldImgDeleteList.push(productRepository.oldImgList[index]);
                productRepository.oldImgList.splice(index, 1); //oldimglist에서 해당 index를 하나 지움
                this.createProductDtlImgs(productRepository); //다시 프리뷰
            }
        };
    })
    //newImgList 삭제
    const postDeleteButton = document.querySelectorAll(".post-delete");
    postDeleteButton.forEach((xbutton, index) => {
        xbutton.onclick = () => {
            if(confirm("상품 이미지를 지우시겠습니까?")) {
                productRepository.newImgList.splice(index, 1);
                productRepository.newImgSrcList.splice(index, 1);
                this.createProductDtlImgs(productRepository);
            }
        };
    })
}




class ProductRepository {
    oldMainImg;
    newMainImg;
    oldImgList;
    oldImgDeleteList;
    newImgList;
    newImgSrcList;
    updateFormData;


    constructor(responseData) {
        this.oldMainImg = responseData.img; //temp_name
        this.newMainImg = null;
        this.oldImgList = responseData.productImgFiles;
        this.oldImgDeleteList = new Array();
        this.newImgList = new Array();
        this.newImgSrcList = new Array();
        this.updateFormData = new FormData();
    }

    toUpdateFormData() {
        const productId = document.querySelector("#product-id")
        const categorySelects = document.querySelectorAll('.category-select');
        const subSelects = document.querySelectorAll('.sub-select');
        const productName = document.querySelector('#product_name');
        const price = document.querySelector('#price');
        const rate = document.querySelector('#rate');
        const retailPrice = document.querySelector("#retail-price");
        const mainImgInput = document.querySelector("#main-img-add")

        this.updateFormData.append("id", parseInt(productId.value));

        categorySelects.forEach(categorySelect => {
            if (categorySelect.checked) {
                this.updateFormData.append("category", categorySelect.value);

            }
        });
        subSelects.forEach(subSelect => {
            if (subSelect.checked) {
                this.updateFormData.append("group", subSelect.value);
            }
        });
        this.updateFormData.append("name", productName.value);
        this.updateFormData.append("price", price.value);
        this.updateFormData.append("rate", rate.value);
        this.updateFormData.append("retailPrice", retailPrice.value);

        if(mainImgInput.files.length !== 0 ){
            this.updateFormData.append("img", mainImgInput.files[0]);
        }else {
            this.updateFormData.append("mainPath", this.oldMainImg);
        }

        this.oldImgDeleteList.forEach(deleteImgFile => {
            this.updateFormData.append("deleteImgFiles", deleteImgFile.temp_name);
        });

        this.newImgList.forEach(newImgFile => {
            this.updateFormData.append("files", newImgFile);
        });
    }
}

//업데이트 버튼 이벤트
function addUpdateButtonEvent(productRepository) {
    const updateButton = document.querySelector("#submit");

    updateButton.onclick = () => {
        if(productRepository.oldImgList.length == 0 && productRepository.newImgList.length == 0 ){
            alert("상세이미지는 비어있을 수 없습니다.");
        }else{
            productRepository.toUpdateFormData(); //폼데이터를 수정된 내용으로 업데이트
            productDataUpdateRequest(productRepository.updateFormData) //수정한 폼데이터를 넣어서 request!
        }
    }
}


function productDataUpdateRequest(formData){
    $.ajax({
        async: false,
        type: "post",
        url: "/api/admin/product/modification",
        enctype: "multipart/form-data",
        contentType: false,
        processData: false,
        data: formData,
        dataType: "json",
        success: (response) => {
            alert("상품 수정 완료");
            location.reload();
        },
        error: (error) => {
            alert("상품 수정 실패");
            console.log(error);
        }
    });
}


class ProductImgFileService {

    productRepository = null;

    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    addImageFileEvent() {
        const mainFileInput = document.querySelector("#main-img-add");
        const fileInput = document.querySelector("#img-add");

        /*  메인파일 추가하기&프리뷰  */
        mainFileInput.onchange = () => {

            let changeFlag1 = false;

            if(mainFileInput.files[0].size !== 0){

                this.productRepository.newMainImg = mainFileInput.files[0];
                changeFlag1 = true;
            }
            if(changeFlag1){
                const reader = new FileReader();
                reader.onload = (e) => {

                    this.productRepository.newMainImg = e.target.result;
                    createProductMainImg(this.productRepository.newMainImg);
                }
                //물어보기!!!!!!!!!!!!!
                setTimeout(() => {reader.readAsDataURL(this.productRepository.newMainImg);}, 100);
            }
        }

        /*  상세파일 추가하기&프리뷰  */
        //file input에 onchange 있으면 -> value 하나씩 꺼내서 size 검사해서 repository.newImgList에 차곡차곡 넣어주삼 => changeflag = true 해주삼
        fileInput.onchange = () => {
            const formData = new FormData(document.querySelector("form"));
            let changeFlag2 = false;

            formData.forEach((value) => {
                if(value.size != 0) {
                    this.productRepository.newImgList.push(value);
                    changeFlag2 = true;
                }
            });

            console.log("newImgList: " + this.productRepository.newImgList.length);
            //그리고 changeFlag가 변했으면 getImageFiles실행 그리고 fileInfut의 값은 비워줘!!!
            if(changeFlag2){
                this.getImageFiles();
                fileInput.value = null;

            }
        }
    }
    //새로운 사진이 들어오면 newImgList를 돌리면서 srcList에 파일 url push
    getImageFiles() {
        const newImgList = this.productRepository.newImgList;
        //newImgSrcList가 0이 아닌동안 newImgSrc를 하나씩 지워 ??
        while(this.productRepository.newImgSrcList.length != 0) {
            this.productRepository.newImgSrcList.pop();

        }

        newImgList.forEach((file, i) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                console.log("이미지 파일 하나를 리스트에 추가합니다.")

                this.productRepository.newImgSrcList.push(e.target.result);
                if(i == newImgList.length - 1) {
                    console.log("마지막 인덱스일 때만 실행")
                    createProductDtlImgs(this.productRepository);
                }
            }
                            //물어보기!!!!!!!!!!!!!
            setTimeout(() => {reader.readAsDataURL(file);}, i * 100);
        });

    }
}
window.onload = () => {
    let requestUrl = location.href;
    getInfo(parseInt(requestUrl.substring(requestUrl.lastIndexOf("/") + 1)));
}


