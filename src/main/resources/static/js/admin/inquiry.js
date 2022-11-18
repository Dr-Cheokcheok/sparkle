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
                const liters = document.querySelectorAll(".liter");

                 name.innerHTML += `
                 <div class="group-buttons">
                    <h4 class="category-name">${inquiryBox.category}</h4> 
                    <button type="button" class="liter btn1">2L</button>
                    <button type="button" class="liter btn2">500mL</button>
                    <button type="button" class="liter btn3">330mL</button>
                    <button type="button" class="liter btn4">18.9L</button>
                </div>
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