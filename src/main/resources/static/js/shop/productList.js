let $mdTab = $('.md-tab li');
let $subBtn = $('.md-sub-btn');

$(function () {
    let $contents = $('.md-contents');
    let $contents01 = $('.md-cont01');
    let $contents02 = $('.md-cont02');
    let $contents03 = $('.md-cont03');
    let $contents04 = $('.md-cont04');
    let $categoryCount = $("#category_count");

    function setCategoryCount($obj, category){
        if( typeof gCateCnt !== 'undefined' ){
            $obj.html( gCateCnt[category] );
        }
    }

    if( typeof gCategory !== 'undefined' ){
        setCategoryCount($categoryCount, gCategory);
    }

    // 메인버튼
    $mdTab.on('click', function(e){
        $mdTab.removeClass('on');
        $(this).addClass('on');

        let index = $(this).index();

        $subBtn.find('ul').fadeOut(0);
        $subBtn.find('ul').eq(index).fadeIn(0);
        $subBtn.find('ul li').removeClass('on');
        $subBtn.find('> ul').eq(index).find('li:first').addClass('on');

        $contents.find('.conWrap > ul').fadeOut(0);
        $contents.find('.conWrap').eq(index).find('> ul:first').fadeIn(0);

        $contents.find('.conWrap > ul.slick-initialized').slick('setPosition');

        setCategoryCount($categoryCount, e.currentTarget.dataset.category);
    });

    //서브 버튼
    $subBtn.find('li').on('click', function(e){
        $subBtn.find('li').removeClass('on');
        $(this).addClass('on');

        setCategoryCount($categoryCount, e.currentTarget.dataset.category);
    });

    // 생수 컨텐츠
    let $subBtn01 = $subBtn.find('.md-sub-btn01');

    $subBtn01.find('li').click(function(){
        let index = $(this).index();

        $contents01.find('> ul').fadeOut(0);
        $contents01.find('> ul').eq(index).fadeIn(0);

        $contents.find('.conWrap > ul.slick-initialized').slick('setPosition');
    });

    // 탄산음료 컨텐츠
    let $subBtn02 = $subBtn.find('.md-sub-btn02');

    $subBtn02.find('li').click(function(){
        let index = $(this).index();

        $contents02.find('> ul').fadeOut(0);
        $contents02.find('> ul').eq(index).fadeIn(0);

        $contents.find('.conWrap > ul.slick-initialized').slick('setPosition');
    });
    // 쌀 컨텐츠
    let $subBtn03 = $subBtn.find('.md-sub-btn03');

    $subBtn03.find('li').click(function(){
        let index = $(this).index();

        $contents03.find('> ul').fadeOut(0);
        $contents03.find('> ul').eq(index).fadeIn(0);

        $contents.find('.conWrap > ul.slick-initialized').slick('setPosition');
    });
    // 생수부자재 컨텐츠
    let $subBtn04 = $subBtn.find('.md-sub-btn04');

    $subBtn04.find('li').click(function(){
        let index = $(this).index();

        $contents04.find('> ul').fadeOut(0);
        $contents04.find('> ul').eq(index).fadeIn(0);

        $contents.find('.conWrap > ul.slick-initialized').slick('setPosition');
    });
});
