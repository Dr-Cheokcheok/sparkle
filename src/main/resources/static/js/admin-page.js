/*  판매가 계산  */
const retailPrice = document.querySelector("#retail-price");
const price = document.querySelector("#price");
const rate = document.querySelector("#rate");

let flag = false;
let flag2 = false;

price.onchange = () => {
    flag = true;
    calcRetailPrice();
}
rate.onchange = () => {
    flag2 = true;
    calcRetailPrice();
}
function calcRetailPrice() {
    if(flag && flag2){
        let savedPrice = parseInt(price.value) * (parseInt(rate.value) / 100);
        let resultPrice = parseInt(price.value) - savedPrice;
        retailPrice.value = Math.round(resultPrice / 100) * 100;
    }
}




( /* att_zone : 이미지들이 들어갈 위치 id, btn : file tag id */
  imageView = function imageView(att_zone, btn){

    var attZone = document.getElementById(att_zone);
    var imgadd = document.getElementById(btn)
    var sel_files = [];
    
    // 이미지와 체크 박스를 감싸고 있는 div 속성
    var div_style = 'display:inline-block;position:relative;'
                  + 'width:150px;height:120px;margin:5px;border:1px solid #00f;z-index:1';
    // 미리보기 이미지 속성
    var img_style = 'width:100%;height:100%;z-index:none';
    // 이미지안에 표시되는 체크박스의 속성
    var chk_style = 'width:30px;height:30px;position:absolute;font-size:24px;'
                  + 'right:0px;bottom:0px;z-index:999;background-color:rgba(255,255,255,0.1);color:#f00';
  
                  imgadd.onchange = function(e){
      var files = e.target.files;
      var fileArr = Array.prototype.slice.call(files)
      for(f of fileArr){
        imageLoader(f);
      }
    }  
    
  
    // 탐색기에서 드래그앤 드롭 사용
    attZone.addEventListener('dragenter', function(e){
      e.preventDefault();
      e.stopPropagation();
    }, false)
    
    attZone.addEventListener('dragover', function(e){
      e.preventDefault();
      e.stopPropagation();
      
    }, false)
  
    attZone.addEventListener('drop', function(e){
      var files = {};
      e.preventDefault();
      e.stopPropagation();
      var dt = e.dataTransfer;
      files = dt.files;
      for(f of files){
        imageLoader(f);
      }
      
    }, false)
    

    
    /*첨부된 이미리즐을 배열에 넣고 미리보기 */
    imageLoader = function(file){
      sel_files.push(file);
      var reader = new FileReader();
      reader.onload = function(ee){
        let img = document.createElement('img')
        img.setAttribute('style', img_style)
        img.src = ee.target.result;
        attZone.appendChild(makeDiv(img, file));
      }
      
      reader.readAsDataURL(file);
    }
    
    /*첨부된 파일이 있는 경우 checkbox와 함께 attZone에 추가할 div를 만들어 반환 */
    makeDiv = function(img, file){
      var div = document.createElement('div')
      div.setAttribute('style', div_style)
      
      var btn = document.createElement('input')
      btn.setAttribute('type', 'button')
      btn.setAttribute('value', 'x')
      btn.setAttribute('delFile', file.name);
      btn.setAttribute('style', chk_style);
      btn.onclick = function(ev){
        var ele = ev.srcElement;
        var delFile = ele.getAttribute('delFile');
        for(var i=0 ;i<sel_files.length; i++){
          if(delFile== sel_files[i].name){
            sel_files.splice(i, 1);      
          }
        }
        
        dt = new DataTransfer();
        for(f in sel_files) {
          var file = sel_files[f];
          dt.items.add(file);
        }
        imgadd.files = dt.files;
        var p = ele.parentNode;
        attZone.removeChild(p)
      }
      div.appendChild(img)
      div.appendChild(btn)
      return div
    }
  }
)('att_zone', 'img-add')
// --------------------------------
function readURL(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
          $('#foo').attr('src', e.target.result);
      }
      reader.readAsDataURL(input.files[0]);
  }
}

$("#main-img-add").change(function() {
  readURL(this);
});

// ------------------------------------
// 버튼 클릭 시 색상 변경
$('input').click(function(){
  $('input').removeClass("active");
  $(this).addClass("active");
});

// --------------------------------------

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




/*  폼 내보내기   */

const submit = document.querySelector('.purchase');


function createImgList() {

    const formData = new FormData(document.querySelector("form"));
    let productImageFiles = new Array();

    formData.forEach(value => {
        if (value.size !== 0) {
            productImageFiles.push(value); //리스트에 담아주고
        }

    });

    return productImageFiles;
}


submit.onclick = () => {
    const categorySelects = document.querySelectorAll('.category-select');
    const subSelects = document.querySelectorAll('.sub-select');
    const productName = document.querySelector('#product_name');
    const price = document.querySelector('#price');
    const rate = document.querySelector('#rate');
    const retailPrice = document.querySelector("#retail-price");
    const mainImg = document.querySelector('#main-img-add');

    let formData = new FormData();

    categorySelects.forEach(categorySelect => {
        if (categorySelect.checked) {
            formData.append("category", categorySelect.value);
        }
    });
    subSelects.forEach(subSelect => {
        if (subSelect.checked) {
            formData.append("group", subSelect.value);
        }
    });
    formData.append("name", productName.value);
    formData.append("price", price.value);
    formData.append("rate", rate.value);
    formData.append("retailPrice", retailPrice.value);
    let imgFile = mainImg.files[0];
    if (imgFile.size !== 0){
        formData.append("mainFile", imgFile);
    }
    let productImgFiles = createImgList();

    productImgFiles.forEach(file => {
       formData.append("files", file);
    });

request(formData)


}

function request(formData) {
    $.ajax({
        async: false,
        type: "post",
        url: "/api/admin/product",
        enctype: "multipart/form-data", //formData 보낼때 꼭해주기
        contentType: false,             //formData 보낼때 꼭해주기
        processData: false,             //formData 보낼때 꼭해주기
        data: formData,                 //formData 보낼때 꼭해주기
        dataType: "json",
        success: (response) => {
            alert("상품 등록 완료");

        },
        error: (error) => {
            alert("상품 등록 실패");
            console.log(error);
        }
    });
}





