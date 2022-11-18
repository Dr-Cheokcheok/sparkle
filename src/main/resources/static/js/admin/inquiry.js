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
        const uri = location.href;
        const category = uri.substring(uri.lastIndexOf("/") + 1);

        $.ajax({
            async: false,
            type: "get",
            url: "/admin/inquiry/" + category,
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

}