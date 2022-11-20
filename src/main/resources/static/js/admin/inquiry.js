class InquiryApi {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new InquiryApi();
        }
        return this.#instance;
    }

    getProduct() {
        let responseData = null;
        let uri = location.href;
        let category = decodeURIComponent(uri.substring(uri.lastIndexOf("/") + 1));

             $.ajax({
            async: false,
            type: "get",
            url: "/api/admin/inquiry/" + category,
            dataType: "json",
            success: (response) => {
                responseData = response.data;
            },
            error: (error) => {
                console.log(error);
            }
        });
        
        return responseData;
        
    }
}


class AdminInquiryService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new AdminInquiryService();
        }
        
        return this.#instance;
    }

    loadInquiryList() {
        const responseData = InquiryApi.getInstance().getProduct();
        console.log(responseData);
        this.getInquiryList(responseData);

    }

    getInquiryList(responseData) {
        const name = document.querySelector(".category");
        const inquiryBoxs = document.querySelector(".boxs");
   
      
        inquiryBoxs.innerHTML = "";

        responseData.forEach(inquiryBox => { 
            
            name.innerHTML = "";
           
            // 카테고리가 생수일 시 그룹별 버튼 생성
           if(inquiryBox.category == "생수") {
               let responseData = null;
               const categoryBtns = document.querySelectorAll(".category-btn");

                 name.innerHTML += `
                    <div class="name-box">
                        <h4 class="category-name">${inquiryBox.category}</h4>
                        <div class="category-button">
                                <input id="category1" name = "sub_car" class = "sub-btn" type = "radio" value = "2L">
                                <label class="sub-button-label" for = "category1">2L</label>
                                <input id="category2" name = "sub_car" class = "sub-btn" type = "radio" value = "500mL" >
                                <label class="sub-button-label" for = "category2">500mL</label>
                                <input id="category3" name = "sub_car" class = "sub-btn" type = "radio" value = "330mL" >
                                <label class="sub-button-label" for = "category3">330mL</label>
                                <input id="category4" name = "sub_car" class = "sub-btn" type = "radio" value = "18.9L" >
                                <label class="sub-button-label" for = "category4">18.9L</label>
                            </div>
                        </div>
                        `;


            for(let i = 0; i < categoryBtns.length; i++) {
                if(categoryBtns[i].checked) {
                    $.ajax({
                        async: false,
                        type: "get",
                        url: "/api/admin/inquiry/" + categoryBtns[i].value,
                        contentType: "application/json",
                        data: categoryBtns[i].value,
                        dataType: "json",
                        success: (response) => {
                          //선택 category 제품 list
                          responseData = response.data;
                
                        },
                        error: (error) => {
                          console.log(error)
                        }
                      });
                }
            }

            const groupInputs = document.querySelectorAll(".sub-btn");

            groupInputs.forEach(input => {
          
              reload(input);
              input.onclick = () => {
                reload(input);
              }
            });

                
            
           }else { // 카테고리가 생수가 아닌 경우는 버튼이 사라짐
                name.innerHTML += `
                    <h4 class="category-name">${inquiryBox.category}</h4> 
            `;

                inquiryBoxs.innerHTML += `
                <div class="inquiry-box">
                    <img class="product-img" src="${inquiryBox.img}">
                    <div class="product-explan">
                        <p>${inquiryBox.name}</p>
                        <p>${inquiryBox.retailPrice}원</p>
                        <p>${inquiryBox.group}</p>
                    </div>
                    <div class="buttons">
                        <button type="button" class="delete-button">삭제</button>
                        <button type="button" class="correction-button">수정</button>
                    </div>
                </div>
                `;
            }    
        });

    }

    reload(input){
        const inquiryBoxs = document.querySelector(".boxs");
      
        if(input.checked){
          inquiryBoxs.innerHTML = "";
          responseData.forEach(inquiryBox => {
            if (inquiryBox.group == input.value) {
      
                inquiryBoxs.innerHTML += `
                <div class="inquiry-box">
                    <img class="product-img" src="${inquiryBox.img}">
                    <div class="product-explan">
                        <p>${inquiryBox.name}</p>
                        <p>${inquiryBox.retailPrice}원</p>
                        <p>${inquiryBox.group}</p>
                    </div>
                    <div class="buttons">
                        <button type="button" class="delete-button">삭제</button>
                        <button type="button" class="correction-button">수정</button>
                    </div>
                </div>
                `;
            }
          });
        }
      }

    
}

class DeleteAdminProduct {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new DeleteAdminProduct();
        }
        
        return this.#instance;
    }

    deleteProduct() {
        const deleteButton = document.querySelector(".delete-button");

        deleteButton.onclick = () => {
            $.ajax({
                
            });
        }
    }
     
}

window.onload = () => {
    AdminInquiryService.getInstance().loadInquiryList();
}