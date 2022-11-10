$(window).load(function(){
    setTimeout(function(){  
        $('#load').fadeOut();
    }, 1000)
});

$(document).ready(function(){

    // slide paging count
        var $status = $('.pagingInfo');
        var $slickElement = $('.m-visual');

        $slickElement.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
            // currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
            var i = (currentSlide ? currentSlide : 0) + 1;
            // $status.text(i + '/' + slick.slideCount);

            $status.find('.count').text(i);
            $status.find('.total').text(slick.slideCount);
        });
    // // main visual slide
    // $slickElement.slick({
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     arrows : true,
    //     autoplay : true,
    //     infinite: true,
    //     dots : false,
    //     autoplaySpeed : 5000,
    //     // easing : 'easeInOutQuint',
    //     pauseOnHover:false,
    //     pauseOnFocus:false
    //     // fade : true
    // });

    // // event slide
    // $('.event-slide').slick({
    //     dots : true,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     arrows : false,
    //     autoplay : true,
    //     infinite: true,
    //     autoplaySpeed : 5000,
    //     pauseOnHover:false,
    //     pauseOnFocus:false
    // });

    // main section4 slide
    $('.m4-slide').slick({
        dots : false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows : true,
        autoplay : true,
        infinite: true,
        autoplaySpeed : 5000,
        pauseOnHover:false,
        pauseOnFocus:false,
    });

    // md slick
    $('.md-contents .conWrap > ul').slick({
        dots : false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay : false,
        infinite: true,
        autoplaySpeed : 5000,
        pauseOnHover:false,
        pauseOnFocus:false,
        arrows : true,
        // prevArrow : $('.md-prev'),
        // nextArrow : $('.md-next')
    });

    // 베스트리뷰
    $('.best-review-sl').slick({
        dots : true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay : false,
        infinite: true,
        autoplaySpeed : 5000,
        pauseOnHover:false,
        pauseOnFocus:false,
        arrows : true,
    });

});