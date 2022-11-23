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

    productDataDeleteRequest(id) {
        $.ajax({
            async: false,
            type: "delete",
            url: "/api/admin/inquiry/" + id,
            dataType: "json",
            success: (response) => {
                alert("상품 삭제 완료!");
                location.reload();
            },
            error: (error) => {
                alert("상품 삭제 실패!");
                console.log(error);
            }
        })
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

    #responseData = null;

    loadInquiryList() {
        this.responseData = InquiryApi.getInstance().getProduct();
        console.log(this.responseData);
        this.getInquiryList(this.responseData);

    }


    getInquiryList(responseData) {
        console.log(responseData)
        const name = document.querySelector(".category");
        const inquiryBoxs = document.querySelector(".boxs");
        const categoryName = responseData[0].category;
      
        inquiryBoxs.innerHTML = `
            <div class="group-buttons">
                <h4 class="category-name">${categoryName}</h4> 
            </div>
        `;

        if(categoryName == "생수") {
            const groupButtons = document.querySelector(".group-buttons");
            groupButtons.innerHTML += `
                <button type="button" class="liter sub-category-btn" value="2L">2L</button>
                <button type="button" class="liter sub-category-btn" value="500mL">500mL</button>
                <button type="button" class="liter sub-category-btn" value="330mL">330mL</button>
                <button type="button" class="liter sub-category-btn" value="18.9L">18.9L</button>
            `;
        }

        responseData.forEach(inquiryBox => { 
            
            name.innerHTML = "";

            inquiryBoxs.innerHTML += `
            <div class="inquiry-box">
                <img class="product-img" src="/image/product/${inquiryBox.img}">
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
        });

        const deleteButtons = document.querySelectorAll(".delete-button");
        const correctionBtns = document.querySelectorAll(".correction-button");

        correctionBtns.forEach((correction, index) => {
            correction.onclick = () => {
                if(confirm("상품을 수정하시겠습니까?")){
                location.href = "/admin/product/" + responseData[index].id
                }
            }
        });

        deleteButtons.forEach((deleteButton, index) => {

            deleteButton.onclick = () => {
                if(confirm("상품을 삭제하시겠습니까?")) {
                    const inquiryApi = new InquiryApi();
                    inquiryApi.productDataDeleteRequest(responseData[index].id);
                }
            }

        });

        if(categoryName == "생수") {
            const subCategoryButton = document.querySelectorAll(".sub-category-btn");

            subCategoryButton.forEach(button => {
                button.onclick = () => {
                    let inquiryArray = new Array();
                    let subCategoryName = button.textContent;
                    this.responseData.forEach(data => {
                        if(data.group == subCategoryName) {
                            inquiryArray.push(data);
                        }
                    });
                    if(inquiryArray.length > 0) {
                        this.getInquiryList(inquiryArray);
                    }else {
                        alert("해당 카테고리의 상품은 존재하지 않습니다.");
                    }
                }
            });
        }

    }
  
 
}


window.onload = () => {
    AdminInquiryService.getInstance().loadInquiryList();
}